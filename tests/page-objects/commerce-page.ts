import Page from "./page"
import reporter from "../helpers/reporter"

class CommercePage extends Page {
    constructor() {
        super()
    }

    //** Page objects */
    get usernameInput() { return $(`#Email`) }
    get passwordInput() { return $(`#Password`) }
    get loginButton() { return $(`button=Log in`) }

    //** Page actions */
    async loginToCommerce(testId: string, username: string, password: string ){
        // @ts-ignore
        let url = browser.config.commerceUrl.trim();
        username = username.trim();
        password = password.trim();

        try {
            reporter.addStep(testId, "info", `Login to: ${url} with ${username}`);
            await this.navigateTo(url);
            await this.typeInto(await this.usernameInput, username);
            await this.typeInto(await this.passwordInput, password);
            await this.click(await this.loginButton);
            reporter.addStep(testId, "info", `Successfull login to: ${url} with ${username}`);
        } catch (err) {
            err.message = `login to: ${url} with ${username} >> ${err.message}`
            throw err
        }
    }
}

export default new CommercePage()