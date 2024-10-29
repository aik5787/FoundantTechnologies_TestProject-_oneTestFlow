import { Given, When, Then, Before, After } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../../page_objects/loginPage.mjs";
import UserSitesPage from "../../../page_objects/userSitesPage.mjs";
import verificationData from "../../../fixtures/verificationData.json";
import Header from "../../../page_objects/header.mjs";
import ProfilesPage from "../../../page_objects/profilesPage.mjs";
import CreateProfilePage from "../../../page_objects/createProfilePage.mjs";
import ProfilePage from "../../../page_objects/profilePage.mjs";
import newProfileData from "../../../fixtures/newProfileData.json";
import NewNotePage from "../../../page_objects/newNotePage.mjs";
import AllNotesPage from "../../../page_objects/allNotesPage.mjs";
import newNoteData from "../../../fixtures/newNoteData.json";
import urls from "../../../fixtures/urls.json";
import NewTaskPage from "../../../page_objects/newTaskPage.mjs";
import AllTasksPage from "../../../page_objects/allTasksPage.mjs";
import newTaskData from "../../../fixtures/newTaskData.json";

Before(() => {
  cy.setupTestEnvironment();
});

Given("I navigate to the Foundant application", () => {
  cy.visit("/");
});

When("I log in with valid credentials", () => {
  LoginPage.login(Cypress.env("USERNAME"), Cypress.env("PASSWORD"));
});

When("I open the BETA site", () => {
  UserSitesPage.betaSite.click();
});

Then("I should see the BETA site successfully loaded", () => {
  cy.url().should("include", verificationData.betaSiteUrl);
  cy.contains(verificationData.betaSiteTitle).should("exist");
});

When("I navigate to the PROFILES section", () => {
  Header.profileSection.click();
});

When("I create a new profile with necessary details", () => {
  ProfilesPage.addProfileButton.click();
  ProfilesPage.profileType.contains(newProfileData.profileType).click();
  cy.wrap(CreateProfilePage.fillProfileForm()).as("profileData");
});

Then("the new profile should be successfully created", () => {
  Header.profileSection.click();
  cy.get("@profileData").then((profileData) => {
    const fullName = `${profileData.firstName} ${profileData.lastName}`;
    ProfilesPage.nameSearchInput.type(fullName);
    ProfilesPage.searchResult.contains(fullName).should("exist").and("be.visible").click();
    ProfilePage.userEmail.should("have.text", profileData.email);
  });
});

When("I navigate to the user profile", () => {
  cy.visit(urls.userProfileUrl);
});

When("I add a note to the profile", () => {
  ProfilePage.addNoteButton.click();
  NewNotePage.addNewNote(newNoteData);
});

Then("the new note should be successfully created and deleted", () => {
  ProfilePage.allNotes.click();
  cy.contains(newNoteData.noteLabel).click();
  AllNotesPage.selectedNote.should("have.text", newNoteData.noteDetails);
  AllNotesPage.deleteNote(newNoteData);
});

When("I add a task to the profile", () => {
  cy.visit(urls.userProfileUrl);
  ProfilePage.addTaskButton.click();
  NewTaskPage.addNewTask(newTaskData);
});

Then("the new task should be successfully created and deleted", () => {
  Header.tasksSection.click();
  cy.contains(newTaskData.taskLabel).click();
  AllTasksPage.selectedTask.should("have.text", newTaskData.taskDetails);
  AllTasksPage.deleteTask(newTaskData.taskLabel);
});

When("I log out", () => {
  Header.profileIcon.click();
  Header.logoutButton.contains(verificationData.logoutButtonText).click();
});

Then("I should be redirected to the login page", () => {
  cy.contains(verificationData.loginPageText).should("exist");
});
