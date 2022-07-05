import { Given, When, Then } from "@wdio/cucumber-framework";
import chai from "chai";

Given(/^the web interactions page is opened$/, async function () {
    await browser.url("https://the-internet.herokuapp.com");
    await browser.setTimeout({ implicit: 10000, pageLoad: 5000 })
    await browser.maximizeWindow()
});

When(/^the user performs web interactions$/, async function () {
    /**
     * 1. Input box
     */
    // navigate to the interactions page
    await driver.url(await browser.getUrl() + "inputs")

    let inputBox = await $("input[type=number]");

    // Type into the input box
    await inputBox.setValue("12345");
    await browser.pause(2000);

    // Add value to the pre-filled input
    await inputBox.addValue("56789");
    await browser.pause(2000);

    // Slow typing
    let num = 99999
    let inputContent = num.toString(); 
    for(let i=0; i<inputContent.length; i++) {
        let inputValue = inputContent.charAt(i);
        await browser.keys(inputValue);
        await browser.pause(500);
    }
    await browser.pause(2000);
});
