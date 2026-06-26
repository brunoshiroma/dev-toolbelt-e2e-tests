describe('IP Tool', () => {
  beforeEach(() => {
    cy.visit('/ip');
    cy.pageIsLoaded();
  });

  it('loads the page successfully', () => {
    cy.get('nav').should('be.visible');
    cy.get('h1').should('contain.text', 'IP');
  });

  it('displays the client IP address', () => {
    cy.get('article p').invoke('text').then((text) => {
      const ipText = text.trim();
      expect(ipText).to.not.be.empty;
    });
  });

  it('displays a valid IP address (IPv4 or IPv6)', () => {
    const ipv4Pattern = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
    const ipv6Pattern = /[0-9a-fA-F:]+/;

    cy.get('article p').invoke('text').then((text) => {
      const isValid = ipv4Pattern.test(text) || ipv6Pattern.test(text);
      expect(isValid).to.be.true;
    });
  });
});
