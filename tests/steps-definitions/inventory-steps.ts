import { Given, Then } from "@wdio/cucumber-framework";
import chai from "chai";

Given(/^the user is logged in the inventory app$/, async function () {
    // @ts-ignore
    await browser.url(browser.config.sauceDemoURL);

    // Example with Refresh
    try {
        await $(`#user-nam`).setValue(process.env.TEST_STD_USER);
        await $(`#password`).setValue(process.env.TEST_PASSWORD);
        await $(`#login-button`).click();
    } catch (err) {
        console.log(`Error trying to login, retrying.....`)
        await browser.pause(1000);
        await browser.refresh();
        await $(`#user-name`).setValue(process.env.TEST_STD_USER);
        await $(`#password`).setValue(process.env.TEST_PASSWORD);
        await $(`#login-button`).click();
    }

    // Example with Reload Session
    await browser.pause(1000);
    await browser.reloadSession();

    await browser.url("https://www.saucedemo.com/");
    await $(`#user-name`).setValue(process.env.TEST_PROB_USER);
    await $(`#password`).setValue(process.env.TEST_PASSWORD);
    await $(`#login-button`).click();

    this.appId = `ABCD-ID`;
    console.log(`> Given step >> app id: ${this.appId}`);
    console.log(`> Given step >> test id: ${this.testId}`);

    await browser.pause(1000);
});

Given(/^the Username is logged in the inventory app$/, async function (dataTable) {

    let dtHashes = dataTable.hashes()
    console.log(`>> Available users!!  ${JSON.stringify(dtHashes)}`);

    for (const user of dtHashes) {
        // @ts-ignore
        await browser.url(browser.config.sauceDemoURL);

        console.log(`>> Logging with user!!  ${JSON.stringify(user.Username)}`);

        await $(`#user-name`).setValue(user.Username);
        await $(`#password`).setValue(process.env.TEST_PASSWORD);
        await $(`#login-button`).click();

        let actualUrl = await browser.getUrl();
        chai.expect(actualUrl).to.contains(`inventory`, `${actualUrl} does not have the word "inventory", login failed`);
        await browser.reloadSession();
    }

});

Then(/^inventory page displays (.*) records$/, async function (numProducts) {
    let products = await $$(`div[class=inventory_item_name]`);
    chai.expect(products.length).to.equal(parseInt(numProducts));

    console.log(`> Then step >> app id: ${this.appId}`);
    console.log(`> Then step >> test id: ${this.testId}`);
})

Then(/^all products have valid price$/, async function () {
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

    // Assert any value is <=0
    let invalidPrice = pricesNum.filter(ele => ele <= 0);
    chai.expect(invalidPrice.length).to.equal(0);

    console.log(`> Printing variable in other step again!! ${this.appId}`);
})