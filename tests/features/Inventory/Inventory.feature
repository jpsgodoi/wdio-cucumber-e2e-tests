Feature: Inventory

    @demo @smoke @inventory
    Scenario Outline: TESTID-1234: Inventory demo

        Given the user is logged in the inventory app
        Then inventory page displays 6 records
        And all products have valid price
