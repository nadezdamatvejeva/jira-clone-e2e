class Common {

    ensureValueIsEdited (selector, value){
        cy.get(selector).should('have.value', value);
    }
}

export default new Common();