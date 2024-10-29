Cypress Tests for Foundant Application

Welcome to the end-to-end testing suite for the Foundant application, powered by Cypress and the Cucumber preprocessor. These tests are crafted to ensure a robust and user-friendly experience, with scenarios covering essential workflows and functionality.

📑 Table of Contents

Features
Complete User Workflow
Setup
Prerequisites
Installation
Environment Variables
Running Tests
Locally
Specific Tests
GitHub Actions
Triggering the Workflow
Contributing

🌟 Features

Complete User Workflow

This scenario covers the entire user journey from login to logout, including profile management actions.

Given I navigate to the Foundant application
When I log in with valid credentials
And I open the BETA site
Then I should see the BETA site successfully loaded
And I navigate to the PROFILES section
When I create a new profile with necessary details
Then The new profile should be successfully created
And I navigate to the user profile
When I add a note to the profile
Then The new note should be successfully created and deleted
And I add a task to the profile
Then The new task should be successfully created and deleted
When I log out
Then I should be redirected to the login page

🛠 Setup

Prerequisites

Ensure Node.js (version 20 or above) is installed.

Installation

Clone this repository:

git clone git@github.com:aik5787/FoundantTechnologies_TestProject-_oneTestFlow.git

Navigate to the project directory:

cd FoundantTechnologies_TestProject-_oneTestFlow

Install the dependencies:

npm install

Environment Variables

Create a .env file or add these variables to your CI/CD environment:


USERNAME=your_username
PASSWORD=your_password

🚀 Running Tests

Locally

To launch Cypress with the GUI:

npx cypress open

To run in headless mode:

npx cypress run

Specific Tests

To run the test and generate a Mochawesome report:


npm run test:full

🖥 GitHub Actions

Triggering the Workflow

This repository leverages GitHub Actions to run tests on every pull request. The workflow file is located at .github/workflows/cypress-tests.yml.

Triggers:

Pull requests (opened, reopened, edited, synchronized)
Manually via workflow_dispatch

🤝 Contributing

Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch.
Make your changes.
Commit your changes.
Push to your branch.
