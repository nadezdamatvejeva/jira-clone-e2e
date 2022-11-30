import IssueModal from "../../pages/IssueModal";
import { faker } from '@faker-js/faker'
import BoardPage from "../../pages/BoardPage";
import Common from "../../pages/Common";

describe('Issue create', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    const errorMessage = 'This field is required';

    it('Task 1: required fields are missing', () => {
        IssueModal.openNewIssueModal();
        IssueModal.clickCreateIssueButton();
        IssueModal.checkTitleFieldIsInErrorState();
        Common.ensureErrorMessageIsVisible(errorMessage);
    })

    const dataTask2 = {
        type: "Task",
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph()
    }

    it('Task 2: create new issue Task', () => {
        IssueModal.openNewIssueModal();
        IssueModal.selectIssueType(dataTask2.type);
        IssueModal.editTitle(dataTask2.title);
        IssueModal.editDescription(dataTask2.description);
        IssueModal.clickCreateIssueButton();

        BoardPage.ensureCreatedIssueIsVisible(dataTask2.title);
        BoardPage.ensureIssueIsFirstOnTheBoard(dataTask2.title);
        BoardPage.ensureFirstIssueHasType(dataTask2.type);
    });

    const dataTask3 = {
        type: "Bug",
        priority: "Highest",
        reporter: "Pickle Rick",
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph()
    }

    it('Task 3: create new issue Bug', () => {
        IssueModal.openNewIssueModal();
        IssueModal.selectIssueType(dataTask3.type);
        IssueModal.selectReporter(dataTask3.reporter);
        IssueModal.editTitle(dataTask3.title);
        IssueModal.editDescription(dataTask3.description);
        IssueModal.clickCreateIssueButton();

        BoardPage.ensureCreatedIssueIsVisible(dataTask3.title);
        BoardPage.ensureIssueIsFirstOnTheBoard(dataTask3.title);
        BoardPage.ensureFirstIssueHasType(dataTask3.type);
    });
});
