class BoardPage {
    constructor() {
        this.issue = '[data-testid="list-issue"]';
        this.typePartialSelector = '[data-testid="icon:'
        this.board = '#root';
        this.issueDetailPage = '[data-testid="modal:issue-details"]';
    }

    ensureCreatedIssueIsVisible(title) {
        cy.contains(title).should('be.visible');
    }

    ensureCreatedIssueIsNotVisible(title) {
        cy.contains(title).should('not.be.visible');
    }

    ensureIssueIsFirstOnTheBoard(title) {
        cy.get(this.issue).first().within(() => {
            cy.get('p').invoke('text').should('contain', title);
        })
    }

    ensureFirstIssueHasType(type) {
        cy.get(this.issue).first().within(() => {
            cy.get(this.typePartialSelector + type.toLowerCase() + "\"]").should('be.visible');
        })
    }

    openIssueWithTitle(title) {
        cy.contains(title).click();
        cy.get(this.issueDetailPage).should('be.visible');
    }
}

export default new BoardPage();