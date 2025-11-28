@POM @redirectorPage
Feature: Redirector

    Background:
        Given I navigate to the redirector page

    @redirect @initialState
    Scenario: Verify redirector page initial state
        Then I should see the redirector header "Redirection"
        And I should see the redirector description containing "This is separate from directly returning a redirection status code"
        And the redirect link should be displayed
        And the redirect link text should be "here"
        And the redirect link href should contain "redirect"

# Not possible with Selenium alone; Can always send a request with another tool to verify responses if ever necessary
    #@redirect @networkCapture
    #Scenario: Verify redirect link captures network response
    #    When I click the redirect link
    #    Then the response URL should contain "status_codes"
    #    And the response status code should be "200"
