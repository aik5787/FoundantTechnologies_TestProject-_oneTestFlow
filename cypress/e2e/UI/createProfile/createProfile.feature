Feature: Create Profile

  Scenario: Complete User Workflow
    Given I navigate to the Foundant application
    When I log in with valid credentials
    And I open the BETA site
    Then I should see the BETA site successfully loaded
    And I navigate to the PROFILES section
    When I create a new profile with necessary details
    Then the new profile should be successfully created
    And I navigate to the user profile
    When I add a note to the profile
    Then the new note should be successfully created and deleted
    And I add a task to the profile
    Then the new task should be successfully created and deleted
    When I log out
    Then I should be redirected to the login page
