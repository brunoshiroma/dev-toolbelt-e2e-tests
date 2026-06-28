describe('Accessibility', () => {
  const pages = ['/', '/ip', '/base64', '/url-encode', '/sha', '/password'];

  pages.forEach((page) => {
    describe(`Page: ${page}`, () => {
      beforeEach(() => {
        cy.visit(page);
        cy.pageIsLoaded();
      });

      it('has a visible navigation landmark', () => {
        cy.get('nav').should('be.visible');
      });

      it('has a main content landmark', () => {
        cy.get('main').should('exist');
      });

      it('has at least one heading', () => {
        cy.get('h1, h2, h3').should('exist');
      });
      
    });
  });
});
