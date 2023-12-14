/// <reference types="cypress" />

describe('Secret Menu Items', () => {
  beforeEach(() => {
    cy.visit('/secret-menu');

    cy.get('#minimum-rating-visibility').as('rating-filter');
    cy.get('#restaurant-visibility-filter').as('restaurant-filter');
    cy.get('table').as('table');
  });

  
  it('should set the range and verify it', () => {
    const minRating = 3;

    cy.get('@rating-filter').invoke('val', minRating).trigger('input');
    cy.get('@rating-filter').should('have.value', minRating);
    cy.get('@table').find('tbody tr').each(($el) => {
      cy.wrap($el).find('td:nth-child(6)>div').invoke('text').then(parseInt).should('be.a', 'number').and('gte', minRating - 1);
    });
  });

  it('should check the checkbox and verify it', () => {
    cy.get('#show-name').as('show-name-checkbox')
      .check().should('be.checked')
      .uncheck().should('be.not.checked');
  });

  it('should select an option from the select and verify it', () => {
    cy.get('@restaurant-filter').select('McDonalds');
    cy.get('@restaurant-filter').should('have.value', 'McDonalds');
    cy.get('@table').find('tbody tr').each(($el) => {
      cy.wrap($el).should('contain.text', 'McDonalds');
    });
  });
});
