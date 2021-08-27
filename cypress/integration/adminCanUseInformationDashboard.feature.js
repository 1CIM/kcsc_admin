/* eslint-disable no-undef */
import sizes from '../support/index'
import TestHelpers from '../support/testhelper'

describe('Admin Can Use information Dashboard', () => {
  sizes.forEach((size) => {
    describe(`admin can navigate to information dashboard on ${size}`, () => {
      beforeEach(() => {
        cy.intercept('GET', '**/api/information', {
          fixture: 'information_items.json',
        })
        TestHelpers.sizeParameters(size)
        cy.visit('/')
        TestHelpers.authenticate()
        cy.visit('/information')
      })
      it('is expected to show a table with list of all information snippets', () => {
        cy.get('[data-cy=information-table]').within(() => {
          cy.get('[data-cy=information]')
            .should('have.length', 10)
            .first()
            .within(() => {
              cy.get('[data-cy=status]').should('contain.text', 'published')
              cy.get('[data-cy=pinned]').should('contain.text', 'pinned')
              cy.get('[data-cy=header]').should('contain.text', 'Item-0')
              cy.get('[data-cy=description]').should(
                'contain.text',
                'Often just simple changes'
              )
              cy.get('[data-cy=action]').should('contain.text', 'Placeholder')
            })
        })
      })
    })
  })
})
