describe('URL Encode Tool', () => {
  beforeEach(() => {
    cy.visit('/url-encode');
    cy.pageIsLoaded();
  });

  it('loads the page successfully', () => {
    cy.get('nav').should('be.visible');
    cy.get('#url-input').should('be.visible');
    cy.get('#url-output').should('be.visible');
    cy.get('#url-operation').should('be.visible');
  });

  it('has encode and decode options', () => {
    cy.get('#url-operation option').should('have.length', 2);
    cy.get('#url-operation option[value="encode"]').should('exist');
    cy.get('#url-operation option[value="decode"]').should('exist');
  });

  it('encodes a URL with special characters', () => {
    cy.get('#url-input').type('hello world & foo=bar');
    cy.get('#url-operation').select('encode');
    cy.get('button').contains('URL').click();
    cy.get('#url-output').should('have.value', 'hello%20world%20%26%20foo%3Dbar');
  });

  it('decodes an encoded URL', () => {
    cy.get('#url-input').type('hello%20world%20%26%20foo%3Dbar');
    cy.get('#url-operation').select('decode');
    cy.get('button').contains('URL').click();
    cy.get('#url-output').should('have.value', 'hello world & foo=bar');
  });

  it('encodes and decodes back to original', () => {
    const original = 'https://example.com/path?q=test value&lang=pt';
    cy.get('#url-input').type(original);
    cy.get('#url-operation').select('encode');
    cy.get('button').contains('URL').click();
    cy.get('#url-output').invoke('val').then((encoded) => {
      cy.get('#url-input').clear().type(encoded);
      cy.get('#url-operation').select('decode');
      cy.get('button').contains('URL').click();
      cy.get('#url-output').should('have.value', original);
    });
  });

  it('output field is read-only', () => {
    cy.get('#url-output').should('have.attr', 'disabled');
  });
});
