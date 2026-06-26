describe('Performance', () => {
  const pages = ['/', '/ip', '/base64', '/url-encode', '/sha', '/password'];

  pages.forEach((page) => {
    it(`loads ${page} within 5 seconds`, () => {
      const start = Date.now();
      cy.visit(page);
      cy.pageIsLoaded().then(() => {
        const elapsed = Date.now() - start;
        expect(elapsed).to.be.lessThan(5000);
      });
    });
  });

  it('homepage has no JavaScript errors', () => {
    cy.visit('/');
    cy.window().then((win) => {
      cy.stub(win.console, 'error').as('consoleError');
    });
    cy.pageIsLoaded();
    cy.get('@consoleError').should('not.have.been.called');
  });

  it('returns HTTP 200 for all tool pages', () => {
    const paths = ['/ip', '/base64', '/url-encode', '/sha', '/password'];
    paths.forEach((path) => {
      cy.request(path).its('status').should('eq', 200);
    });
  });
});
