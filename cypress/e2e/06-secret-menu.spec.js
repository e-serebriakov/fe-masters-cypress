/// <reference types="cypress" />

const restaurants = [
  'Chick-fil-A',
  'McDonalds',
  'In-N-Out',
  'KFC',
  'Jack In The Box',
  'Jamba Juice',
  'Starbucks',
  'Dairy Queen',
  'Burger King',
  'Chipotle',
  'Taco Bell',
  'Five Guys',
  'Sonic',
  'Subway',
  'Panera Bread',
];

const properties = [
  'name',
  'whereToOrder',
  'description',
  'secret',
  'ingredients',
  'popularity',
  'price',
  'howToOrder',
];

const ratings = [1, 2, 3, 4, 5, 6, 7];

describe('Secret Menu Items', () => {
  beforeEach(() => {
    cy.visit('/secret-menu');
  });

  it('should exist have the title on the page', () => {
    cy.get('h1').should('contain', 'Secret Menu Items');
  });

  properties.forEach((property) => {
    it(`should have a column for ${property} property`, () => {
      cy.get(`#${property}-column`).should('exist');
    });

    it(`should hide the ${property} column if unchecked`, () => {
      cy.get(`#${property}-column`).should('exist');
      cy.get(`#show-${property}`).uncheck();
      cy.get(`#${property}-column`).should('be.hidden');
    });
  });

  ratings.forEach((rating) => {
    it(`should show items with rating equal or greater than ${rating}`, () => {
      cy.get('#minimum-rating-visibility').invoke('val', rating).trigger('input');

      cy.get('td[headers="popularity-column"]').each(($el) => {
        cy.wrap($el).invoke('text').then(parseInt).should('be.a', 'number').and('gte', rating - 1);
      });
    });
  });
});
