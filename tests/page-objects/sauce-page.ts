import Page from "./page"
import chai from "chai"
import reporter from "../helpers/reporter"

class SaucePage extends Page {
    constructor() {
        super()
    }

    //** Page objects */
    get usernameInput() { return $(`#user-name`) }
    get passwordInput() { return $(`#password`) }
    get loginButton() { return $(`#login-button`) }

    //** Page actions */
    async enterUsername(testId: string, username: string) {
        if (!username) throw Error(`Given username: ${username} is not valid`);
        try {
            username = username.trim();
            await this.typeInto(await this.usernameInput, username);
            reporter.addStep(testId, "info", `Username: "${username}" entered successfully`);
        } catch (err) {
            err.message = `Error entering the username: ${username}, ${err.message}`;
            reporter.addStep(testId, "error", err.message);
            throw err
        }
    }

    async enterPassword(testId: string, password: string) {
        if (!password) throw Error(`Given password: ${password} is not valid`);
        try {
            password = password.trim();
            await this.typeInto(await this.passwordInput, password);
            reporter.addStep(testId, "info", `Password: "${password}" entered successfully`);
        } catch (err) {
            err.message = `Error entering the password: ${password}, ${err.message}`;
            reporter.addStep(testId, "error", err.message);
            throw err
        }
    }

    async clickLoginBtn(testId: string) {
        try {
            await this.click(await this.loginButton);
            reporter.addStep(testId, "info", `Login button clicked`);
        } catch (err) {
            err.message = `Error clicking the login button`;
            reporter.addStep(testId, "error", err.message);
            throw err
        }
    }
}

export default new SaucePage()