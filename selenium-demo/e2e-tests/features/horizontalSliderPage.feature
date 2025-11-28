@POM @horizontalSliderPage
Feature: Horizontal Slider

    Background:
        Given I navigate to the horizontal slider page

    @horizontalSlider @initialState
    Scenario: Verify horizontal slider page initial state
        Then I should see the horizontal slider header "Horizontal Slider"
        And I should see the horizontal slider subheader
        And the slider min value should be "0.0"
        And the slider max value should be "5.0"
        And the slider step value should be "0.5"
        And the range value should be "0"

    @horizontalSlider @sliderInteraction
    Scenario Outline: Verify slider value changes to <value>
        When I set the slider to "<value>"
        Then the range value should be "<value>"
        And the slider current value should be "<value>"

        Examples:
            | value |
            | 0.5   |
            | 1     |
            | 2.5   |
            | 4     |
            | 5     |