describe('SHA Hashing Tool', () => {
  beforeEach(() => {
    cy.visit('/sha');
    cy.pageIsLoaded();
  });

  it('loads the page successfully', () => {
    cy.get('nav').should('be.visible');
    cy.get('#sha-data').should('be.visible');
    cy.get('#sha-hash').should('be.visible');
    cy.get('#sha-alg').should('be.visible');
  });

  it('has all SHA algorithm options', () => {
    const algorithms = ['SHA-1', 'SHA-256', 'SHA-386', 'SHA-512'];
    algorithms.forEach((alg) => {
      cy.get('#sha-alg option').contains(alg).should('exist');
    });
  });

  it('defaults to SHA-512 algorithm', () => {
    cy.get('#sha-alg').should('have.value', 'SHA-512');
  });

  it('generates a SHA-256 hash', () => {
    cy.get('#sha-data').type('hello');
    cy.get('#sha-alg').select('SHA-256');
    cy.get('button').contains('Hash').click();
    cy.get('#sha-hash').should(
      'have.value',
      '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824'
    );
  });

  it('generates a SHA-1 hash', () => {
    cy.get('#sha-data').type('hello');
    cy.get('#sha-alg').select('SHA-1');
    cy.get('button').contains('Hash').click();
    cy.get('#sha-hash').should('have.value', 'aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d');
  });

  it('generates a SHA-512 hash', () => {
    cy.get('#sha-data').type('hello');
    cy.get('#sha-alg').select('SHA-512');
    cy.get('button').contains('Hash').click();
    cy.get('#sha-hash').invoke('val').should('have.length', 128);
  });

  it('produces different hashes for different algorithms on the same input', () => {
    const text = 'test input';
    const hashes = {};

    ['SHA-1', 'SHA-256', 'SHA-512'].forEach((alg) => {
      cy.get('#sha-data').clear().type(text);
      cy.get('#sha-alg').select(alg);
      cy.get('button').contains('Hash').click();
      cy.get('#sha-hash').invoke('val').then((hash) => {
        hashes[alg] = hash;
      });
    });

    cy.then(() => {
      expect(hashes['SHA-1']).to.not.equal(hashes['SHA-256']);
      expect(hashes['SHA-256']).to.not.equal(hashes['SHA-512']);
    });
  });

  it('output field is read-only', () => {
    cy.get('#sha-hash').should('have.attr', 'disabled');
  });
});
