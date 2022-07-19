Feature: Demo feature

    @demo @smoke
    Scenario Outline: Demo test

        Given google page is opened
        When the user searches with <SearchItem>
        And the user clicks the first search result
        Then the URL should match <ExpectedURL>

        Examples:
            | TestCase | SearchItem | ExpectedURL           |
            | JIRA-01  | WDIO       | https://webdriver.io/ |
