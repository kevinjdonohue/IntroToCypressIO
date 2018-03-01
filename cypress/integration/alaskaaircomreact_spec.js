Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe('AlaskaAirComReact End to End Tests', () => {
  it('should open the home page', () => {
    cy.visit('/');

    // TODO:  What about different ORIGINs or DESTINATIONs?

    cy.get('.call-to-action').click();

    cy
      .fixture('cities')
      .as('citiesJson')
      .then(cities => {
        cy.get('input').type(cities.destinations[1].airportCode);
        cy
          .get('button')
          .contains(cities.destinations[1].buttonName)
          .click();
      });

    cy
      .get('.date-picker-header')
      .find('select')
      .select('April 2018');

    cy
      .get('.enabled-day')
      .contains('15')
      .click();

    // TODO: Even better, how do we make this 'smart' -- so that it will try different dates if it doesn't find inventory?

    // TODO: need to figure out how to search more narrowly/specifically
    cy.get('.flight-container:first').within(() => {
      cy.get('button').click();
    });

    cy
      .get('button')
      .contains('Main Cabin')
      .click();

    cy.get('.cabin:not(.cabin--first)').within(() => {
      cy.get('.seat:first:not(.seat--unavailable)').click();
    });

    cy
      .get('.confirm-button')
      .contains('Choose Seat')
      .click();

    cy
      .get('.confirm-button')
      .contains('Continue')
      .click();

    cy
      .fixture('guest')
      .as('guestJson')
      .then(guest => {
        cy.get('#firstName').type(guest.firstName);
        cy.get('input[name=middleName]').type(guest.middleName);
        cy.get('input[name=lastName]').type(guest.lastName);
        cy.get('input[name=gender]').type(guest.gender);
        cy.get('input[name=dateOfBirth]').type(guest.dateOfBirth);
        cy.get('input[name=phoneNumber]').type(guest.phoneNumber);
        cy.get('input[name=emailAddress]').type(guest.emailAddress);
      });

    cy
      .get('.confirm-button')
      .contains('Continue to Payment')
      .click();

    cy
      .fixture('creditCard')
      .as('creditCardJson')
      .then(cc => {
        cy.get('input[name=nameOnCard]').type(cc.nameOnCard);
        cy.get('input[name=cardNumber]').type(cc.cardNumber);
        cy.get('input[name=expirationDate]').type(cc.expirationDate);
        cy.get('input[name=billingAddress]').type(cc.billingAddress);
        cy.get('input[name=city]').type(cc.city);
        cy.get('input[name=state]').type(cc.state);
        cy.get('input[name=zipCode]').type(cc.zipCode);
      });

    // cy
    // .get('.confirm-button')
    // .contains('Book Flight')
    // .click();

    /*
    // cy.url().should('include', '/confirmation');
    // cy.get('.confirmation-code');
    // cy.get('.confirmation-code').contains('Your confirmation code is');
    */
  });
});
