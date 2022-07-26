Feature: Web interactions

    @smoke
    Scenario: Web Interactions

        Given the web interactions page is opened
        When the user performs input web interactions
        And the user performs dropdown web interactions
        And the user performs checkbox web interactions
        And the user performs windows handling web interactions
        And the user performs handling alerts web interactions
        # And the user performs file upload web interactions
        And the user performs frames web interactions
        And the user performs scrolling web interactions
        And the user performs web table interactions