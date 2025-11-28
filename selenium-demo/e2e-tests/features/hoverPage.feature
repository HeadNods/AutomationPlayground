@POM @hoverPage
Feature: Hovers

    Background:
        Given I navigate to the hover page

    @hover @initialState
    Scenario: Verify hover page initial state
        Then I should see the hover header "Hovers"
        And I should see the hover description "Hover over the image for additional information"
        And figure 1 caption should not be displayed
        And figure 2 caption should not be displayed
        And figure 3 caption should not be displayed

    @hover @hoverInteraction
    Scenario: Verify hovering over figure 1 displays caption
        When I hover over figure 1
        Then figure 1 caption should be displayed
        And figure 1 caption title should be "name: user1"
        And figure 1 caption link text should be "View profile"
        And figure 1 caption link href should contain "/users/1"

    @hover @hoverInteraction
    Scenario: Verify hovering over figure 2 displays caption
        When I hover over figure 2
        Then figure 2 caption should be displayed
        And figure 2 caption title should be "name: user2"
        And figure 2 caption link text should be "View profile"
        And figure 2 caption link href should contain "/users/2"

    @hover @hoverInteraction
    Scenario: Verify hovering over figure 3 displays caption
        When I hover over figure 3
        Then figure 3 caption should be displayed
        And figure 3 caption title should be "name: user3"
        And figure 3 caption link text should be "View profile"
        And figure 3 caption link href should contain "/users/3"
