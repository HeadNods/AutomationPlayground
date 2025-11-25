@POM @dynamicControlsPage
Feature: Dynamic Controls Page

  Background:
    Given I navigate to the Dynamic Controls page

  @dynamicElements @wait
  Scenario: Wait for Add button to appear after removing element
    When I click the Remove button
    Then I wait for the Add button to appear
    And the Add button should be present

  @dynamicElements @wait
  Scenario: Remove and re-add element
    When I click the Remove button
    And I wait for the Add button to appear
    Then the Remove button should not be present
    When I click the Add button
    And I wait for the Remove button to appear
    Then the Remove button should be present
