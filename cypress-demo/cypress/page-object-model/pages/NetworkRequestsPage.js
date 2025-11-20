import BasePage from '../BasePage.js';

/**
 * Page Object for the Network Requests Demo Page
 * URL: https://example.cypress.io/commands/network-requests
 * 
 * This page contains only ACTIONS and DATA RETRIEVAL methods.
 * All test logic and assertions should be in the test files.
 */
class NetworkRequestsPage extends BasePage {
  constructor() {
    super();
    this.url = 'https://example.cypress.io/commands/network-requests';
  }

  // Selectors
  get selectors() {
    return {
      // Network request buttons
      networkButton: '.network-btn',
      networkPostButton: '.network-post',
      networkPutButton: '.network-put',
      
      // Response display elements
      networkPutComment: '.network-put-comment'
    };
  }

  // Navigation
  visitNetworkRequestsPage() {
    return this.visit();
  }

  // UI Actions
  clickGetRequestButton() {
    this.clickElement(this.selectors.networkButton);
    return this;
  }

  clickPostRequestButton() {
    this.clickElement(this.selectors.networkPostButton);
    return this;
  }

  clickPutRequestButton() {
    this.clickElement(this.selectors.networkPutButton);
    return this;
  }

  // Data Retrieval
  getPutCommentErrorText() {
    return this.getElement(this.selectors.networkPutComment);
  }

  // Direct HTTP Requests
  makeGetRequest(url = 'https://jsonplaceholder.cypress.io/comments') {
    return cy.request(url);
  }

  makeGetRequestWithQuery(baseUrl = 'https://jsonplaceholder.cypress.io/comments', queryParams = {}) {
    return cy.request({
      url: baseUrl,
      qs: queryParams
    });
  }

  makePostRequest(url, body) {
    return cy.request('POST', url, body);
  }

  makePutRequest(url, body) {
    return cy.request('PUT', url, body);
  }

  // Advanced request methods
  getUserAndMakePost() {
    return cy.request('https://jsonplaceholder.cypress.io/users?_limit=1')
      .its('body')
      .its('0')
      .then((user) => {
        return cy.request('POST', 'https://jsonplaceholder.cypress.io/posts', {
          userId: user.id,
          title: 'Cypress Test Runner',
          body: 'Fast, easy and reliable testing for anything that runs in a browser.'
        });
      });
  }

  getUserAndMakePostWithAlias() {
    cy.request('https://jsonplaceholder.cypress.io/users?_limit=1')
      .its('body')
      .its('0')
      .as('user')
      .then(function() {
        cy.request('POST', 'https://jsonplaceholder.cypress.io/posts', {
          userId: this.user.id,
          title: 'Cypress Test Runner',
          body: 'Fast, easy and reliable testing for anything that runs in a browser.'
        })
        .its('body')
        .as('post');
      });
    return this;
  }

  // Intercept Methods
  interceptGetComments() {
    cy.intercept('GET', '**/comments/*').as('getComment');
    return this;
  }

  interceptPostComments() {
    cy.intercept('POST', '**/comments').as('postComment');
    return this;
  }

  interceptPutComments(stubResponse = null) {
    if (stubResponse) {
      cy.intercept({
        method: 'PUT',
        url: '**/comments/*'
      }, stubResponse).as('putComment');
    } else {
      cy.intercept('PUT', '**/comments/*').as('putComment');
    }
    return this;
  }

  interceptPutCommentsWithError(errorMessage = 'whoa, this comment does not exist') {
    cy.intercept({
      method: 'PUT',
      url: '**/comments/*'
    }, {
      statusCode: 404,
      body: { error: errorMessage },
      headers: { 'access-control-allow-origin': '*' },
      delayMs: 500
    }).as('putComment');
    return this;
  }

  // Wait for intercepted requests
  waitForGetComment() {
    return cy.wait('@getComment');
  }

  waitForPostComment() {
    return cy.wait('@postComment');
  }

  waitForPutComment() {
    return cy.wait('@putComment');
  }
}

export default NetworkRequestsPage;