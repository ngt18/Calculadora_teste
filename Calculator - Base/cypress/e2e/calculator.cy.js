/// <reference types="cypress" />

const display = () => cy.get('[data-testid="display"]')

const press = (...names) => {
  names.forEach((name) => {
    if (name === 'AC') return cy.get('#AC').click()
    if (name === '+') return cy.get('#plus').click()
    if (name === '=') return cy.get('#equal').click()
    cy.get('button')
      .filter((_, el) => el.textContent.trim() === name)
      .first()
      .click()
  })
}

describe('Calculadora - e2e (espelho de utils.test.ts)', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('[data-testid="display"]').should('exist')
  })

  describe('calculate', () => {
    it('+ 2 + 3 = 5', () => {
      press('2', '+', '3', '=')
      display().should('have.text', '5')
    })

    it('- 9 - 4 = 5', () => {
      press('9', '-', '4', '=')
      display().should('have.text', '5')
    })

    it('x 6 x 7 = 42', () => {
      press('6', 'x', '7', '=')
      display().should('have.text', '42')
    })

    it('/ 8 / 2 = 4', () => {
      press('8', '/', '2', '=')
      display().should('have.text', '4')
    })

    it('= retorna o segundo operando', () => {
      press('4', '=')
      display().should('have.text', '4')
    })

    it('AC reseta o display para 0', () => {
      press('9', '9', 'AC')
      display().should('have.text', '0')
    })
  })

  describe('OPERATIONS', () => {
    it('+ 5 + 7 = 12', () => {
      press('5', '+', '7', '=')
      display().should('have.text', '12')
    })

    it('- 10 - 3 = 7', () => {
      press('1', '0', '-', '3', '=')
      display().should('have.text', '7')
    })

    it('x 6 x 4 = 24', () => {
      press('6', 'x', '4', '=')
      display().should('have.text', '24')
    })

    it('/ 20 / 5 = 4', () => {
      press('2', '0', '/', '5', '=')
      display().should('have.text', '4')
    })

    it('/ por zero exibe mensagem de erro', () => {
      press('8', '/', '0', '=')
      display().should('have.text', 'Não é possível dividir por zero')
    })

    it('= retorna o segundo operando', () => {
      press('4', '2', '=')
      display().should('have.text', '42')
    })

    it('AC retorna 0', () => {
      press('9', '9', 'AC')
      display().should('have.text', '0')
    })
  })

  describe('isNumber (entrada de numeros)', () => {
    it('"0" e aceito', () => {
      press('0')
      display().should('have.text', '0')
    })

    it('"25" e aceito', () => {
      press('2', '5')
      display().should('have.text', '25')
    })

    it('"3.14" e aceito', () => {
      press('3', '.', '1', '4')
      display().should('have.text', '3.14')
    })

    it('"." sozinho nao forma numero valido (isNumber(".")===false)', () => {
      press('.')
      display().should('have.text', '.')
    })
  })

  describe('isDot', () => {
    it('pressionar . mostra "."', () => {
      press('.')
      display().should('have.text', '.')
    })

    it('pressionar 7 nao mostra ponto', () => {
      press('7')
      display().should('have.text', '7')
    })
  })

  describe('removeZeroLeft (entrada de digitos)', () => {
    it('mantem "0" quando e o unico caractere', () => {
      press('0')
      display().should('have.text', '0')
    })

    it('remove zero a esquerda: 05 -> 5', () => {
      press('0', '5')
      display().should('have.text', '5')
    })

    it('mantem "15" quando nao ha zero a esquerda', () => {
      press('1', '5')
      display().should('have.text', '15')
    })
  })
})
