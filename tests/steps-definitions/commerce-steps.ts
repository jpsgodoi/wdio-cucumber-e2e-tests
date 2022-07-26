import { Given, When, Then } from "@cucumber/cucumber"
import reporter from "../helpers/reporter"
import constants from "../../data/other/constants.json"
import apiHelper from "../helpers/api-helper"
import chai from "chai"
import fs from "fs"
import CommercePage from "../page-objects/commerce-page"
import CustomersListPage from "../page-objects/customers-list-page"

Given(/^the user gets list of users from reqres.in$/, async function () {

    // @ts-ignore
    let baseUrl = browser.config.reqresBaseUrl;
    let endpoint = constants.REQRES.LIST_USERS;
    let query = constants.REQRES.QUERY_PARAM;
    let testId = this.testId;
    let res;

    reporter.addStep(testId, "info", "Getting the payload data from reqres.in");

    await browser.call(async function () {
        res = await apiHelper.GET(testId, baseUrl, endpoint, "", query);
    })

    if (res.status == 200) {
        let data = JSON.stringify(res.body)
        reporter.addStep(testId, "debug", `API response received, data: ${data}`)

        let filename = `${process.cwd()}/data/api-res/reqresUsers.json`
        fs.writeFileSync(filename, data)

        reporter.addStep(testId, "debug", `API response stored in json file reqresUsers.json`)
    } else {
        chai.expect.fail(`Failed to get users from ${baseUrl}${endpoint}`)
    }
});

When(/^the user login as admin to nopcommerce$/, async function () {

    try {
        reporter.addStep(this.testId, "info", "Logging to commerce app");
        // @ts-ignore
        await CommercePage.loginToCommerce(
            this.testId,
            process.env.TEST_COM_ADMIN_USER,
            process.env.TEST_COM_ADMIN_PWD
        )
    } catch (err) {
        err.message = `${this.testId}: Failed at the login step! ${err.message}`;
        throw err;
    }
});

Then(/^all users exist in customers list$/, async function () {
    // @ts-ignore
    await browser.url(`${browser.config.commerceUrl}/Admin/Customer/List`);
    reporter.addStep(this.testId, "info", "Navigated to customer list screen");

    // read data from API response json file
    let filename = `${process.cwd()}/data/api-res/reqresUsers.json`;
    let data = fs.readFileSync(filename, "utf8");
    let dataObj = JSON.parse(data);
    let arr = [];

    // Save an object for each not found user from the API response
    for (const data of dataObj.data) {
        let firstName = data.first_name;
        let lastName = data.last_name;
        let obj = {};
        let customerNotFound = await CustomersListPage.searchCustomer(this.testId, firstName, lastName);

        if (customerNotFound){
            obj["firstName"] = firstName;
            obj["lastName"] = lastName;
            arr.push(obj);
        }
    }

    // Write to file in case a customer was not found
    let customerData = JSON.stringify(arr);
    let filepath = `${process.cwd()}/results/customersNotFound.json`;
    fs.writeFileSync(filepath, customerData);
});