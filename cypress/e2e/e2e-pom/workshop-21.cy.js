import CreateIssueModal from "../../pages/CreateIssueModal";
import { faker } from '@faker-js/faker'
import BoardPage from "../../pages/BoardPage";
import Common from "../../pages/Common";
import IssueDetailPage_Nadezda from "../../pages/IssueDetailPage_Nadezda";

describe('Deletion of create', () => {
    beforeEach(() => {
        cy.visit('/');
        CreateIssueModal.openNewIssueModal();
        CreateIssueModal.editTitle("TO_DELETE");
        CreateIssueModal.clickCreateIssueButton();
    });

    it('Task 1: delete issue', () => {
        
        BoardPage.openIssueWithTitle("TO_DELETE");
        IssueDetailPage_Nadezda.deleteIssue();
        IssueDetailPage_Nadezda.confirmDeletion(true);
        BoardPage.ensureCreatedIssueIsNotVisible("TO_DELETE");
    })

    it.only('Task 2: cancel delete issue', () => {
        
        BoardPage.openIssueWithTitle("TO_DELETE");
        IssueDetailPage_Nadezda.deleteIssue();
        IssueDetailPage_Nadezda.confirmDeletion(false);
        
        BoardPage.ensureCreatedIssueIsVisible("TO_DELETE");
    })

});
