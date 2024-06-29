// https://on.cypress.io/api

describe('tasks tests', () => {
  it('create a task clicking on the save button', () => {
    cy.visit('/');
    cy.get('tbody > :nth-child(1) > :nth-child(2)').click();
    cy.get('.mdi-plus').click();
    cy.get('#input-9').clear();
    cy.get('#input-9').type('New Task');
    cy.get('[type="submit"] > .v-btn__content').click();
  });

  it('create a task pressing the intro key', () => {
    cy.visit('/');
    cy.get('tbody > :nth-child(1) > :nth-child(2)').click();
    cy.get('.mdi-plus').click();
    cy.get('#input-9').clear();
    cy.get('#input-9').type('New task{enter}');
  });

  it('click on the checkbox to mark it as completed', () => {
    cy.visit('/');
    cy.get('tbody > :nth-child(1) > :nth-child(2)').click();
    cy.get(':nth-child(1) > :nth-child(1) > .checkbox').check();
  });
});
