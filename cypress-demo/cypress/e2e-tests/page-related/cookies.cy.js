import { CookiesPage } from '../../page-object-model/index.js';

describe('Cookies with Page Objects', () => {
  let cookiesPage = new CookiesPage();

  beforeEach(() => {
    cookiesPage = new CookiesPage();
    cookiesPage.visitCookiesPage();
  });

  it('cy.getCookie() - get a browser cookie', () => {
    // https://on.cypress.io/getcookie
    cookiesPage.clickGetCookieSetButton()
      .getCookie('token').should('have.property', 'value', '123ABC');
  });

  it('cy.getCookies() - get browser cookies for the current domain', () => {
    // https://on.cypress.io/getcookies
    cookiesPage.getCookies()
      .should('be.empty');
    cookiesPage.clickGetCookiesSetButton();
    cookiesPage.shouldHaveCookieProperties('token', {
        name: 'token',
        value: '123ABC',
        httpOnly: false,
        secure: false
      });
  });

  it('cy.getAllCookies() - get all browser cookies', () => {
    // https://on.cypress.io/getallcookies
    cookiesPage.getAllCookies()
      .should('be.empty')
      .setCookie('key', 'value')
      .setCookie('key', 'value', { domain: '.example.com' });
    cookiesPage.shouldHaveMultipleCookieProperties([
        {
          name: 'key',
          value: 'value',
          httpOnly: false,
          secure: false
        },
        {
          name: 'key',
          value: 'value',
          httpOnly: false,
          secure: false,
          domain: '.example.com'
        }
      ]);;
  });

  it('cy.setCookie() - set a browser cookie', () => {
    // https://on.cypress.io/setcookie
    cookiesPage.getCookies().should('be.empty');
    cookiesPage.setCookie('foo', 'bar')
      .getCookie('foo')
      .should('have.property', 'value', 'bar');
  });

  it('cy.clearCookie() - clear a browser cookie', () => {
    // https://on.cypress.io/clearcookie
    cookiesPage.getCookie('token')
      .should('be.null')
    cookiesPage.clickClearCookieSetButton()
      .getCookie('token')
      .should('have.property', 'value', '123ABC')
      .clearCookie('token')
      .getCookie('token')
      .should('be.null');
  });

  it('cy.clearCookies() - clear browser cookies for the current domain', () => {
    // https://on.cypress.io/clearcookies
    cookiesPage.getCookies().should('be.empty');
    cookiesPage.clickClearCookiesSetButton()
      .getCookies()
      .should('have.length', 1)
      .clearCookies()
      .getCookies()
      .should('be.empty');
  });

  it('cy.clearAllCookies() - clear all browser cookies', () => {
    // https://on.cypress.io/clearallcookies
    cookiesPage.getAllCookies()
      .should('be.empty')
      .setCookie('key', 'value')
      .setCookie('key', 'value', { domain: '.example.com' })
      .getAllCookies().should('have.length', 2)
      .clearAllCookies()
      .getAllCookies().should('be.empty');
  });
});