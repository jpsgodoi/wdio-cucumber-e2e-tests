import { Given, When } from "@wdio/cucumber-framework";
import chai from "chai";

Given(/^the web interactions page is opened$/, async function () {
    await browser.url("https://the-internet.herokuapp.com");
    await browser.setTimeout({ implicit: 10000, pageLoad: 5000 })
    await browser.maximizeWindow()
});

When(/^the user performs input web interactions$/, async function () {
    /**
     * 1. Input box
     */
    // navigate to the interactions page
    await driver.url(await browser.getUrl() + "inputs");

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
    for (let i = 0; i < inputContent.length; i++) {
        let inputValue = inputContent.charAt(i);
        await browser.keys(inputValue);
        await browser.pause(500);
    }
    await browser.pause(2000);
});

When(/^the user performs dropdown web interactions$/, async function () {
    /**
     * 2. Dropdown
     */
    // navigate to the interactions page
    await driver.url(await browser.getUrl() + "dropdown");

    let dropdown = await $("#dropdown");
    let dropdownDefault = await $("[id='dropdown'] [selected='selected']");

    // assert the default option is selected
    let val = await dropdownDefault.getText();
    chai.expect(val).to.equal("Please select an option");

    // select an specific option
    await dropdown.selectByVisibleText("Option 1");
    await dropdown.selectByAttribute("value", "2");

    // Check dropdown has all items
    let allElements = await $$("[id='dropdown'] option");
    let arr = [];
    for (const element of allElements) {
        arr.push(await element.getText());
    }
    let expectedOptions = ['Please select an option', 'Option 1', 'Option 2'];
    chai.expect(arr).to.have.all.members(expectedOptions);
});