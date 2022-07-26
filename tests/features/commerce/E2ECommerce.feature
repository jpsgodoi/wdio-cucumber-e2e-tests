Feature: Commerce

    @e2e @commerce
    Scenario: TESTID-9999: Search external customers
        Given the user gets list of users from reqres.in
        When the user login as admin to nopcommerce
        Then all users exist in customers list
