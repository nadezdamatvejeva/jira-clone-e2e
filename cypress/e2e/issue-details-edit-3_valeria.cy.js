import { faker } from '@faker-js/faker';
import IssueCard from "../pages/IssueCard";
/**
 * Workshop #15
 * 1. Start creating classes for testable objects, such as "Issue"
 * 2. Move test actions into functions as we did on demo previously
 *    2.1 Update issue type, description etc.
 * 3. Use those functions in the spec file
 *
 * Expected result:
 * 1. New class with methods for updating title, description etc.
 * 2. Variables correctly stored
 *    Bonus: used random data generator library (faker.js)
 */

/**
 * Workshop #16
 * Task #1
 * 1. Look for previously created method for validating information in the field (any field)
 *    1.1 One of them was: cy.get('[data-testid="select:priority"]').should('have.text', 'Medium');
 * 2. Define an object with expected information in the style: selector/it's value
 * 3. Update method to go over this object and assert information in the field using "for..of" loop
 *
 * Expected result:
 * 1. You will have defined object with at least priority, status and reporter selectors and their values
 * 2. Your method runs X amount of times and assert information in the field without code duplication
 *
 * Task #2
 * Most of the field in this file are using should('have.text') assertion, however, there are some which uses should('contain')
 * From the previous task expand the solution with "if" check which would allow us to assert using different should assertion but still keep all the code inside one loop without creating separated assertion
 *
 * Expected result:
 * 1. Previously created method will have more selectors included in the object (for example, assignees are added)
 */

describe('Issue details editing', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', 'https://jira.ivorreic.com/project').then((url) => {
      cy.visit(url + '/board');
      cy.contains('This is an issue of type: Task.').click();
    });
  });

  const issueDetailsForEdit = {
    type: 'Story',
    status: 'Done',
    assignees: {
      firstAssignee: 'Baby Yoda',
      secondAssignee: 'Lord Gaben',
    },
    reporter: 'Pickle Rick',
    priority: 'Medium',
  };

  it('Should update type, status, assignees, reporter, priority successfully', () => {
    IssueCard.getIssueCard().within(() => {
      IssueCard.changeIssueType(issueDetailsForEdit.type);
      IssueCard.changeStatus(issueDetailsForEdit.status);
      IssueCard.addAssignee(issueDetailsForEdit.assignees.firstAssignee);
      IssueCard.addAssignee(issueDetailsForEdit.assignees.secondAssignee);
      IssueCard.changeReporter(issueDetailsForEdit.reporter);
      IssueCard.changePriority(issueDetailsForEdit.priority);
      /**
       * Workshop 16 Task 1 method
       */
      IssueCard.ensureIssueIsUpdated(issueDetailsForEdit);

      /**
       * Workshop 16 Task 2 method (expanded Task 1 method)
       */
      IssueCard.ensureIssueIsUpdatedComplete(issueDetailsForEdit);
    });
  });

  /**
   * Workshop 16 another possible way to use for..of
   */
  it('Should update priority in cycle', () => {
    const priorities = ['Low', 'Lowest', 'High', 'Highest', 'Medium'];

    IssueCard.getIssueCard().within(() => {
      for (let priority of priorities) {
        IssueCard.changePriority(priority);
      }
    });
  });

  it('Should update title, description successfully', () => {
    const title = faker.lorem.word();
    const description = faker.lorem.paragraph();

    IssueCard.getIssueCard().within(() => {
      IssueCard.changeTitle(title);
      IssueCard.changeDescription(description);
      IssueCard.ensureTitleAndDescriptionUpdated(title, description);
    });
  });

  it('Should delete an issue successfully', () => {
    getIssueDetailsModal()
      .find(`button ${'[data-testid="icon:trash"]'}`)
      .click();

    cy.get('[data-testid="modal:confirm"]')
      .contains('button', 'Delete issue')
      .click();
    cy.get('[data-testid="modal:confirm"]')
        .should('not.exist');

    cy.contains('This is an issue of type: Task.').should('not.exist');

  });

  const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
});
