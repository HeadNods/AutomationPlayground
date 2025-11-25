@POM @checkboxesPage
Feature: Checkboxes Page

  Background:
    Given I navigate to the Checkboxes page

  @checkboxes @assertions
  Scenario: Verify initial checkbox states
    Then the first checkbox should be unchecked
    And the second checkbox should be checked

  @checkboxes @clicks
  Scenario: Toggle first checkbox
    When I click the first checkbox
    Then the first checkbox should be checked

  @checkboxes @clicks
  Scenario: Toggle second checkbox
    When I click the second checkbox
    Then the second checkbox should be unchecked

  @checkboxes @presence
  Scenario: Verify checkbox form is present
    Then the checkbox form should be present
