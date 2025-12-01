import { FilesPage } from '../../page-object-model/index';

/// JSON fixture file can be loaded in directly using 'import' statement
import requiredExample from '../../fixtures/example.json';

describe('Files with Page Objects', () => {
  let filesPage: FilesPage;

  beforeEach(() => {
    filesPage = new FilesPage();
    filesPage.visitFilesPage();
    // load example.json fixture file and store
    // in the test context object
    filesPage.loadExampleFixture();
  });

  it('cy.fixture() - load a fixture', () => {
    // https://on.cypress.io/fixture

    // Instead of writing a response inline you can
    // use a fixture file's content.
    filesPage
      .interceptWithFixture('GET', '**/comments/*', 'example.json', 'getComment')
      .clickFixtureButton();

    filesPage
      .waitForInterceptedRequest('getComment')
      .its('response.body')
      .should('have.property', 'name')
      .and('include', 'Using fixtures to represent data');
  });

  it('cy.fixture() or require - load a fixture', function () {
    // we are inside the "function () { ... }"
    // callback and can use test context object "this"
    // "this.example" was loaded in "beforeEach" function callback
    filesPage
      .getLoadedFixture('example')
      .then((example) => {
        expect(example, 'fixture in the test context').to.deep.equal(requiredExample);
        // or use "cy.wrap" and "should('deep.equal', ...)" assertion
        cy.wrap(example).should('deep.equal', requiredExample);
      });
  });

  it('cy.readFile() - read file contents', () => {
    // https://on.cypress.io/readfile

    // You can read a file and yield its contents
    // The filePath is relative to your project's root.
    filesPage
      .readConfigFile()
      .then((config) => {
        expect(config).to.be.an('string');
      });
  });

  it('cy.writeFile() - write to a file', () => {
    // https://on.cypress.io/writefile

    // You can write to a file
    filesPage
      .requestAndWriteFile('https://jsonplaceholder.cypress.io/users', 'cypress/fixtures/users.json')
      .getFixture('users')
      .should((data) => {
        expect(data[0].name).to.exist;
      });

    // JavaScript arrays and objects are stringified and formatted into text
    filesPage.writeJsonFile('cypress/fixtures/profile.json', {
      id: 8739,
      name: 'Jane',
      email: 'jane@example.com',
    });
    filesPage.getFixture('profile')
      .should((profile) => {
        expect(profile.name).to.eq('Jane');
      });
  });
});