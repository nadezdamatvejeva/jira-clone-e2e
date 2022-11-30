class BoardPage {
    constructor() {
        this.issue = '[data-testid="list-issue"]';
        this.typePartialSelector = '[data-testid="icon:'
        this.board = '#root'
    }

    getBoard() {
        return cy.get(this.issueDetailsCard);
    }
    ensureCreatedIssueIsVisible(title){
        cy.contains(title).should('be.visible');
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
}

export default new BoardPage();