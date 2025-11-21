@toValidate
Feature: Auth tests

    @assertion @pageTitle
    Scenario: Basic auth login flow
        Given I navigate to "http://admin:admin@the-internet.herokuapp.com/basic_auth?username=admin&password=admin"
        When I enter "admin" into basic auth username field
        And I enter "admin" into basic auth password field
        And I submit the basic auth popup
        Then I should see the header "h3" as "Basic Auth"

    @assertion @pageTitle
    Scenario: Digest auth login flow
        Given I navigate to "http://admin:admin@the-internet.herokuapp.com/digest_auth?username=admin&password=admin"
        When I enter "admin" into digest auth username field
        And I enter "admin" into digest auth password field
        And I submit the digest auth popup
        Then I should see the header "h3" as "Digest Auth"

    @assertion @pageTitle
    Scenario: Form  auth login flow
        Given I navigate to "http://the-internet.herokuapp.com/login"
        Then I should see the header "h2" as "Login Page"
        When I enter "tomsmith" into input field having id "username"
        And I enter "SuperSecretPassword!" into input field having id "password"
        And I click on button having xpath "//button[@type='submit']"
        Then I should see the header "h2" as "Secure Area"
        And I should see a flash message having class "flash success" with text as "You logged into a secure area!"