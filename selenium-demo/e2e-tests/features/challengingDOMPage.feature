@POM @challengingDOMPage
Feature: Challenging DOM Page

  Background:
    Given I navigate to the Challenging DOM page

  @table @assertions
  Scenario: Verify table headers contain expected text
    Then the header for the specified column should contain the specified text
      | ColumnNumber | ExpectedText |
      | 1            | Lorem        |
      | 2            | Ipsum        |
      | 3            | Dolor        |
      | 4            | Sit          |
      | 5            | Amet         |
      | 6            | Diceret       |
      | 7            | Action       |

  @table @assertions
  Scenario: Verify column one cells start with expected text
    Then all rows for the specified column should start with the specified text
      | ColumnNumber | ExpectedText |
      | 1            | Iuvaret      |

  @table @assertions
  Scenario: Verify column two cells start with expected text
    Then all rows for the specified column should start with the specified text
      | ColumnNumber | ExpectedText |
      | 2            | Apeirian     |

  @table @assertions
  Scenario: Verify column three cells start with expected text
    Then all rows for the specified column should start with the specified text
      | ColumnNumber | ExpectedText |
      | 3            | Adipisci     |

  @table @assertions
  Scenario: Verify column four cells start with expected text
    Then all rows for the specified column should start with the specified text
      | ColumnNumber | ExpectedText |
      | 4            | Definiebas   |

  @table @assertions
  Scenario: Verify column five cells start with expected text
    Then all rows for the specified column should start with the specified text
      | ColumnNumber | ExpectedText |
      | 5            | Consequuntur |

  @table @assertions
  Scenario: Verify column six cells start with expected text
    Then all rows for the specified column should start with the specified text
      | ColumnNumber | ExpectedText |
      | 6            | Phaedrum     |

  @buttons @assertions
  Scenario: Verify edit buttons have correct href
    Then all "edit" buttons should have the href "#edit"

  @buttons @assertions
  Scenario: Verify delete buttons have correct href
    Then all "delete" buttons should have the href "#delete"

  @buttons @assertions
  Scenario: Verify number of main buttons
    Then there should be "3" main buttons on the page

  @buttons @clicks
  Scenario: Click first button and verify updates
    When I click the "first" button on the Challenging DOM page
    Then the answer value should be updated
    And the "first" button its Id should be updated

  @buttons @clicks
  Scenario: Click second button and verify updates
    When I click the "second" button on the Challenging DOM page
    Then the answer value should be updated
    And the "second" button its Id should be updated

  @buttons @clicks
  Scenario: Click third button and verify updates
    When I click the "third" button on the Challenging DOM page
    Then the answer value should be updated
    And the "third" button its Id should be updated
