Feature: Searching product by keyword
  As a user
  I want to use search functionality
  So I can quicky order desired product

  Scenario: Find product by keyword
    When I open Automation Practice website
    Then I should be on home page
    When I search by "Blouse" keyword
    Then I should see relevant results
