@POM @addRemoveElementsPage
Feature: Add/Remove Elements Page

  Background:
    Given I navigate to the Add/Remove Elements page

  @elementText
  Scenario: Verify Add Element button text
    Then the Add Element button should have text "Add Element"
    And the Add Element button should not have text "Remove Element"
    And the Add Element button should contain text "Add"

  @clicks
  Scenario: Add and verify delete button
    When I click the Add Element button
    Then the Delete button should be present

  @clicks
  Scenario: Add multiple elements
    When I click the Add Element button
    And I click the Add Element button
    And I click the Add Element button
    Then the Delete button should be present
