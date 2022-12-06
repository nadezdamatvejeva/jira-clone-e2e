import CreateIssueModal from "../../pages/CreateIssueModal";
import { faker } from '@faker-js/faker'
import BoardPage from "../../pages/BoardPage";
import Common from "../../pages/Common";
import IssueDetailPage_Nadezda from "../../pages/IssueDetailPage_Nadezda";

describe('Issue create', () => {
    beforeEach(() => {
        cy.visit('/');
        CreateIssueModal.createIssueUsingCreateButton(createdIssue);
    });


    const createdIssue = {
        title: "TEST_TITLE",
        type: "Bug",
        description: "TEST_DESCRIPTION",
        assignee: "Lord Gaben",
      };

    it('Task 1: delete issue', () => {
        CreateIssueModal.createIssueUsingCreateButton(createdIssue);
        BoardPage.openIssueWithTitle(createdIssue.title);
        IssueDetailPage_Nadezda.deleteIssue();
        IssueDetailPage_Nadezda.confirmDeletion(true);
        BoardPage.ensureCreatedIssueIsNotVisible(createdIssue.title);
    })

});
