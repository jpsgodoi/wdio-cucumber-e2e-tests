import { Given, When, Then } from "@wdio/cucumber-framework";
import chai from "chai";

Given(/^google page is opened$/, async function () {
    await browser.url("https://www.google.com");
    let acceptCookie = await $('(//button)[4]');
    await acceptCookie.click();
});

When(/^the user searches with (.*)$/, async function (searchItem: string) {
    console.log(`Searching with --> ${searchItem}`);
    let searchBox = await $("input[type='text']");
    await searchBox.setValue(searchItem);
    await browser.keys("Enter");
});

When(/^the user clicks the first search result$/, async function () {
    console.log("Clicking in the first result");
    let searchResult = await $("(//cite[@role='text'])[1]");
    await searchResult.click();
});

Then(/^the URL should match (.*)$/, async function (expectedUrl: string) {
    console.log(`Expected URL --> ${expectedUrl}`);

    await browser.waitUntil(async function() {
        return await browser.getTitle() === "WebdriverIO · Next-gen browser and mobile automation test framework for Node.js | WebdriverIO"
    }, {timeout: 2000, interval: 500, timeoutMsg: `Failed to load the page`});

    let actualUrl = await browser.getUrl();
    chai.expect(actualUrl).to.equal(expectedUrl);
});
