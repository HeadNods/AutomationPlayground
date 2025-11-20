import { StoragePage } from '../../page-object-model/index.js';

describe('Local Storage / Session Storage with Page Objects', () => {
  let storagePage = new StoragePage();

  beforeEach(() => {
    storagePage.visitStoragePage();
  });

  // Although localStorage is automatically cleared
  // in between tests to maintain a clean state
  // sometimes we need to clear localStorage manually

  it('cy.clearLocalStorage() - clear all data in localStorage for the current origin', () => {
    // https://on.cypress.io/clearlocalstorage
    storagePage.performLocalStorageSetup();
    
    storagePage.getLocalStorageButton().should(() => {
      expect(localStorage.getItem('prop1')).to.eq('red');
      expect(localStorage.getItem('prop2')).to.eq('blue');
      expect(localStorage.getItem('prop3')).to.eq('magenta');
    });

    storagePage.clearAllLocalStorage();
    storagePage.getAllLocalStorage().should(() => {
      expect(localStorage.getItem('prop1')).to.be.null;
      expect(localStorage.getItem('prop2')).to.be.null;
      expect(localStorage.getItem('prop3')).to.be.null;
    });

    storagePage.clickLocalStorageButton();
    storagePage.getLocalStorageButton().should(() => {
      expect(localStorage.getItem('prop1')).to.eq('red');
      expect(localStorage.getItem('prop2')).to.eq('blue');
      expect(localStorage.getItem('prop3')).to.eq('magenta');
    });

    // Clear key matching string in localStorage
    storagePage.clearLocalStorageByKey('prop1');
    storagePage.getAllLocalStorage().should(() => {
      expect(localStorage.getItem('prop1')).to.be.null;
      expect(localStorage.getItem('prop2')).to.eq('blue');
      expect(localStorage.getItem('prop3')).to.eq('magenta');
    });

    storagePage.clickLocalStorageButton();
    storagePage.getLocalStorageButton().should(() => {
      expect(localStorage.getItem('prop1')).to.eq('red');
      expect(localStorage.getItem('prop2')).to.eq('blue');
      expect(localStorage.getItem('prop3')).to.eq('magenta');
    });

    // Clear keys matching regex in localStorage
    storagePage.clearLocalStorageByRegex(/prop1|2/);
    storagePage.getAllLocalStorage().should(() => {
      expect(localStorage.getItem('prop1')).to.be.null;
      expect(localStorage.getItem('prop2')).to.be.null;
      expect(localStorage.getItem('prop3')).to.eq('magenta');
    });
  });

  it('cy.getAllLocalStorage() - get all data in localStorage for all origins', () => {
    // https://on.cypress.io/getalllocalstorage
    storagePage.clickLocalStorageButton();

    // getAllLocalStorage() yields a map of origins to localStorage values
    storagePage.getAllLocalStorage().should((storageMap) => {
      expect(storageMap).to.deep.equal({
        // other origins will also be present if localStorage is set on them
        'https://example.cypress.io': {
          prop1: 'red',
          prop2: 'blue',
          prop3: 'magenta',
        },
      });
    });
  });

  it('cy.clearAllLocalStorage() - clear all data in localStorage for all origins', () => {
    // https://on.cypress.io/clearalllocalstorage
    storagePage.clickLocalStorageButton();

    // clearAllLocalStorage() yields null
    storagePage.clearAllLocalStorageAllOrigins();
    storagePage.getAllLocalStorage().should(() => {
      expect(localStorage.getItem('prop1')).to.be.null;
      expect(localStorage.getItem('prop2')).to.be.null;
      expect(localStorage.getItem('prop3')).to.be.null;
    });
  });

  it('cy.getAllSessionStorage() - get all data in sessionStorage for all origins', () => {
    // https://on.cypress.io/getallsessionstorage
    storagePage.clickLocalStorageButton();

    // getAllSessionStorage() yields a map of origins to sessionStorage values
    storagePage.getAllSessionStorage().should((storageMap) => {
      expect(storageMap).to.deep.equal({
        // other origins will also be present if sessionStorage is set on them
        'https://example.cypress.io': {
          prop4: 'cyan',
          prop5: 'yellow',
          prop6: 'black',
        },
      });
    });
  });

  it('cy.clearAllSessionStorage() - clear all data in sessionStorage for all origins', () => {
    // https://on.cypress.io/clearallsessionstorage
    storagePage.clickLocalStorageButton();

    // clearAllSessionStorage() yields null
    storagePage.clearAllSessionStorageAllOrigins();
    storagePage.getAllSessionStorage().should(() => {
      expect(sessionStorage.getItem('prop4')).to.be.null;
      expect(sessionStorage.getItem('prop5')).to.be.null;
      expect(sessionStorage.getItem('prop6')).to.be.null;
    });
  });
});