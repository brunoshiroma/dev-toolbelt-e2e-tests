describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.pageIsLoaded();
  });

  it('loads successfully', () => {
    cy.title().should('not.be.empty');
  });

  it('displays the page heading', () => {
    cy.get('h1').should('contain.text', 'Devtoolbelt');
  });

  it('displays the tagline', () => {
    cy.get('p').should('contain.text', 'developer');
  });

  it('shows the navigation bar', () => {
    cy.get('nav').should('be.visible');
    cy.get('nav .navbar-brand').should('contain.text', 'DevToolbelt');
  });

  it('has links to all tools in the navbar', () => {
    const tools = ['IP', 'Base64', 'URL Encode', 'SHA', 'Password'];
    tools.forEach((tool) => {
      cy.get('nav').contains(tool).should('be.visible');
    });
  });

  it('navigates to each tool page from navbar', () => {
    const links = [
      { text: 'IP', path: '/ip' },
      { text: 'Base64', path: '/base64' },
      { text: 'URL Encode', path: '/url-encode' },
      { text: 'SHA', path: '/sha' },
      { text: 'Password', path: '/password' },
    ];

    links.forEach(({ text, path }) => {
      cy.visit('/');
      cy.get('nav').contains(text).click();
      cy.url().should('include', path);
      cy.pageIsLoaded();
      cy.get('nav').should('be.visible');
    });
  });

  it('brand logo navigates back to homepage', () => {
    cy.visit('/base64');
    cy.get('nav .navbar-brand').click();
    cy.url().should('match', /\/$|\/$/);
    cy.get('h1').should('contain.text', 'Devtoolbelt');
  });
});
