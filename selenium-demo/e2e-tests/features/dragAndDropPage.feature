@POM @dragAndDropPage
Feature: Drag and Drop Page

  Background:
    Given I navigate to the Drag and Drop page

  @dragDrop
  Scenario: Verify initial column states
    Then column A should have text "A"
    And column B should have text "B"

  @dragDrop
  Scenario: Drag column A to column B
    When I drag column A to column B
    Then column A should have text "B"
    And column B should have text "A"

  @dragDrop
  Scenario: Drag and drop multiple times
    When I drag column A to column B
    Then column A should have text "B"
    And column B should have text "A"
    When I drag column B to column A
    Then column A should have text "A"
    And column B should have text "B"
