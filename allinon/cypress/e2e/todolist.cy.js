
// https://on.cypress.io/api
/// <reference types="cypress" />

let todosMock = undefined;

before(() => {
  cy.fixture('todo')
    .then((todos) => todosMock = todos);
})

beforeEach(() => {
  cy.visit('http://localhost:4173/');
  cy.clearAllLocalStorage();
})

const addTodo = (title, description, priority) => {
  cy.get('#text-field-title').clear().type(title)
  if (description) cy.get('#textarea-description').clear().type(description)
  if (priority) cy.get('#checkbox-priority').check()
  cy.get('#button-save').click()
}

describe('ToDo List', () => {
  it('visits the app root url', () => {
    cy.contains('h2', 'TO-DO List')
  })

  it('Should require title on add to do without title.', () => {
    cy.get('#button-save').click()
    cy.get('.v-messages__message').contains('Required')
  })

  it('Should clear message required title after input the title.', () => {
    cy.get('#button-save').click()
    cy.get('.v-messages__message').contains('Required')
    cy.get('#text-field-title').type(todosMock[0].title)
    cy.get(':nth-child(1) > .v-input > .v-input__details > .v-counter').contains('10 / 50')
  })

  it('Should add to do with only title.', () => {
    addTodo(todosMock[0].title)
    cy.get('.w-100 > span').contains(todosMock[0].title)
  })

  it('Should add to do with title and description.', () => {
    addTodo(todosMock[0].title, todosMock[0].description)
    cy.get('.w-100 > span').contains(todosMock[0].title)
    cy.get('#btn-detail').click()
    cy.get('#detail').contains(todosMock[0].description)
    cy.get('#btn-close').click();
  })

  it('Should add to do with title, description and priority.', () => {
    addTodo(todosMock[0].title, todosMock[0].description, true)
    cy.get('.v-card').should('have.class', 'task-priority')
    cy.get('.w-100 > span').contains(todosMock[0].title)
    cy.get('#btn-detail').click()
    cy.get('#detail').contains(todosMock[0].description)
    cy.get('#btn-close').click();
  })

  it('Should delete the second to do.', () => {
    addTodo(todosMock[0].title)
    addTodo(todosMock[1].title)
    cy.get('.w-100 > span').contains(todosMock[0].title)
    cy.get(':nth-child(2) > .v-card-text').contains(todosMock[1].title)
    cy.get(':nth-child(2) > .v-card-text > :nth-child(2) > .px-2 > .v-btn > .v-btn__content > .mdi-delete').click()
  })

  it('Should edit the first to do.', () => {
    addTodo(todosMock[0].title, todosMock[0].description)
    addTodo(todosMock[1].title, todosMock[1].description)
    cy.get('.w-100 > span').contains(todosMock[0].title)
    cy.get(':nth-child(2) > .v-card-text').contains(todosMock[1].title)
    cy.get(':nth-child(1) > .v-card-text > :nth-child(2) > :nth-child(1) > .v-btn > .v-btn__content > .mdi-pencil').click()
    addTodo(todosMock[2].title, todosMock[2].description, true)
    cy.get(':nth-child(1) > .v-card-text > .w-100').contains(todosMock[2].title)
  })

  it('Should done the second to do.', () => {
    addTodo(todosMock[0].title, todosMock[0].description)
    addTodo(todosMock[1].title, todosMock[1].description)
    cy.get(':nth-child(1) > .v-card-text').contains(todosMock[0].title)
    cy.get(':nth-child(2) > .v-card-text').contains(todosMock[1].title)
    cy.get(':nth-child(1) > .v-card-text > :nth-child(2) > :nth-child(3) > .v-btn > .v-btn__content > .mdi-timer-alert-outline').click()
    cy.get(':nth-child(1) > .v-card-text > :nth-child(2) > :nth-child(3) > .v-btn > .v-btn__content > .mdi-check')
  })
})
