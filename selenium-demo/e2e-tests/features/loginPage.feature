@POM @loginPage
Feature: Login Page

  Background:
    Given I navigate to the Login page

  @attributes
  Scenario: Verify form field attributes
    Then the username field should have attribute "name" with value "username"
    And the password field should have attribute "name" with value "password"
    And the password field should not have attribute "name" with value "username"
    And the login button should have attribute "type" with value "submit"

  @login @successfulLogin
  Scenario: Successful login
    When I enter "tomsmith" into the username field
    And I enter "SuperSecretPassword!" into the password field
    And I click the login button
    Then the login should be successful

  @login @invalidLogin
  Scenario: Failed login with invalid credentials
    When I enter "invaliduser" into the username field
    And I enter "invalidpass" into the password field
    And I click the login button
    Then the login should fail
