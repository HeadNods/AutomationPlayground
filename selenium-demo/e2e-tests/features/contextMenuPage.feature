@POM @contextMenuPage
Feature: Context Menu Page

  Background:
    Given I navigate to the Context Menu page

  @rightClick @alerts
  Scenario: Right-click triggers context menu alert
    When I right-click on the hot-spot
    And I am on the JavaScript Alerts component
    Then the alert text should be "You selected a context menu"
    And I accept the alert
