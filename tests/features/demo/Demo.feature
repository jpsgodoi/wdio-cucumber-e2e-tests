Feature: Demo feature

    @smoke
    Scenario Outline: Demo test

        Given google page is opened
        When the user searches with <SearchItem>
        And the user clicks the first search result
        Then the URL should match <ExpectedURL>

        Examples:
            | TestCase | SearchItem  | ExpectedURL           |
            | JIRA-01  | WEBDRIVERIO | https://webdriver.io/ |
