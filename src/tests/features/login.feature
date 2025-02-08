Feature: SauceDemo Login Functionality

  Scenario: Successful login
    Given I open the SauceDemo login page
    When I enter valid credentials
    And I click the login button
    Then I should see the inventory page

  Scenario: Unsuccessful login
    Given I open the SauceDemo login page
    When I enter invalid credentials
    And I click the login button
    Then I should see an error message
