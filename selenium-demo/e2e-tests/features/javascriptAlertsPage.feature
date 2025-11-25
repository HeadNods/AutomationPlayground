@POM @javascriptAlertsPage
Feature: JavaScript Alerts Page

  Background:
    Given I navigate to the JavaScript Alerts page

  @alerts @jsAlert
  Scenario: Handle JS Alert
    When I click the JS Alert button
    Then the alert text should be "I am a JS Alert"
    And I accept the alert

  @alerts @jsConfirm
  Scenario: Accept JS Confirm
    When I click the JS Confirm button
    Then the alert text should be "I am a JS Confirm"
    And I accept the alert

  @alerts @jsConfirm
  Scenario: Dismiss JS Confirm
    When I click the JS Confirm button
    Then the alert text should be "I am a JS Confirm"
    And I dismiss the alert

  @alerts @jsPrompt
  Scenario: Handle JS Prompt
    When I click the JS Prompt button
    Then the alert text should be "I am a JS prompt"
    And I accept the alert
