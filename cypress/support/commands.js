// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })

// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: ['optional', 'element'] }, (subject) => { ... })

// Custom command to check if page is loaded
Cypress.Commands.add('pageIsLoaded', () => {
  cy.get('body').should('be.visible');
  cy.window().then((win) => {
    expect(win.document.readyState).to.equal('complete');
  });
});

// Custom command to check for broken links
Cypress.Commands.add('checkForBrokenLinks', () => {
  cy.get('a[href]').each(($link) => {
    const href = $link.attr('href');
    if (href && !href.startsWith('javascript:') && !href.startsWith('#')) {
      cy.request({
        url: href,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.lessThan(400);
      });
    }
  });
});

// Custom command to wait for API response
Cypress.Commands.add('waitForApi', (endpoint) => {
  cy.intercept(endpoint).as('apiCall');
  cy.wait('@apiCall');
});
