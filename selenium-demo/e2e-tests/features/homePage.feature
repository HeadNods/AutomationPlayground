@POM @homePage
Feature: Home Page Navigation and Browser Controls

  Background:
    Given I navigate to the home page

  @navigation @pageTitle
  Scenario: Verify home page title
    Then the page title should be "The Internet"
    And the page title should not be "Something Else"
    And the page title should contain "The"
    And the page title should contain "Internet"
    And the page title should not contain "Something"

  @navigation @links
  Scenario: Navigate to different pages via links
    When I click on the "Checkboxes" link
    Then I should be on the Checkboxes page
    And the checkbox form should be present

  @navigation @browserControls
  Scenario: Using back and forward navigation
    When I click on the "Inputs" link
    And I navigate back
    Then the page title should be "The Internet"
    When I navigate forward
    Then I should be on the Inputs page
    Then the number input field should be present

  @navigation @refresh
  Scenario: Refreshing the page
    When I refresh the page
    Then the page title should be "The Internet"

  @navigation @wait
  Scenario: Simple wait operation
    When I wait for 2 seconds
    Then the page title should be "The Internet"
