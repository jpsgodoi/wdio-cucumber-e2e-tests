import { setWorldConstructor } from "@wdio/cucumber-framework";
import chai from "chai";

class CustomWorld {
    appId: string
    testId: string

    constructor() {
        this.appId = ""
        this.testId = ""
    }
}

setWorldConstructor(CustomWorld);