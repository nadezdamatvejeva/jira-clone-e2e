class IssueCard {
    constructor() {
        this.issueDetailsCard = '[data-testid="modal:issue-details"]';
        this.issueType = '[data-testid="select:type"]';
        this.issueTypeOptions = '[data-testid="select-option:';
        this.issueStatus = '[data-testid="select:status"]';
        this.assigneeField = '[data-testid="select:assignees"]';
        this.reporterField = '[data-testid="select:reporter"]';
        this.priorityField = '[data-testid="select:priority"]';
        this.issueTitle = 'textarea[placeholder="Short summary"]';
        this.descriptionFieldPreview = '.ql-snow';
        this.descriptionEditingField = '.ql-editor';
    }

    getIssueCard() {
        return cy.get(this.issueDetailsCard);
    }

    changeIssueType(issueType) {
        cy.get(this.issueType).click('bottomRight');
        cy.get(`${this.issueTypeOptions}${issueType}"]`)
            .trigger('mouseover')
            .trigger('click');
        cy.get(this.issueType).should('contain', issueType);
    }

    changeStatus(status) {
        cy.get(this.issueStatus).click('bottomRight');
        cy.get(`${this.issueTypeOptions}${status}"]`).click();
        cy.get(this.issueStatus).should('have.text', status);
    }

    addAssignee(assigneeName) {
        cy.get(this.assigneeField).click('bottomRight');
        cy.get(`${this.issueTypeOptions}${assigneeName}"]`).click();
        cy.get(this.assigneeField).should('contain', assigneeName);
    }

    changeReporter(reporterName) {
        cy.get(this.reporterField).click('bottomRight');
        cy.get(`${this.issueTypeOptions}${reporterName}"]`).click();
        cy.get(this.reporterField).should('have.text', reporterName);
    }

    changePriority(priority) {
        cy.get(this.priorityField).click('bottomRight');
        cy.get(`${this.issueTypeOptions}${priority}"]`).click();
        cy.get(this.priorityField).should('have.text', priority);
    }

    changeTitle(title) {
        cy.get(this.issueTitle).clear().type(title).blur();
        cy.get(this.descriptionFieldPreview).click().should('not.exist');
        cy.get(this.issueTitle).should('have.text', title);
    }

    changeDescription(description) {
        cy.get(this.descriptionEditingField).clear().type(description);
        cy.contains('button', 'Save').click().should('not.exist');
    }

    ensureTitleAndDescriptionUpdated(title, description) {
        cy.get(this.issueTitle).should('have.text', title);
        cy.get(this.descriptionFieldPreview).should('have.text', description);
    }

    /**
     * Workshop #16 expanded method with for..of loop (Task 1)
     * @param expectedInfo is equal to the object we used for editing the issue
     */
    ensureIssueIsUpdated(expectedInfo) {
        const issueDetails = [
            [this.priorityField, expectedInfo.priority],
            [this.issueStatus, expectedInfo.status],
            [this.reporterField, expectedInfo.reporter],
        ];

        for (const [selector, value] of issueDetails) {
            cy.get(selector).should('have.text', value)
        }
    }

    /**
     * Workshop 16 with if condition (Task 2)
     * @param expectedInfo is equal to the object that we used when we edited the issue
     */
    ensureIssueIsUpdatedComplete(expectedInfo) {
        const issueDetails = [
            [this.priorityField, expectedInfo.priority],
            [this.issueStatus, expectedInfo.status],
            [this.reporterField, expectedInfo.reporter],
            [this.assigneeField, expectedInfo.assignees.firstAssignee],
            [this.assigneeField, expectedInfo.assignees.secondAssignee],
        ];

        for (const [selector, value] of issueDetails) {
            if (selector === this.assigneeField) {
                cy.get(selector).should('contain', value)
            } else {
                cy.get(selector).should('have.text', value)
            }
        }
    }
}

export default new IssueCard();