import CreateIssueModal from "../../pages/CreateIssueModal";
import { faker } from '@faker-js/faker'
import BoardPage from "../../pages/BoardPage";
import Common from "../../pages/Common";

describe('Issue create', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    const errorMessage = 'This field is required';

    it('Task 1: required fields are missing', () => {
        CreateIssueModal.openNewIssueModal();
        CreateIssueModal.clickCreateIssueButton();
        CreateIssueModal.checkTitleFieldIsInErrorState();
        Common.ensureErrorMessageIsVisible(errorMessage);
    })

    const dataTask2 = {
        type: "Task",
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph()
    }

    it('Task 2: create new issue Task', () => {
        CreateIssueModal.openNewIssueModal();
        CreateIssueModal.selectIssueType(['dataTask2.type']);
        CreateIssueModal.editTitle(dataTask2.title);
        CreateIssueModal.editDescription(dataTask2.description);
        CreateIssueModal.clickCreateIssueButton();

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
        CreateIssueModal.openNewIssueModal();
        CreateIssueModal.selectIssueType(dataTask3.type);
        CreateIssueModal.selectReporter(dataTask3.reporter);
        CreateIssueModal.editTitle(dataTask3.title);
        CreateIssueModal.editDescription(dataTask3.description);
        CreateIssueModal.clickCreateIssueButton();

        BoardPage.ensureCreatedIssueIsVisible(dataTask3.title);
        BoardPage.ensureIssueIsFirstOnTheBoard(dataTask3.title);
        BoardPage.ensureFirstIssueHasType(dataTask3.type);
    });


    it.only('test', () => {
       cy.get('[data-testid="board-list:backlog"] p').first().click();
    });

});
