before(() => {
    console.log('beforeEach', 'beforeEach call');
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

describe('Checks gift card balance is $0.00', () => {
    const username = 'anna_vardanyan17@alumni.aua.am';
    const password = 'P@ssword123';

    it('Logs in and checks gift card balance', () => {
        cy.get('.nav-a.nav-a-2[data-nav-role="signin"]').trigger('mouseover');
        cy.get('#nav-flyout-ya-signin').click();

        cy.contains('Sign-In').should('be.visible');
        cy.get('#ap_email').type(username);
        cy.get('#continue').click();

        cy.contains('Password').should('be.visible');
        cy.get('#ap_password').type(password);
        cy.get('#signInSubmit').click();

        cy.contains('Hello, Anna').should('exist');

        cy.get('.nav-a.nav-a-2[data-nav-role="signin"]').trigger('mouseover');
        cy.get('a > .nav-text').contains('Your Account').click();
        cy.get('.ya-card__heading--rich').contains('Gift cards').click();
        cy.contains('Your Gift Card Balance').should('be.visible');

        cy.get('#gc-ui-balance-gc-balance-value').then((cardBalance) => {
            const cardBalanceText = cardBalance.get(0).innerText;
            cy.wrap('$0.00').should('eq', cardBalanceText);
        });
    });
});

//   it("Creates Account and logs in", () => {
//   cy.visit("https://www.amazon.com/");

//   cy.get('.nav-a.nav-a-2[data-nav-role="signin"]').trigger("mouseover");

//   cy.get("#nav-flyout-ya-newCust a").click();

//   cy.get('#ap_customer_name').type('test_name');

//   cy.get('#ap_email').type('bacertol@freeallapp.com');

//   cy.get('#ap_password').type('test_password');

//   cy.get('#ap_password_check').type('test_password');

//   cy.get('#continue').click();

// });
