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
    let baseUrl = await browser.getUrl();
    await $("=Inputs").click();

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
    await driver.url(baseUrl);
});

When(/^the user performs dropdown web interactions$/, async function () {
    /**
     * 2. Dropdown
     */
    // navigate to the interactions page
    let baseUrl = await browser.getUrl();
    await $("=Dropdown").click();

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

    await browser.pause(2000);
    await driver.url(baseUrl);
});

When(/^the user performs checkbox web interactions$/, async function () {
    /**
     * 3. Checkbox
     */
    // navigate to the interactions page
    let baseUrl = await browser.getUrl();
    await $("=Checkboxes").click();

    // if not selected, go and select it
    let checkboxOption1 = await $("(//input[@type='checkbox'])[1]");

    if (!await checkboxOption1.isSelected()) {
        await checkboxOption1.click();
    }

    await browser.pause(2000);
    await driver.url(baseUrl);
});

When(/^the user performs windows handling web interactions$/, async function () {
    /**
     * 4. Windows handling
     */
    // navigate to the interactions page
    let baseUrl = await browser.getUrl();
    await $("=Multiple Windows").click();

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

    await browser.pause(2000);
    await driver.url(baseUrl);
});

When(/^the user performs handling alerts web interactions$/, async function () {
    /**
     * 5. Handling alerts
     */
    // navigate to the interactions page
    let baseUrl = await browser.getUrl();
    await $("=JavaScript Alerts").click();

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
        await browser.pause(2000);
    }

    await browser.pause(2000);
    await driver.url(baseUrl);
});

When(/^the user performs file upload web interactions$/, async function () {
    /**
     * 6. File upload
     */
    // navigate to the interactions page
    let baseUrl = await browser.getUrl();
    await $("=File Upload").click();

    console.log(process.cwd());

    await $(`#file-upload`).addValue(`${process.cwd()}/data/file-upload/Iron_Man.jpg`);
    await $(`#file-submit`).click();

    await browser.pause(2000);
    await driver.url(baseUrl);
});

When(/^the user performs frames web interactions$/, async function () {
    /**
     * 7. Frames
     */
    // navigate to the interactions page
    let baseUrl = await browser.getUrl();
    await $("=Frames").click();

    // Switch to frame and type text
    await $(`=iFrame`).click();
    let frame = await $(`#mce_0_ifr`);
    await browser.switchToFrame(frame);
    await $(`#tinymce`).setValue(`New Text!!`);

    // Swtich to parent frame
    await browser.switchToParentFrame();
    let title = await $(`.example h3`).getText();
    chai.expect(title).to.equals(`An iFrame containing the TinyMCE WYSIWYG Editor`);

    await browser.pause(2000);
    await driver.url(baseUrl);
});

When(/^the user performs scrolling web interactions$/, async function () {
    /**
     * 8. Scrolling
     */
    // navigate to the interactions page
    await $(`a=Elemental Selenium`).scrollIntoView();

    await browser.pause(2000);
});

When(/^the user performs web table interactions$/, async function () {
    /**
     * 9. Web tables
     */
    // navigate to the interactions page
    let baseUrl = await browser.getUrl();
    await $("=Sortable Data Tables").click();

    // check number of rows and columns
    let tableRows = await $$(`[id=table1] tbody tr`);
    let tableColumns = await $$(`[id=table1] thead tr th[class=header]`);

    console.log(`>>> This is the number of rows: ${tableRows.length}`);
    chai.expect(tableRows.length).to.equal(4);
    console.log(`>>> This is the number of columns: ${tableColumns.length}`);
    chai.expect(tableColumns.length).to.equal(6);

    // log each cell value
    let finalArr = []
    let tableObj = {}

    for (let row = 1; row <= tableRows.length; row++) {
        for (let col = 1; col <= tableColumns.length; col++) {
            let column = await $(`//table[@id="table1"]/thead/tr/th[${col}]/span`).getText();
            let cell = await $(`//table[@id="table1"]/tbody/tr[${row}]/td[${col}]`).getText();
            tableObj[column] = cell;
        }

        if (tableObj['Last Name'] == "Smith" && tableObj['First Name'] == "John") {
            finalArr.push(tableObj)
            break;
        }

    }

    console.log(JSON.stringify(finalArr))

    await driver.url(baseUrl);
});