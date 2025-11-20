import { MiscPage } from '../../page-object-model/index.js';

describe('Misc with Page Objects', () => {
  let miscPage = new MiscPage();

  beforeEach(() => {
    miscPage = new MiscPage();
    miscPage.visitMiscPage();
  });

  it('cy.exec() - execute a system command', () => {
    // execute a system command.
    // so you can take actions necessary for
    // your test outside the scope of Cypress.
    // https://on.cypress.io/exec
    miscPage.logPlatformInfo();

    const isCircleOnWindows = miscPage.checkCircleCICondition();
    const isShippable = miscPage.checkShippableCondition();

    if (isCircleOnWindows) {
      cy.log('Skipping test on CircleCI');
    }

    if (isShippable) {
      cy.log('Skipping test on ShippableCI');
    }

    // Execute echo command
    miscPage.executeSystemCommand('echo Jane Lane')
      .its('stdout').should('contain', 'Jane Lane');

    // Platform-specific commands
    if (Cypress.platform === 'win32') {
      miscPage.executeSystemCommand(`print ${Cypress.config('configFile')}`)
        .its('stderr').should('be.empty');
    } else {
      miscPage.executeSystemCommand(`cat ${Cypress.config('configFile')}`)
        .its('stderr').should('be.empty');

      cy.log(`Cypress version ${Cypress.version}`);
      
      // Check Cypress version for different properties
      if (Cypress.version.split('.').map(Number)[0] < 15) {
        miscPage.executeSystemCommand('pwd')
          .its('code').should('eq', 0);
      } else {
        miscPage.executeSystemCommand('pwd')
          .its('exitCode').should('eq', 0);
      }
    }
  });

  it('cy.focused() - get the DOM element that has focus', () => {
    // https://on.cypress.io/focused
    miscPage.clickNameInput();
    miscPage.getFocusedElement().should('have.id', 'name');
    miscPage.clickDescriptionInput();
    miscPage.getFocusedElement().should('have.id', 'description');
  });

  context('Cypress.Screenshot', function () {
    it('cy.screenshot() - take a screenshot', () => {
      // https://on.cypress.io/screenshot
      miscPage.takeScreenshot('my-image');
    });

    it('Cypress.Screenshot.defaults() - change default config of screenshots', function () {
      miscPage.configureScreenshotDefaults();
    });
  });

  it('cy.wrap() - wrap an object', () => {
    // https://on.cypress.io/wrap
    miscPage.wrapObject({ foo: 'bar' })
      .should('have.property', 'foo')
      .and('include', 'bar');
  });
});