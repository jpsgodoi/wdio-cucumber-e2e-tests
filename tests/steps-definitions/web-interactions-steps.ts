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

When(/^the user performs checkbox web interactions$/, async function () {
    /**
     * 3. Checkbox
     */
    // navigate to the interactions page
    await driver.url(await browser.getUrl() + "checkboxes");

    // if not selected, go and select it
    let checkboxOption1 = await $("(//input[@type='checkbox'])[1]");

    if (!await checkboxOption1.isSelected()) {
        await checkboxOption1.click();
    }

    await browser.pause(3000)
});

When(/^the user performs windows handling web interactions$/, async function () {
    /**
     * 4. Windows handling
     */
    // navigate to the interactions page
    await driver.url(await browser.getUrl() + "windows");

    let parentWindow = await browser.getWindowHandle();

    await $("a[href='/windows/new']").click();
    await $("//a[text()='Elemental Selenium']").click();

    // switch to specific window
    let winHandles = await browser.getWindowHandles();
    for (const element of winHandles) {
        console.log(`>>> win handle: ${element}`);
        await browser.switchToWindow(element);

        let winTitle = await browser.getTitle();
        console.log(`>>> current window title is: ${winTitle}`)

    }

    // switch to parent window
    await browser.switchToWindow(parentWindow);
    let winEle = await $("h3").getText();
    chai.expect(winEle).to.equal("Opening a new window");

    await browser.pause(3000)
});

When(/^the user performs handling alerts web interactions$/, async function () {
    /**
     * 5. Handling alerts
     */
    // navigate to the interactions page
    await driver.url(await browser.getUrl() + "javascript_alerts");

    await $(`button=Click for JS Alert`).click();
    if (await browser.isAlertOpen()) {
        await browser.pause(2000);
        await browser.acceptAlert();
    }

    await $(`button=Click for JS Confirm`).click();
    if (await browser.isAlertOpen()) {
        let val = await browser.getAlertText();
        console.log(`>>> this is the alert message: ${val}`);
        await browser.pause(2000);
        await browser.dismissAlert();
    }
    
    await $(`button=Click for JS Prompt`).click();
    if (await browser.isAlertOpen()) {
        await browser.sendAlertText("Webdriver IO testing");
        await browser.acceptAlert();
        await browser.pause(2000)
    }
});

When(/^the user performs file upload web interactions$/, async function () {
    /**
     * 6. File upload
     */
    // navigate to the interactions page
    await driver.url(await browser.getUrl() + "");



});