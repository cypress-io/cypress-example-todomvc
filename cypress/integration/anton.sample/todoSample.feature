Feature: Managing of todo list
  As a user
  I want to use todo list functionality
  So I can plan my activities

  Background:
    When I add items via localStorage
    When I open todo list page
    Then I see that header is shown
    Then I see that "item1" item is presented
    Then I see that footer is shown

  Scenario: Add new item into the list
    When I type "Test1" into input field and press Enter
    Then I see that "Test1" item is presented
    Then I see that number of left items is "4"

  Scenario: Edit added item from the list
    When I double click on "item1" item
    When I type "Test1" into edit field and press Enter
    Then I see that "Test1" item is presented

  Scenario: Remove added item from the list
    Then I see that number of left items is "3"
    When I delete "item1" item
    Then I see that "item1" item is not presented
    Then I see that number of left items is "2"

  Scenario: Check off added item in the list
    When I check off "item1" item
    Then I see that "item1" item is changed to completed

  Scenario: Filter added items
    Then I see that "Clear completed" button is not presented
    Then I see that number of left items is "3"
    When I check off "item1" item
    Then I see that "Clear completed" button appears
    Then I see that number of left items is "2"
    When I click "Active" filter button
    Then I see that "item1" item is not presented
    When I click "Completed" filter button
    Then I see that "item0" item is not presented
    Then I see that "item2" item is not presented
    When I click "All" filter button
    Then I see that "item0" item is presented
    Then I see that "item1" item is presented
    Then I see that "item2" item is presented
    When I click "Clear completed" button
    Then I see that "item1" item is not presented
    Then I see that "item0" item is presented
    Then I see that "item2" item is presented
