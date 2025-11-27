@POM @fileUploadPage
Feature: File Upload Page

  Background:
    Given I navigate to the File Upload page

  @fileUpload @upload
  Scenario: Upload a file using the file input
    When I upload the file "e2e-tests/support/data/exampleTinyFile.png"
    And I click the upload submit button
    Then the uploaded file name should be "exampleTinyFile.png"
    And the file upload header should have changed into "File Uploaded!"

  @fileUpload @dragAndDrop @bugged @skip
  Scenario: Upload a file via drag and drop
    When I upload the file "e2e-tests/support/data/exampleTinyFile.png" via drag and drop
    Then the dropzone should display the file name "exampleTinyFile.png"
    And I wait for 3 seconds
    And I click the upload submit button
    Then the uploaded file name should be "exampleTinyFile.png"
    And the file upload header should have changed into "File Uploaded!"