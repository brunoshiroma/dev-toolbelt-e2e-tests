describe('Password Generator Tool', () => {
  beforeEach(() => {
    cy.visit('/password');
    cy.pageIsLoaded();
  });

  it('loads the page successfully', () => {
    cy.get('nav').should('be.visible');
    cy.get('#password-output').should('be.visible');
    cy.get('#password-size').should('be.visible');
    cy.get('button').contains('Generate').should('be.visible');
  });

  it('has all character set checkboxes', () => {
    cy.get('#cb-upper').should('be.checked');
    cy.get('#cb-lower').should('be.checked');
    cy.get('#cb-number').should('be.checked');
    cy.get('#cb-special-common').should('be.checked');
    cy.get('#cb-special-uncommon').should('be.checked');
  });

  it('defaults password size to 32', () => {
    cy.get('#password-size').should('have.value', '32');
  });

  it('generates a password with default settings', () => {
    cy.get('button').contains('Generate').click();
    cy.get('#password-output').invoke('val').should('have.length', 32);
  });

  it('generates password with custom length', () => {
    cy.get('#password-size').clear().type('16');
    cy.get('button').contains('Generate').click();
    cy.get('#password-output').invoke('val').should('have.length', 16);
  });

  it('generates different passwords on consecutive clicks', () => {
    cy.get('button').contains('Generate').click();
    cy.get('#password-output').invoke('val').then((firstPassword) => {
      cy.get('button').contains('Generate').click();
      cy.get('#password-output').invoke('val').should('not.equal', firstPassword);
    });
  });

  it('generates password with only uppercase when only upper is checked', () => {
    cy.get('#cb-lower').uncheck();
    cy.get('#cb-number').uncheck();
    cy.get('#cb-special-common').uncheck();
    cy.get('#cb-special-uncommon').uncheck();
    cy.get('button').contains('Generate').click();
    cy.get('#password-output').invoke('val').should('match', /^[A-Z]+$/);
  });

  it('generates password with only digits when only number is checked', () => {
    cy.get('#cb-upper').uncheck();
    cy.get('#cb-lower').uncheck();
    cy.get('#cb-special-common').uncheck();
    cy.get('#cb-special-uncommon').uncheck();
    cy.get('button').contains('Generate').click();
    cy.get('#password-output').invoke('val').should('match', /^\d+$/);
  });

  it('output field is read-only', () => {
    cy.get('#password-output').should('have.attr', 'disabled');
  });

  it('displays privacy note', () => {
    cy.get('article p').should('contain.text', 'browser');
  });
});
