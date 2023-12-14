/// <reference types="cypress" />

describe('Create a New Item', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
  })

  it('should', () => {
    cy.get('form').should('exist')
  })

  it('should have the words "Add Item"', () => {
    cy.get('form').should('contain', 'Add Item')
  })

  it('should out stuff in an input field', () => {
    cy.get('[data-test="new-item-input"]').type('Good attitude')
    cy.get('[data-test="add-item"]').click();
  })
});
