
// https://on.cypress.io/api
before( () => {
  cy.visit('http://localhost:5173/')
})

describe('Todo List Tests', () => {

  it('visits the app root url', () => {
    
    cy.contains('h1', 'TO-DO List')
  })

  it('Should required a title when try add a todo', () => {
    
  })
})