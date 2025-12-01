@POM @geoLocationPage
Feature: Geolocation

    Background:
        Given I navigate to the geolocation page

    @geoLocation @initialState
    Scenario: Verify geolocation page initial state
        Then I should see the header "Geolocation"
        And I should see the button text "Where am I?"
        And I should see the demo text "Click the button to get your current latitude and longitude"

    @geoLocation @initialState
    Scenario: Verify geolocation functionality with simulated coordinates
        When I click the "Where am I?" button on the geolocation page
        Then I should see the demo text "Latitude"
        And I should see the demo text "Longitude" 
        And I should see the latitude "555"
        And I should see the longitude "999"
        And I should see the map link text "See it on Google"
        And the map link should contain the coordinates "555,999"