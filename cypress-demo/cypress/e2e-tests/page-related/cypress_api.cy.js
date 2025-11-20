import { CypressApiPage } from '../../page-object-model/index.js';

describe('Cypress APIs with Page Objects', () => {
  let cypressApiPage = new CypressApiPage();

  beforeEach(() => {
    cypressApiPage = new CypressApiPage();
    cypressApiPage.visitCypressApiPage();
  });

  context('Cypress.Commands', () => {
    // https://on.cypress.io/custom-commands

    it('.add() - create a custom command', () => {
      cypressApiPage.addConsoleCommand()
        .useCustomConsoleCommand();
    });
  });

  context('Cypress.Cookies', () => {
    // https://on.cypress.io/cookies
    it('.debug() - enable or disable debugging', () => {
      cypressApiPage.enableCookieDebugging()
        .performFakeCookieOperations();
    });
  });

  context('Cypress.arch', () => {
    it('Get CPU architecture name of underlying OS', () => {
      // https://on.cypress.io/arch
      expect(cypressApiPage.getCpuArchitecture()).to.exist;
    });
  });

  context('Cypress.config()', () => {
    it('Get and set configuration options', () => {
      // https://on.cypress.io/config
      let config = cypressApiPage.getConfiguration();
      expect(config).to.have.property('animationDistanceThreshold', 5);
      expect(config).to.have.property('baseUrl', null);
      expect(config).to.have.property('defaultCommandTimeout', 4000);
      expect(config).to.have.property('requestTimeout', 5000);
      expect(config).to.have.property('responseTimeout', 30000);
      expect(config).to.have.property('viewportHeight', 660);
      expect(config).to.have.property('viewportWidth', 1000);
      expect(config).to.have.property('pageLoadTimeout', 60000);
      expect(config).to.have.property('waitForAnimations', true);

      expect(cypressApiPage.getSpecificConfig('pageLoadTimeout')).to.eq(60000);
      // this will change the config for the rest of your tests!
      cypressApiPage.setConfiguration('pageLoadTimeout', 20000);
      expect(cypressApiPage.getSpecificConfig('pageLoadTimeout')).to.eq(20000);
      cypressApiPage.setConfiguration('pageLoadTimeout', 60000);
    });
  });

  context('Cypress.dom', () => {
    // https://on.cypress.io/dom
    it('.isHidden() - determine if a DOM element is hidden', () => {
      const hiddenP = cypressApiPage.getHiddenParagraph();
      const visibleP = cypressApiPage.getVisibleParagraph();

      // our first paragraph has css class 'hidden'
      expect(Cypress.dom.isHidden(hiddenP)).to.be.true;
      expect(Cypress.dom.isHidden(visibleP)).to.be.false;
    });
  });

  context('Cypress.env()', () => {
    // We can set environment variables for highly dynamic values

    // https://on.cypress.io/environment-variables
    it('Get environment variables', () => {
      // https://on.cypress.io/env
      cypressApiPage.setEnvironmentVariables({
        host: 'veronica.dev.local',
        api_server: 'http://localhost:8888/v1/',
      });
      expect(cypressApiPage.getEnvironmentVariable('host')).to.eq('veronica.dev.local');
      expect(cypressApiPage.getEnvironmentVariable('api_server')).to.eq('http://localhost:8888/v1/');
      cypressApiPage.setEnvironmentVariable('api_server', 'http://localhost:8888/v2/');
      let envVars = cypressApiPage.getAllEnvironmentVariables();
      expect(envVars).to.have.property('host', 'veronica.dev.local');
      expect(envVars).to.have.property('api_server', 'http://localhost:8888/v2/');
    });
  });

  context('Cypress.log', () => {
    it('Control what is printed to the Command Log', () => {
      // https://on.cypress.io/cypress-log
    });
  });

  context('Cypress.platform', () => {
    it('Get underlying OS name', () => {
      // https://on.cypress.io/platform
      expect(cypressApiPage.getPlatform()).to.exist;
    });
  });

  context('Cypress.version', () => {
    it('Get current version of Cypress being run', () => {
      // https://on.cypress.io/version
      expect(cypressApiPage.getVersion()).to.exist;
    });
  });

  context('Cypress.spec', () => {
    it('Get current spec information', () => {
      // https://on.cypress.io/spec
      expect(cypressApiPage.getSpecInformation()).to.exist;
    });
  });
});