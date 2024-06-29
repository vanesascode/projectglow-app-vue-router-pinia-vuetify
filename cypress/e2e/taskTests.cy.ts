// https://on.cypress.io/api

describe('tasks tests', () => {
  it('create a task clicking on the save button', () => {
    cy.visit('https://projects-management-nine.vercel.app');
    cy.get('tbody > :nth-child(1) > :nth-child(2)').click();
    cy.get('.mdi-plus').click();
    cy.get('#input').clear();
    cy.get('#input').type('New Task');
    cy.get('[type="submit"] > .v-btn__content').click();
  });

  it('create a task pressing the intro key', () => {
    cy.visit('https://projects-management-nine.vercel.app');
    cy.get('tbody > :nth-child(1) > :nth-child(2)').click();
    cy.get('.mdi-plus').click();
    cy.get('#input').clear();
    cy.get('#input').type('New task{enter}');
  });

  it('click on the checkbox to mark it as completed', () => {
    cy.visit('https://projects-management-nine.vercel.app');
    cy.get('tbody > :nth-child(1) > :nth-child(2)').click();
    cy.get(':nth-child(1) > :nth-child(1) > .checkbox').check();
  });
});
