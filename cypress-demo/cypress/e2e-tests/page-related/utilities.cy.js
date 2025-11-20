import { UtilitiesPage } from '../../page-object-model/index.js';

describe('Utilities with Page Objects', () => {
  let utilitiesPage = new UtilitiesPage();

  beforeEach(() => {
    utilitiesPage = new UtilitiesPage();
    utilitiesPage.visitUtilitiesPage();
  });

  it('Cypress._ - call a lodash method', () => {
    // https://on.cypress.io/_
    utilitiesPage.requestUsers().then((response) => {
      let ids = utilitiesPage.extractUserIds(response.body);
      expect(ids).to.deep.eq([1, 2, 3]);
    });
  });

  it('Cypress.$ - call a jQuery method', () => {
    // https://on.cypress.io/$
    let $li = utilitiesPage.getJqueryElement();
    
    cy.wrap($li).should('not.have.class', 'active');
    utilitiesPage.clickJqueryElement();
    cy.wrap($li).should('have.class', 'active');
  });

  it('Cypress.Blob - blob utilities and base64 string conversion', () => {
    // https://on.cypress.io/blob
    utilitiesPage.getBlobDiv().then(async ($div) => {
      await utilitiesPage.convertImageToDataUrl('https://example.cypress.io/assets/img/javascript-logo.png')
        .then((dataUrl) => {
          let img = utilitiesPage.createImageElement(dataUrl);
          utilitiesPage.appendImageToDiv($div, img);
          
          utilitiesPage.clickBlobImage();
          utilitiesPage.getBlobImageElement().should('have.attr', 'src', dataUrl);
        });
    });
  });

  it('Cypress.minimatch - test out glob patterns against strings', () => {
    // https://on.cypress.io/minimatch
    
    // Test basic wildcard matching
    let matching = utilitiesPage.matchPath('/users/1/comments', '/users/*/comments', { matchBase: true });
    expect(matching, 'matching wildcard').to.be.true;

    // Test non-matching pattern
    matching = utilitiesPage.matchPath('/users/1/comments/2', '/users/*/comments', { matchBase: true });
    expect(matching, 'comments').to.be.false;

    // Test ** pattern (matches all downstream segments)
    matching = utilitiesPage.matchPath('/foo/bar/baz/123/quux?a=b&c=2', '/foo/**', { matchBase: true });
    expect(matching, 'comments').to.be.true;

    // Test * pattern (matches only next segment)
    matching = utilitiesPage.matchPath('/foo/bar/baz/123/quux?a=b&c=2', '/foo/*', { matchBase: false });
    expect(matching, 'comments').to.be.false;
  });

  it('Cypress.Promise - instantiate a bluebird promise', () => {
    // https://on.cypress.io/promise
    let waited = false;
    let state = { waited: false };

    cy.then(async () => {
      const str = await utilitiesPage.createPromiseWithState(1000, 'foo', state);
      expect(str).to.eq('foo');
      expect(state.waited).to.be.true;
    });
  });
});