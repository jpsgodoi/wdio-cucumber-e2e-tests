@FeatureTag
Feature: Cucumber Demo
    This is an info about my Cucumber Demo Feature
    You can continue with a second line if you want or list items
    - Questions/clafications
    - Known issues
    - Todo

    Background: Background name
        Given google page is opened

    @ScenarioTag
    Scenario: Scenario name
        When the user searches with WDIO
        And the user clicks the first search result
        Then the URL should match https://webdriver.io/

    @Scenario2Tag
    Scenario: Scenario 2 name
        When the user searches with WEBDRIVERIO
        And the user clicks the first search result
        Then the URL should match https://webdriver.io/