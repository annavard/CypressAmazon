before(() => {
    cy.visit('https://www.amazon.com/');

    cy.get('#icp-nav-flyout').click();

    cy.get('#lop-heading').should('be.visible');

    cy.get('[type="radio"]').check('en_US');

    cy.get('#icp-sc-dropdown').select('USD', {
        force: true,
    });

    cy.get('.a-button-input').click();

    cy.url().should(
        'eq',
        'https://www.amazon.com/?currency=USD&language=en_US'
    );
});

describe("Checks selected currency displayed for the products' price", () => {
    it('Changes currency to AED and verifies it is changed', () => {
        cy.get('#icp-nav-flyout').click();

        cy.get('#icp-sc-heading').should('be.visible');

        cy.get('#icp-sc-dropdown').select('AED', {
            force: true,
        });

        cy.get('.a-button-input').click();

        cy.contains('Shop now').click();

        cy.contains('AED').should('be.visible');
    });
});
