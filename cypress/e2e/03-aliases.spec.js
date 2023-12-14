/// <reference types="cypress" />

describe('Aliases', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');

    cy.get('[data-test="items"]').as('allItems');
    cy.get('[data-test="items-unpacked"]').as('unpackedItems');
    cy.get('[data-test="items-packed"]').as('packedItems');
    cy.get('[data-test="filter-items"]').as('filterInput');
  });

  it('should filter the items shown on the page', () => {
    cy.get('@filterInput').type('iPhone');

    cy.get('@allItems').find('li').each(($el) => {
      cy.wrap($el).should('contain.text', 'iPhone')
    });
  });
});
