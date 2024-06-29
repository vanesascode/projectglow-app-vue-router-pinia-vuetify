// https://on.cypress.io/api

describe('projects tests', () => {
  it('create a project clicking on the save button', () => {
    cy.visit('/');
    cy.get('.mdi-plus').click();
    cy.get('#input-8').clear();
    cy.get('#input-8').type('New Project');
    cy.get('[type="submit"] > .v-btn__content').click();
  });

  it('enter a project page', () => {
    cy.visit('/');
    cy.get('tbody > :nth-child(1) > :nth-child(2)').click();
  });

  it('create a project pressing the intro key', () => {
    cy.visit('/');
    cy.get('.mdi-plus').click();
    cy.get('#input-8').clear();
    cy.get('#input-8').type('New Project{enter}');
  });

  it('go back to projects after entering a project page', () => {
    cy.visit('/');
    cy.get('tbody > :nth-child(1) > :nth-child(2)').click();
    cy.get('.v-breadcrumbs-item--link').click();
  });
});
