/// <reference types="cypress" />

describe('Input obstacles', () => {
  beforeEach(() => {
    cy.visit('/obstacle-course');
  });

  it('should input text into the input field', () => {
    const thought = 'Ravioli are a form of pop tart.';

    cy.get('[data-test="text-input"]').clear();
    cy.get('[data-test="text-result"]').invoke('text').should('be.empty');
    
    cy.get('[data-test="text-input"]').type(thought);
    cy.get('[data-test="text-result"]').contains(thought);
  });

  it('should control a select input', () => {
    cy.get('[data-test="select-input"]').select('Thor');
    cy.get('[data-test="select-result"]').contains('Thor');
  });

  it('should find and control a checkbox input', () => {
    cy.get('[data-test="checkbox-tomato"]').as('tomato-checkbox') 
    cy.get('@tomato-checkbox').closest('label').invoke('text').then(label => label.trim()).as('checkbox-label');

    cy.get('@tomato-checkbox').uncheck();
    cy.get('[data-test="checkbox-result"]').contains('(None)');
    cy.get('@tomato-checkbox').check();

    cy.get('@checkbox-label').then((text) => {
      cy.get('[data-test="checkbox-result"]').contains(text);
    });
  });

  it('should find and control a radio input', () => {
    cy.get('[data-test="radio-ringo"]').as('radio-ringo');
    cy.get('@radio-ringo').as('radio-label').closest('label').invoke('text').then(label => label.trim()).as('radio-label');

    cy.get('@radio-ringo').check();

    cy.get('@radio-label').then((text) => {
      cy.get('[data-test="radio-result"]').contains(text);
    });
  });

  it('should find and control a color input', () => {
    cy.get('[data-test="color-input"]').invoke('val', '#000').trigger('input');
    cy.get('[data-test="color-result"]').contains('#000');
  });

  it('should find and control a date input', () => {
    cy.get('[data-test="date-input"]').type('2024-01-01');
    cy.get('[data-test="date-result"]').contains('2024-01-01');
  });

  it('should find and control a range input', () => {
    const value = 3;
    cy.get('[data-test="range-input"]').invoke('val', value).trigger('input');
    cy.get('[data-test="range-input"]').should('have.value', value);;
    cy.get('[data-test="range-result"]').contains(value);
  });

  it('should find and control a file input', () => {
    cy.get('[data-test="file-input"]');
    cy.get('[data-test="file-result"]');
  });
});
