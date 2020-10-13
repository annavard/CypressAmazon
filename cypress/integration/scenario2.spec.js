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

describe('Check displayed number of results for category Smart Home | Televisions', () => {
    it('Selects Smart Home category', () => {
        cy.get('#nav-hamburger-menu').click();

        cy.get('#hmenu-canvas').should('be.visible');

        cy.get('.hmenu li').contains('Smart Home').find('i').click();

        cy.get('.hmenu-title')
            .contains(/^smart home$/)
            .should('be.visible');
    });

    it('Selects Televisions category', () => {
        cy.get('.hmenu-item').contains('Televisions').click();

        cy.get('h1')
            .contains(/^Smart Home \| Televisions$/)
            .should('be.visible');
    });

    it('Verifies number of displayed items is equal to total number', () => {
        const countNext = (realCount, totalCount) => {
            realCount += Cypress.$('.s-asin, [data-asin] > .s-item-container')
                .length;

            const nextButton = Cypress.$(
                '#pagnNextLink, .a-pagination .a-last:not(.a-disabled)'
            );

            if (nextButton.length) {
                cy.wrap(nextButton).click();

                cy.get('#pagn, .a-pagination').then(() => {
                    countNext(realCount, totalCount);
                });
            } else {
                cy.wrap(realCount).should('eq', totalCount);
            }
        };

        let totalCount = 0;

        cy.get('#s-result-count')
            .invoke('text')
            .then((text) => {
                totalCount = parseInt(text.split(' ')[2], 10);

                countNext(0, totalCount);
            });
    });
});
