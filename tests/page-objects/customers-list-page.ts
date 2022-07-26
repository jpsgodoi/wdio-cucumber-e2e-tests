import Page from "./page"
import reporter from "../helpers/reporter"

class CustomersListPage extends Page {
    constructor() {
        super()
    }

    //** Page objects */
    get firstNameInput() { return $(`#SearchFirstName`) }
    get lastNameInput() { return $(`#SearchLastName`) }
    get searchBtn() { return $(`#search-customers`) }
    get noResultsMessage() { return $(`td=No data available in table`) }

    //** Page actions */
    async searchCustomer(testId: string, firstName: string, lastName: string) {
        let nameNotExist = false;

        reporter.addStep(testId, "info", `Searching user: ${firstName} ${lastName}`);
        try {
            await this.typeInto(await this.firstNameInput, firstName);
            await this.typeInto(await this.lastNameInput, lastName);
            await this.click(await this.searchBtn);
            await browser.pause(1000)

            let isNotDisplayed = await this.noResultsMessage.isDisplayed()
            if (isNotDisplayed) {
                nameNotExist = true;
            }
        } catch (err) {
            err.message = `Failed searching user: ${firstName} ${lastName} >> ${err.message}`
            throw err
        }
        return nameNotExist;
    }
}

export default new CustomersListPage()