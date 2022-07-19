import { Given, Then } from "@wdio/cucumber-framework";
import chai from "chai";

Given(/^the user is logged in the inventory app$/, async function () {
    await browser.url("https://www.saucedemo.com/");
    
    // // Example with Refresh
    // try {
    //     await $(`#user-nam`).setValue("standard_user");
    //     await $(`#password`).setValue("secret_sauce");
    //     await $(`#login-button`).click();
    // } catch (err) {
    //     console.log(`Error trying to login, retrying.....`) 
    //     await browser.pause(1000);
    //     await browser.refresh();
    //     await $(`#user-name`).setValue("standard_user");
    //     await $(`#password`).setValue("secret_sauce");
    //     await $(`#login-button`).click();
    // }

    // Example with Reload Session
    await browser.pause(1000);
    await browser.reloadSession();

    await browser.url("https://www.saucedemo.com/");
    await $(`#user-name`).setValue("problem_user");
    await $(`#password`).setValue("secret_sauce");
    await $(`#login-button`).click();

    await browser.pause(1000);
});

Then(/^inventory page displays (.*) records$/, async function (numProducts) {
    let products = await $$(`div[class=inventory_item_name]`);
    chai.expect(products.length).to.equal(parseInt(numProducts));
})

Then(/^all products have valid price$/, async function () {
    // Get price list
    let productsPrices = await $$(`div[class=inventory_item_price]`);
    let pricesArr = [];

    for (const productPrice of productsPrices) {
        pricesArr.push(await productPrice.getText());
    }

    console.log(`>> Prices with $: ${pricesArr}`);
    // Convert string to number
    let pricesNum = pricesArr.map(ele => +(ele.replace("$", "")));
    console.log(`>> Prices without $: ${pricesNum}`);

    // Assert any value is <=0
    let invalidPrice = pricesNum.filter(ele => ele <= 0);
    chai.expect(invalidPrice.length).to.equal(0);
})