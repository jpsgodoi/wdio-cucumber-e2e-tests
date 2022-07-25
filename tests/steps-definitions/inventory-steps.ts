import reporter from "../helpers/reporter";
import { Given, Then } from "@wdio/cucumber-framework";
import chai from "chai";
import logger from "../helpers/logger"
import SaucePage from "../page-objects/sauce-page"

Given(/^the user is logged in the inventory app$/, async function () {
    reporter.addStep(this.testId, "info", "Starting to login sauce demo app");

    try {
        // @ts-ignore
        await SaucePage.navigateTo(browser.config.sauceDemoURL);
        await SaucePage.enterUsername(this.testId, process.env.TEST_PROB_USER);
        await SaucePage.enterPassword(this.testId, process.env.TEST_PASSWORD);
        await SaucePage.clickLoginBtn(this.testId);
    } catch (err) {
        err.message = `${this.testId}: Failed at the login step! ${err.message}`;
        throw err;
    }
});

Given(/^the Username is logged in the inventory app$/, async function (dataTable) {

    let dtHashes = dataTable.hashes()
    console.log(`>> Available users!!  ${JSON.stringify(dtHashes)}`);

    for (const user of dtHashes) {
        await browser.reloadSession();

        // @ts-ignore
        await browser.url(browser.config.sauceDemoURL);

        console.log(`>> Logging with user!!  ${JSON.stringify(user.Username)}`);

        await $(`#user-name`).setValue(user.Username);
        await $(`#password`).setValue(process.env.TEST_PASSWORD);
        await $(`#login-button`).click();

        let actualUrl = await browser.getUrl();
        chai.expect(actualUrl).to.contains(`inventory`, `${actualUrl} does not have the word "inventory", login failed`);
    }

});

Then(/^inventory page displays (.*) records$/, async function (numProducts) {

    try {
        reporter.addStep(this.testId, "info", "Verifying page records");
        let products = await $$(`div[class=inventory_item_name]`);
        chai.expect(products.length).to.equal(parseInt(numProducts));

    } catch (err) {
        err.message = `${this.testId}: Product count mismatch, ${err.message}`;
        reporter.addStep(this.testId, "error", err.message, true, "JIRABUG-1234");
        throw err
    }
})

Then(/^all products have valid price$/, async function () {

    logger.info(`${this.testId}: Scrapping all products from the screen`)

    // Get price list
    let productsPrices = await $$(`div[class=inventory_item_price]`);
    let pricesArr = [];

    for (const productPrice of productsPrices) {
        pricesArr.push(await productPrice.getText());
    }

    console.log(`> Prices with $: ${pricesArr}`);
    // Convert string to number
    let pricesNum = pricesArr.map(ele => +(ele.replace("$", "")));
    console.log(`> Prices without $: ${pricesNum}`);

    reporter.addStep(this.testId, "info", "Asserting all products have valid prices");
    // Assert any value is <=0
    let invalidPrice = pricesNum.filter(ele => ele <= 0);
    chai.expect(invalidPrice.length).to.equal(0);

})