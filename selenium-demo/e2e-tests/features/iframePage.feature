@POM @iframePage
Feature: IFrame Page Tests
    As a user
    I want to interact with content within iframes
    So that I can test iframe functionality and nested content

    Background:
        Given I navigate to the iframe page

    @tabNavigation
    Scenario: Verify single iframe tab is active on page load
        Then the active tab should be "Single Iframe"

    @tabNavigation
    Scenario: Verify switch between iframe tabs functionality
        When I click on the "multiple" iframe tab
        Then the active tab should be "Iframe with in an Iframe"
        When I click on the "single" iframe tab
        Then the active tab should be "Single Iframe"

    @iframeContent @headerContent
    Scenario: Verify header content in single iframe
        When I click on the "single" iframe tab
        And I switch to the "single" iframe
        Then the iframe header should contain "iFrame Demo"

    @iframeContent @headerContent
    Scenario: Verify header content in multiple iframe
        When I click on the "multiple" iframe tab
        And I switch to the "multiple" iframe
        Then the iframe header should contain "Nested iFrames"

    @iframeContent @headerContent
    Scenario: Verify header content in nested iframe
        When I click on the "multiple" iframe tab
        And I switch to the "multiple" iframe
        And I switch to the "multiple-inner" iframe
        Then the iframe header should contain "iFrame Demo"

    @iframeContent @componentsPresence
    Scenario: Verify components presence in single iframe based on selenium switch to frame
        When I click on the "single" iframe tab
        Then the iframe header should be "not present"
        Then the iframe input should be "not present"
        And I switch to the "single" iframe
        Then the iframe header should be "present"
        Then the iframe input should be "present"
        When I switch back to the main page content
        Then the iframe header should be "not present"
        Then the iframe input should be "not present"

    @iframeContent @componentsPresence
    Scenario: Verify components presence in multiple iframe based on selenium switch to frame
        When I click on the "multiple" iframe tab
        Then the iframe header should be "not present"
        Then the iframe input should be "not present"
        And I switch to the "multiple" iframe
        Then the iframe header should be "present"
        Then the iframe input should be "not present"
        When I switch back to the main page content
        Then the iframe header should be "not present"
        Then the iframe input should be "not present"

    @iframeContent @componentsPresence
    Scenario: Verify components presence in multiple-inner iframe based on selenium switch to frame
        When I click on the "multiple" iframe tab
        Then the iframe header should be "not present"
        Then the iframe input should be "not present"
        And I switch to the "multiple" iframe
        And I switch to the "multiple-inner" iframe
        Then the iframe header should be "present"
        Then the iframe input should be "present"
        When I switch back to the main page content
        Then the iframe header should be "not present"
        Then the iframe input should be "not present"

    @iframeContent @inputInteraction
    Scenario: Enter text in the single iframe input field
        When I click on the "single" iframe tab
        And I switch to the "single" iframe
        And I enter "Test Text" into the iframe input
        Then the iframe input should have value "Test Text"

    @iframeContent @inputInteraction
    Scenario: Enter text in the multiple-nested iframe input field
        When I click on the "multiple" iframe tab
        And I switch to the "multiple" iframe
        And I switch to the "multiple-inner" iframe
        And I enter "Test Text" into the iframe input
        Then the iframe input should have value "Test Text"

    @iframeContent @inputInteractionExtra
    Scenario: Entering text in the multiple-nested iframe input field does not influence the single iframe input field
        When I click on the "multiple" iframe tab
        And I switch to the "multiple" iframe
        And I switch to the "multiple-inner" iframe
        And I enter "Test Text" into the iframe input
        Then the iframe input should have value "Test Text"
        When I switch back to the main page content
        And I switch to the "single" iframe
        Then the iframe input should have value ""
        When I switch back to the main page content
        When I click on the "multiple" iframe tab
        And I switch to the "multiple" iframe
        And I switch to the "multiple-inner" iframe
        Then the iframe input should have value "Test Text"