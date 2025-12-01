declare module 'cypress-mochawesome-reporter/plugin' {
  function register(on: Cypress.PluginEvents): void;
  export default register;
}

declare module 'cypress-mochawesome-reporter/register';
