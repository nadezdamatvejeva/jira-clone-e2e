import CreateIssueModal from "../../pages/CreateIssueModal";
import { faker } from '@faker-js/faker'
import BoardPage from "../../pages/BoardPage";
import Common from "../../pages/Common";
import IssueDetailPage_Nadezda from "../../pages/IssueDetailPage_Nadezda";

describe('Deletion of create', () => {
    beforeEach(() => {
        cy.visit('/');
        CreateIssueModal.openNewIssueModal();
        CreateIssueModal.editTitle("FOR_TEST");
        CreateIssueModal.clickCreateIssueButton();
    });


    it.only('Task 1: add ,edit and remove estimation', () => {
    const estimation_1 = "5";
    const estimation_2 = "7";
        
        BoardPage.openIssueWithTitle("FOR_TEST");
        
        //add estimation
        IssueDetailPage_Nadezda.editEstimation(estimation_1);
        IssueDetailPage_Nadezda.verifyEstimationIsVisibleInTimeTracking(estimation_1);
        IssueDetailPage_Nadezda.closeIssueDetailPage();

        BoardPage.openIssueWithTitle("FOR_TEST");
        IssueDetailPage_Nadezda.checkEstimation(estimation_1);
        IssueDetailPage_Nadezda.verifyEstimationIsVisibleInTimeTracking(estimation_1);

        //edit estimation
        IssueDetailPage_Nadezda.editEstimation(estimation_2);
        IssueDetailPage_Nadezda.verifyEstimationIsVisibleInTimeTracking(estimation_2);
        IssueDetailPage_Nadezda.closeIssueDetailPage();

        BoardPage.openIssueWithTitle("FOR_TEST");
        IssueDetailPage_Nadezda.verifyEstimationIsVisibleInTimeTracking(estimation_2);

        //remove estimation
        IssueDetailPage_Nadezda.removeEstimation();
        IssueDetailPage_Nadezda.verifyEstimationIsNotVisibleInTimeTracking();

    })

    it('Task 2: add, edit and remove tracked time', () => {
        const tracked_1 = "3";
        const tracked_2 = "4";

        BoardPage.openIssueWithTitle("FOR_TEST");
        IssueDetailPage_Nadezda.verifyTrackedTimeIsVisible("No time logged");

        //add tracked time
        IssueDetailPage_Nadezda.editTrackingTime(tracked_1);
        IssueDetailPage_Nadezda.verifyTrackedTimeIsVisible(tracked_1);

        //edit tracked time
        IssueDetailPage_Nadezda.editTrackingTime(tracked_2);
        IssueDetailPage_Nadezda.verifyTrackedTimeIsVisible(tracked_2);

        //remove estimation
        IssueDetailPage_Nadezda.removeTrackingTime();
        IssueDetailPage_Nadezda.verifyTrackedTimeIsVisible("No time logged");

    });

});
