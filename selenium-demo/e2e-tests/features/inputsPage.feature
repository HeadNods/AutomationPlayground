@POM @inputsPage
Feature: Inputs Page

  Background:
    Given I navigate to the Inputs page

  @inputs @presence
  Scenario: Verify input field is present
    Then the number input field should be present

  @inputs @enterText
  Scenario: Enter text into input field
    When I enter "123" into the number input
    Then the input value should be "123"

  @inputs @clearText
  Scenario: Clear input field
    When I enter "456" into the number input
    And I clear the number input
    Then the input value should be ""

  @inputs @enterText
  Scenario: Enter different values
    When I enter "789" into the number input
    Then the input value should be "789"
    When I clear the number input
    And I enter "42" into the number input
    Then the input value should be "42"
