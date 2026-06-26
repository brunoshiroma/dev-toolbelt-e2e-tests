describe('Base64 Tool', () => {
  beforeEach(() => {
    cy.visit('/base64');
    cy.pageIsLoaded();
  });

  it('loads the page successfully', () => {
    cy.get('nav').should('be.visible');
    cy.get('#base64-input').should('be.visible');
    cy.get('#base64-output').should('be.visible');
    cy.get('#base64-operation').should('be.visible');
  });

  it('has encode and decode options', () => {
    cy.get('#base64-operation option').should('have.length', 2);
    cy.get('#base64-operation option[value="encode"]').should('exist');
    cy.get('#base64-operation option[value="decode"]').should('exist');
  });

  it('encodes text to base64', () => {
    cy.get('#base64-input').type('hello world');
    cy.get('#base64-operation').select('encode');
    cy.get('button').contains('Base64').click();
    cy.get('#base64-output').should('have.value', 'aGVsbG8gd29ybGQ=');
  });

  it('decodes base64 to text', () => {
    cy.get('#base64-input').type('aGVsbG8gd29ybGQ=');
    cy.get('#base64-operation').select('decode');
    cy.get('button').contains('Base64').click();
    cy.get('#base64-output').should('have.value', 'hello world');
  });

  it('encodes and decodes back to original', () => {
    const originalText = 'Cypress E2E test string 123!';
    cy.get('#base64-input').type(originalText);
    cy.get('#base64-operation').select('encode');
    cy.get('button').contains('Base64').click();
    cy.get('#base64-output').invoke('val').then((encoded) => {
      cy.get('#base64-input').clear().type(encoded);
      cy.get('#base64-operation').select('decode');
      cy.get('button').contains('Base64').click();
      cy.get('#base64-output').should('have.value', originalText);
    });
  });

  it('output field is read-only', () => {
    cy.get('#base64-output').should('have.attr', 'disabled');
  });
});
