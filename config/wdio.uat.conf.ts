import { config as baseConfig } from "./wdio.conf"

Object.assign(baseConfig, {

    environment: "UAT",
    sauceDemoURL: "https://www.saucedemo.com",
    googlePage: "https://www.google.com"
})