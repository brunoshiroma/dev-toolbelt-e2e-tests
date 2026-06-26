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

      it('all form inputs have associated labels', () => {
        cy.get('input, select, textarea').each(($el) => {
          const id = $el.attr('id');
          if (id) {
            cy.get(`label[for="${id}"]`).should('exist');
          }
        });
      });

      it('all buttons have accessible text', () => {
        cy.get('button').each(($btn) => {
          const text = $btn.text().trim();
          const ariaLabel = $btn.attr('aria-label');
          expect(text || ariaLabel).to.not.be.empty;
        });
      });

      it('all images have alt attributes', () => {
        cy.get('img').each(($img) => {
          expect($img.attr('alt')).to.not.be.undefined;
        });
      });
    });
  });
});
