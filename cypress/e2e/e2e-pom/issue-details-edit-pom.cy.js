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

import IssueDetailPage from "../../pages/IssueDetailPage_Nadezda";
import { faker } from '@faker-js/faker';

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
    cy.visit('https://jira.ivorreic.com/project/board');
    cy.contains(issueUnderTestTitle).click();
  });

  const issueUnderTestTitle = "This is an issue of type: Task.";

  const issueForUpdate = {
    type: "Story",
    status: "Done",
    assignee1: "Lord Gaben",
    assignee2: "Baby Yoda",
    reporter: "Pickle Rick",
    priority: "Medium",
    title: faker.lorem.sentence(),
    decsription: faker.lorem.paragraph(),
  };

  const issueForTask2 = [
    ["type", "Story"],
    ["status", "Done"],
    ["assignees", "Lord Gaben"],
    ["assignees", "Baby Yoda"],
    ["reporter", "Pickle Rick"],
    ["priority", "Medium"]
  ]

  const priorities = ["Lowest", "Low", "Medium", "High", "Highest"];

  it('Should update type, status, assignees, reporter, priority successfully', () => {
    IssueDetailPage.getIssueDetailModal().within(() => {
      IssueDetailPage.updateIssueTypeTo(issueForUpdate.type);
      IssueDetailPage.updateIssueStatusTo(issueForUpdate.status);
      IssueDetailPage.addIssueAssignee(issueForUpdate.assignee1);
      IssueDetailPage.addIssueAssignee(issueForUpdate.assignee2);
      IssueDetailPage.updateIssueReporterTo(issueForUpdate.reporter)
      IssueDetailPage.updateIssuePriorityTo(issueForUpdate.priority);

      IssueDetailPage.validateSavedData(issueForTask2);
    })
  });

  it('Should update title, description successfully', () => {
    IssueDetailPage.getIssueDetailModal().within(() => {
      IssueDetailPage.updateIssueTitleTo(issueForUpdate.title);
      IssueDetailPage.updateIssueDescriptionTo(issueForUpdate.decsription);
    });
  });

  // task #3, workshop #17
  it('Reporter test with regEx', () => {
    IssueDetailPage.getIssueDetailModal().within(() => {
      IssueDetailPage.reporterFieldShouldAllowOnlyCharacter();
    });
  });

  const numberOfPriorities = 5;

  //task #4, workshop #17
  it.only(`Check, that priority fields has ${numberOfPriorities} values`, () => {
    let priorities = [];

    //add already chosen priority to the list
    cy.get('[data-testid="select:priority"]').invoke('text').then((extractedPriority) => {
      priorities.push(extractedPriority);
    })

    //click to open options
    cy.get('[data-testid="select:priority"]').click();

    //get number of options from the page
    cy.get('[data-select-option-value]').then(($options) => {
      const itemCount = Cypress.$($options).length;

      //iterate through the options and
      //add text from each option to the list
      for (let index = 0; index < itemCount; index++) {
        cy.get('[data-select-option-value]')
          .eq(index).invoke('text').then((extractedPriority) => {
            priorities.push(extractedPriority);

            if (index == (itemCount - 1)) {
              cy.log("TOTAL calculated array length: " + priorities.length);
              expect(priorities.length).to.be.eq(numberOfPriorities);
            }
          });
      };
    });
  });

  it(`We are checking saving all possible priorities`, () => {
    for (let priority1 of priorities) {
      IssueDetailPage.getIssueDetailModal().within(() => {
        IssueDetailPage.updateIssuePriorityTo(priority1);
      });
    }
  });

  for (let priority of priorities) {
    it(`We are checking saving priority ${priority}`, () => {
      IssueDetailPage.getIssueDetailModal().within(() => {
        IssueDetailPage.updateIssuePriorityTo(priority);
      });
    });
  }

  it('Should delete an issue successfully', () => {
    IssueDetailPage.getIssueDetailModal();
    IssueDetailPage.deleteIssue();
    cy.contains(issueUnderTestTitle).should('not.exist');
  });
});
