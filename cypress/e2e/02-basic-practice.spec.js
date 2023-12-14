/// <reference types="cypress" />

describe('Basic Practice', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
  });

  describe('Adding a new item', () => {
    it('should put a new item on the page after clicking on "Add Item"', () => {
      cy.get('[data-test="new-item-input"]').type('New Item');
      cy.get('[data-test="add-item"]').click();
      cy.get('[data-test="items"]').should('contain', 'New Item');
    });

    it('should put a new item in the "Unpacked Items" list', () => {
      cy.get('[data-test="new-item-input"]').type('New Item');
      cy.get('[data-test="add-item"]').click();
      cy.get('[data-test="items-unpacked"]').should('contain', 'New Item');
    });

    it('should put a new item as the last item in the "Unpacked Items" list', () => {
      cy.get('[data-test="new-item-input"]').type('New Item');
      cy.get('[data-test="add-item"]').click();
      cy.get('[data-test="items-unpacked"]').last('li').should(
        'contain',
        'New Item'
      );
    });
  });

  describe('Filtering items', () => {
    it('should show items that match whatever is in the filter field', () => {
      cy.get('[data-test="filter-items"]').type('Tooth');

      cy.get('[data-test="items"]').find('li').each(($el) => {
        expect($el.text()).to.include('Tooth');
      });
    });

    it('should hide items that do not match whatever is in the filter field', () => {
      cy.get('[data-test="filter-items"]').type('Tooth');

      cy.get('[data-test="items"]').find('li').should('have.length', 2);
      cy.get('[data-test="items"]').contains('Hoodie').should('not.exist');
    });
  });

  describe('Removing items', () => {
    describe('Remove all', () => {
      it('should remove all of the items', () => {
        cy.get('[data-test="items"]').find('li').should('have.length.greaterThan', 0);
        cy.get('[data-test="remove-all"]').click();
        cy.get('[data-test="items"]').find('li').should('have.length', 0);
        cy.get('[data-test="items-packed"]').contains('No items to show.').should('exist');
        cy.get('[data-test="items-unpacked"]').contains('No items to show.').should('exist');
      });
    });

    describe('Remove individual items', () => {
      it('should have a remove button on an item', () => {
        cy.get('[data-test="items"]').find('li').each(($el) => {
          cy.wrap($el).find('[data-test="remove"]').should('exist');
        })
      });

      it('should remove an item from the page', () => {
        cy.get('[data-test="items"]').contains('Tooth Brush').parent().find('[data-test="remove"]').click();
        cy.get('[data-test="items"]').contains('Tooth Brush').should('not.exist');
      });
    });
  });

  describe('Mark all as unpacked', () => {
    it('should empty out the "Packed" list', () => {
      cy.get('[data-test="items-packed"]').find('li').should('have.length.greaterThan', 0);
      cy.get('[data-test="mark-all-as-unpacked"]').click();
      cy.get('[data-test="items-packed"]').find('li').should('have.length', 0);
      cy.get('[data-test="items-packed"]').contains('No items to show.').should('exist');
    });

    it('should empty have all of the items in the "Unpacked" list', () => {
      cy.get('[data-test="items-packed"]').find('li').should('have.length.greaterThan', 0);
      cy.get('[data-test="mark-all-as-unpacked"]').click();
      cy.get('[data-test="items-packed"]').find('li').should('have.length', 0);
    });
  });

  describe('Mark individual item as packed', () => {
    it('should move an individual item from "Unpacked" to "Packed"', () => {
      cy.get('[data-test="items-unpacked"]')
        .find('li')
        .first()
        .within(() => {
          cy.get('input[type="checkbox"]').click();
        })
        .then(($item) => {
          const text = $item.find('label').text();
          cy.get('[data-test="items-packed"] li label').first().should('have.text', text);
        });
    });
  });
});
