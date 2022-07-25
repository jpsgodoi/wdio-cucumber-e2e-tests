import { setWorldConstructor } from "@wdio/cucumber-framework";

class CustomWorld {
    appId: string
    testId: string

    constructor() {
        this.appId = ""
        this.testId = ""
    }
}

setWorldConstructor(CustomWorld);