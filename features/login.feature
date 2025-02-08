Feature: OrangeHRM Login Functionality

  Scenario: Successful login
    Given I navigate to OrangeHRM login page
    When I enter valid credentials
    And I click login button
    Then I should be redirected to dashboard

  Scenario: Unsuccessful login with invalid credentials
    Given I navigate to OrangeHRM login page
    When I enter invalid credentials
    And I click login button
    Then I should see an error message
