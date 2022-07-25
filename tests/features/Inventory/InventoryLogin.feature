Feature: Inventory

    @inventory
    Scenario Outline: TESTID-5678: Inventory datatable login demo

        Given the Username is logged in the inventory app
            | Username                |
            | performance_glitch_user |
            | problem_user            |
            | standard_user           |
        Then inventory page displays 6 records
        And all products have valid price