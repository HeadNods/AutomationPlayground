@POM @dropdownPage
Feature: Dropdown Page

    Background:
        Given I navigate to the Dropdown page

    @dropdown
    Scenario: Verify the base selected option is "Please select an option"
        Then the selected option contains the text "Please select an option"
        And the selected option is option 0
        And the base dropdown option is disabled

    @dropdown
    Scenario: Verify the dropdown selection option 1
        When I select option 1 from the dropdown
        Then the selected option contains the text "Option 1"
        And the selected option is option 1
        And the base dropdown option is disabled

    @dropdown
    Scenario: Verify the dropdown selection option 2
        When I select option 2 from the dropdown
        Then the selected option contains the text "Option 2"
        And the selected option is option 2
        And the base dropdown option is disabled