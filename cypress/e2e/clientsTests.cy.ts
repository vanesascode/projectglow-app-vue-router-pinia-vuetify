describe('projects tests', () => {
  beforeEach(() => {
    cy.visit('https://projects-management-nine.vercel.app/#/clients');
  });

  it('Warning about backend only appears once and not again after refreshing', function () {
    cy.get('.v-card-text > .text-red').should('have.text', 'Por favor sea paciente.');
    cy.get('.v-card-actions > :nth-child(2) > .v-btn').click();
    cy.get('.v-card-text > .text-red').should('not.exist');
  });

  // FOR THE FOLLOWING TESTS TO PASS, THERE SHOULD BE EXACTLY 3 CLIENTS ALREADY CREATED

  it('should delete a client', function () {
    cy.get('.v-card-actions > :nth-child(2) > .v-btn > .v-btn__content').click();
    cy.get('.mdi-plus').click();
    cy.get('#nameInput').clear();
    cy.get('#nameInput').type('abcde');
    cy.get('#DescriptionInput').clear();
    cy.get('#DescriptionInput').type('fghijk{enter}');
    cy.get('[type="submit"]').click();
    cy.get('.v-main').should('contain', 'abcde');
    cy.get('.v-main').should('contain', 'fghijk');
    cy.get(
      ':nth-child(4) > :nth-child(6) > .d-flex > .icon > .v-btn__content > .mdi-delete-outline',
    ).click();
    cy.get('tbody > :nth-child(4) > :nth-child(2)').should('not.exist');
    cy.get('.v-main').should('not.contain', 'abcde');
    cy.get('.v-main').should('not.contain', 'fghijk');
  });

  it('should create a client', function () {
    cy.get('.v-card-actions > :nth-child(2) > .v-btn > .v-btn__content').click();
    cy.get('.mdi-plus').click();
    cy.get('#nameInput').clear();
    cy.get('#nameInput').type('New client{enter}');
    cy.get('[type="submit"]').click();
    cy.get('.v-main').should('contain', 'New client');
  });

  it('should edit a client', function () {
    cy.get('.v-card-actions > :nth-child(2) > .v-btn > .v-btn__content').click();
    cy.get(
      ':nth-child(5) > :nth-child(6) > .d-flex > :nth-child(1) > .v-fab > .v-fab__container > .v-btn > .v-btn__content > .mdi-pencil-outline',
    ).click();
    cy.get('#nameInput').clear();
    cy.get('#nameInput').type('New client modified{enter}');
    cy.get('tbody > :nth-child(5) > :nth-child(2)').should('contain', 'New client modified');
  });
});
