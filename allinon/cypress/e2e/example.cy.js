
// https://on.cypress.io/api

beforeEach(() => {
  cy.visit('http://localhost:4173/');
  cy.clearAllLocalStorage();
})

const addTodo = (title, description, priority) => {
  cy.get('#text-field-title').type(title)
  if (description) cy.get('#textarea-description').type(description)
  if (priority) cy.get('#checkbox-priority').check()
  cy.get('#button-save').click()
  cy.get('.w-100 > span').contains(title)
}

describe('My First Test', () => {
  it('visits the app root url', () => {
    cy.contains('h1', 'TO-DO List')
  })

  it('Should require title on add to do', () => {
    cy.get('#button-save').click()
    cy.get('.v-messages__message').contains('Required')
  })

  it('Should clear message required title', () => {
    cy.get('#button-save').click()
    cy.get('.v-messages__message').contains('Required')
    cy.get('#text-field-title').type('teste')
    cy.get(':nth-child(1) > .v-input > .v-input__details > .v-counter').contains('5 / 50')
  })

  it('Should add to do with only title', () => {
    addTodo('Study VUE3')
  })

  it('Should add to do with title and description', () => {
    addTodo('Study VUETIFY3', "We'll need soon")
    cy.get('#btn-detail').click()
    cy.get('#detail').contains("We'll need soon")
    cy.get('#btn-close').click();
  })

  it('Should add to do with title, description and priority', () => {
    // cy.get('#title').type('Study VUETIFY3')
    // cy.get('#description').type("We'll need soon")
    // cy.get('#priority').check();
    // cy.get('#toggle-save').click()
    // cy.get('.w-100 > span').contains('Study VUETIFY3')
    addTodo('Study english', 'As soon as possible', true)
  })
})
