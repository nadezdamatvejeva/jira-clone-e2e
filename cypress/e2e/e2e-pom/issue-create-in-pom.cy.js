/**
 * Workshop #14
 * This is an example file and approach for OOP in Cypress
 */
/// <reference types="Cypress" />
import IssueModal from "../../pages/IssueModal";
import { faker } from '@faker-js/faker'

describe('Issue create', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().then((url) => {
    cy.visit(url + '/settings?modal-issue-create=true');
  });
  });

  const issueDetails = {
    title: faker.lorem.sentence(),
    type: "Bug",
    description: "TEST_DESCRIPTION",
    assignee: "Lord Gaben",
  };

  const EXPECTED_AMOUNT_OF_ISSUES = '5';

  it('Should create issue successfully', () => {
    IssueModal.createIssueUsingCreateButton(issueDetails);
    IssueModal.ensureIssueIsCreated(EXPECTED_AMOUNT_OF_ISSUES, issueDetails);
  });

});
