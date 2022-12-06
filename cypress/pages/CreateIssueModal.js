
class CreateIssueModal {
    constructor() {
        this.submitButton = 'button[type="submit"]';
        this.issueModal = '[data-testid="modal:issue-create"]';
        this.title = 'input[name="title"]';
        this.issueType = '[data-testid="select:type"]';
        this.descriptionField = '.ql-editor';
        this.assignee = '[data-testid="select:userIds"]';
        this.reporter = '[data-testid="select:reporterId"]';
        this.backlogList = '[data-testid="board-list:backlog"]';
        this.issuesList = '[data-testid="list-issue"]';
        this.newIssueButton = '[data-testid="icon:plus"]';
    }

    getIssueModal() {
        return cy.get(this.issueModal);
    }

    openNewIssueModal() {
        cy.get(this.newIssueButton).click();
        cy.get(this.issueModal).should('be.visible');
    }

    selectIssueType(issueType) {
        cy.get(this.issueType).invoke('text').then((extractedText) => {
            if (extractedText != issueType) {
                 cy.get(this.issueType).click('bottomRight');
                cy.get(`[data-testid="select-option:${issueType}"]`)
                 .trigger('mouseover')
                .trigger('click');
            }
        })
    }

    selectAssignee(assigneeName) {
        cy.get(this.assignee).click('bottomRight');
        cy.get(`[data-testid="select-option:${assigneeName}"]`).click();
    }

    selectReporter(reporterName) {
        cy.get(this.reporter).click('bottomRight');
        cy.get(`[data-testid="select-option:${reporterName}"]`).click();
    }

    editTitle(title) {
        cy.wait(1000);
        cy.get(this.title).type(title);
    }

    editDescription(description) {
        cy.get(this.descriptionField).type(description);
    }

    createIssue(issueDetails) {
        this.getIssueModal().within(() => {
            this.selectIssueType(issueDetails.type);
            this.editTitle(issueDetails.title);
            this.editDescription(issueDetails.description);
            this.selectAssignee(issueDetails.assignee);
            cy.get(this.submitButton).click();
        });
    }

    createIssueUsingCreateButton(issueDetails) {
        this.openNewIssueModal();
        this.selectIssueType(issueDetails.type);
        this.editTitle(issueDetails.title);
        this.editDescription(issueDetails.description);
        this.selectAssignee(issueDetails.assignee);
        this.clickCreateIssueButton();
    }

    clickCreateIssueButton() {
        cy.get(this.submitButton).click();
        cy.get(this.issueModal).should('not.exist');
    }

    ensureIssueIsCreated(expectedAmountIssues, issueDetails) {
        cy.get(this.issueModal).should('not.exist');
        cy.contains('Issue has been successfully created.').should('not.exist');

        cy.get(this.backlogList).should('be.visible').and('have.length', '1').within(() => {
            cy.get(this.issuesList)
                .should('have.length', expectedAmountIssues)
                .first()
                .find('p')
                .contains(issueDetails.title);
            cy.get(`[data-testid="avatar:${issueDetails.assignee}"]`).should('be.visible');
        });
    }


    ensureIssueTitleIsCorrect(issueTitle) {
        cy.get(this.backlogList).should('be.visible').within(() => {
            cy.get(this.issuesList)
                .first()
                .find('p').invoke('text')
                .should('contain', issueTitle);
        });
    }

    checkTitleFieldIsInErrorState() {
        cy.get(this.title).scrollIntoView().should('have.css', 'border').and('contain', 'rgb(225, 60, 60)');
    }





}

export default new CreateIssueModal();