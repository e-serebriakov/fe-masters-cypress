/// <reference types="cypress" />

describe('Sign Up', () => {
  beforeEach(() => {
    cy.visit('/echo-chamber/sign-up');
    cy.get('[data-test="sign-up-submit"]').as('submitButton');
  });

  it('should require an email', () => {
    cy.get('@submitButton').click();

    cy.get('[data-test="sign-up-email"]:invalid')
    .invoke('prop', 'validity')
    .its('valueMissing')
    .should('be.true');
  });

  it('should require that the email actually be an email address', () => {
    cy.get('[data-test="sign-up-email"]').type('notanemail');

    cy.get('@submitButton').click();

    cy.get('[data-test="sign-up-email"]:invalid')
    .invoke('prop', 'validity')
    .its('typeMismatch')
    .should('be.true');
  });

  it('should require a password when the email is present', () => {
    cy.get('[data-test="sign-up-email"]').type('a@a.com');
    cy.get('@submitButton').click();

    cy.get('[data-test="sign-up-password"]:invalid')
    .invoke('prop', 'validity')
    .its('valueMissing')
    .should('be.true');
  });
});
