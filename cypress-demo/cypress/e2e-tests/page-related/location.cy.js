import { LocationPage } from '../../page-object-model/index.js';

describe('Location with Page Objects', () => {
  let locationPage = new LocationPage();

  beforeEach(() => {
    locationPage = new LocationPage();
    locationPage.visitLocationPage();
  });

  it('cy.hash() - get the current URL hash', () => {
    // https://on.cypress.io/hash
    locationPage.getHash().should('be.empty');
  });

  it('cy.location() - get window.location', () => {
    // https://on.cypress.io/location
    locationPage.getLocation().should((loc) => {
      expect(loc).to.have.property('href');
      expect(loc).to.have.property('protocol');
      expect(loc).to.have.property('host');
      expect(loc).to.have.property('hostname');
      expect(loc).to.have.property('port');
      expect(loc).to.have.property('pathname');
      expect(loc).to.have.property('search');
      expect(loc).to.have.property('hash');
    });
  });

  it('cy.url() - get the current URL', () => {
    // https://on.cypress.io/url
    locationPage.getUrl().should('include', 'https://example.cypress.io/commands/location');
  });
});