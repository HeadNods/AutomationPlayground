import { CookiesPage } from '../../page-object-model/index';

describe('Cookies with Page Objects', () => {
  let cookiesPage: CookiesPage;

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
    cookiesPage
      .getCookies()
      .should('be.empty');

    const expectedProperties: Record<string, any> = {
      name: 'token',
      value: '123ABC',
      httpOnly: false,
      secure: false
    }
    cookiesPage
      .clickGetCookiesSetButton()
      .getCookies()
      .should('have.length', 1)
      .should((cookies) => {
        const cookie = cookies[0];
        Object.keys(expectedProperties).forEach(key => {
          expect(cookie).to.have.property(key, expectedProperties[key]);
        });
        // Default properties that should always exist
        expect(cookie).to.have.property('domain');
        expect(cookie).to.have.property('path');
      });
  });

  it('cy.getAllCookies() - get all browser cookies', () => {
    // https://on.cypress.io/getallcookies
    cookiesPage.getAllCookies()
      .should('be.empty')
      .setCookie('key', 'value')
      .setCookie('key', 'value', { domain: '.example.com' });

    const expectedCookies: Record<string, any>[] = [
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
    ]
    cookiesPage.getAllCookies().should('have.length', expectedCookies.length).should((cookies) => {
      expectedCookies.forEach((expectedCookie, index) => {
        Object.keys(expectedCookie).forEach(key => {
          expect(cookies[index]).to.have.property(key, expectedCookie[key]);
        });
        expect(cookies[index]).to.have.property('domain');
        expect(cookies[index]).to.have.property('path');
      });
    });
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