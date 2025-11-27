@DynamicLoadingPage
Feature: Dynamic Loading Page
    Background:
        Given I navigate to the Dynamic Loading page

    Scenario: Verify Example 1 elements before starting loading
        When I navigate to Example 1
        Then the "Start" button is displayed
        And the "Start" button is in the DOM
        And the loading indicator is not displayed
        And the loading indicator is not in the DOM
        And the "Hello World!" finish text is not displayed
        And the "Hello World!" finish text is in the DOM
    
    Scenario: Verify Example 1 elements during loading
        When I navigate to Example 1
        And I click the "Start" button
        Then the "Start" button is not displayed
        And the "Start" button is in the DOM
        And the loading indicator is displayed
        And the loading indicator is in the DOM
        And the "Hello World!" finish text is not displayed
        And the "Hello World!" finish text is in the DOM

    Scenario: Verify Example 1 elements after loading is complete
        When I navigate to Example 1
        And I click the "Start" button
        And I wait for the loading to complete
        Then the "Start" button is not displayed
        And the "Start" button is in the DOM
        And the loading indicator is not displayed
        And the loading indicator is in the DOM
        And the "Hello World!" finish text is displayed
        And the "Hello World!" finish text is in the DOM

    Scenario: Verify Example 2 elements before starting loading
        When I navigate to Example 2
        Then the "Start" button is displayed
        And the "Start" button is in the DOM
        And the loading indicator is not displayed
        And the loading indicator is not in the DOM
        And the "Hello World!" finish text is not displayed
        And the "Hello World!" finish text is not in the DOM
    
    Scenario: Verify Example 2 elements during loading
        When I navigate to Example 2
        And I click the "Start" button
        Then the "Start" button is not displayed
        And the "Start" button is in the DOM
        And the loading indicator is displayed
        And the loading indicator is in the DOM
        And the "Hello World!" finish text is not displayed
        And the "Hello World!" finish text is not in the DOM

    Scenario: Verify Example 2 elements after loading is complete
        When I navigate to Example 2
        And I click the "Start" button
        And I wait for the loading to complete
        Then the "Start" button is not displayed
        And the "Start" button is in the DOM
        And the loading indicator is not displayed
        And the loading indicator is in the DOM
        And the "Hello World!" finish text is displayed
        And the "Hello World!" finish text is in the DOM