@POM @brokenImagesPage
Feature: Broken Images Page

  Background:
    Given I navigate to the Broken Images page
  @brokenImages @assertions
  Scenario: Verify initial images count
    Then there should be "3" images on the page

  @brokenImages @clicks
  Scenario: Verify the broken images count
    Then there should be "2" broken images on the page

  @brokenImages @clicks
  Scenario: Verify the image sources
    Then the images have the following sources
      | ImageNumber  | SourceURL                                                   |
      | 1            | https://the-internet.herokuapp.com/asdf.jpg                 |
      | 2            | https://the-internet.herokuapp.com/hjkl.jpg                 |
      | 3            | https://the-internet.herokuapp.com/img/avatar-blank.jpg     |