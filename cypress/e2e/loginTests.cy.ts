describe('projects tests', () => {
  beforeEach(() => {
    cy.visit('https://projects-management-nine.vercel.app');
  });

  it('name is saved in localStorage by pressing enter', function () {
    cy.get('#input-0').clear();
    cy.get('#input-0').type('Vanesa{enter}');
    cy.window().then((win) => {
      const userInLocalStorage = win.localStorage.getItem('user');
      expect(userInLocalStorage).to.equal('Vanesa');
    });
  });

  it('name is saved in localStorage by clicking on the Log In button', function () {
    cy.get('#input-0').clear();
    cy.get('#input-0').type('Vanesa');
    cy.get('.login-button').click();
    cy.window().then((win) => {
      const userInLocalStorage = win.localStorage.getItem('user');
      expect(userInLocalStorage).to.equal('Vanesa');
    });
  });

  it('language is changed to English correctly', function () {
    cy.get('.justify-end > :nth-child(2)').click();
    cy.get('.elevation-8 > :nth-child(3)').should('have.text', 'Name');
    cy.get('.login-button').should('have.text', 'Log In');
  });

  it('language is changed to Spanish correctly', function () {
    cy.get('.justify-end > :nth-child(1)').click();
    cy.get('.elevation-8 > :nth-child(3)').should('have.text', 'Nombre');
    cy.get('.login-button').should('have.text', 'Accede');
  });
});
