import { NetworkRequestsPage } from '../../page-object-model/index.js';

describe('Network Requests with Page Objects', () => {
  let networkPage = new NetworkRequestsPage();

  beforeEach(() => {
    networkPage = new NetworkRequestsPage();
    networkPage.visitNetworkRequestsPage();
  });

  // Manage HTTP requests in your app

  it('cy.request() - make an XHR request', () => {
    // https://on.cypress.io/request
    networkPage.makeGetRequest('https://jsonplaceholder.cypress.io/comments')
      .should((response) => {
        expect(response.status).to.eq(200);
        // the server sometimes gets an extra comment posted from another machine
        // which gets returned as 1 extra object
        expect(response.body).to.have.property('length').and.be.oneOf([500, 501]);
        expect(response).to.have.property('headers');
        expect(response).to.have.property('duration');
      });
  });

  it('cy.request() - verify response using BDD syntax', () => {
    networkPage.makeGetRequest('https://jsonplaceholder.cypress.io/comments')
      .then((response) => {
        // https://on.cypress.io/assertions
        expect(response).property('status').to.equal(200);
        expect(response).property('body').to.have.property('length').and.be.oneOf([500, 501]);
        expect(response).to.include.keys('headers', 'duration');
      });
  });

  it('cy.request() with query parameters', () => {
    // will execute request
    // https://jsonplaceholder.cypress.io/comments?postId=1&id=3
    networkPage.makeGetRequestWithQuery('https://jsonplaceholder.cypress.io/comments', {
      postId: 1,
      id: 3,
    })
      .its('body')
      .should('be.an', 'array')
      .and('have.length', 1)
      .its('0') // yields first element of the array
      .should('contain', {
        postId: 1,
        id: 3,
      });
  });

  it('cy.request() - pass result to the second request', () => {
    // first, let's find out the userId of the first user we have
    networkPage.getUserAndMakePost()
      // note that the value here is the returned value of the 2nd request
      // which is the new post object
      .then((response) => {
        expect(response).property('status').to.equal(201); // new entity created
        expect(response).property('body').to.contain({
          title: 'Cypress Test Runner',
        });

        // we don't know the exact post id - only that it will be > 100
        // since JSONPlaceholder has built-in 100 posts
        expect(response.body).property('id').to.be.a('number')
          .and.to.be.gt(100);

        // we don't know the user id here - since it was in above closure
        // so in this test just confirm that the property is there
        expect(response.body).property('userId').to.be.a('number');
      });
  });

  it('cy.request() - save response in the shared test context', () => {
    // https://on.cypress.io/variables-and-aliases
    networkPage.getUserAndMakePostWithAlias();
    cy.then(function () {
      // NOTE 👀
      //  By the time this callback runs the "as('user')" command
      //  has saved the user object in the test context.
      //  To access the test context we need to use
      //  the "function () { ... }" callback form,
      //  otherwise "this" points at a wrong or undefined object!
      
      // When this callback runs, both "cy.request" API commands have finished
      // and the test context has "user" and "post" objects set.
      // Let's verify them.
      expect(this.post, 'post has the right user id').property('userId').to.equal(this.user.id);
    });
  });

  it('cy.intercept() - route responses to matching requests', () => {
    // https://on.cypress.io/intercept

    let message = 'whoa, this comment does not exist';

    // Listen to GET to comments/1
    networkPage.interceptGetComments();

    // we have code that gets a comment when
    // the button is clicked in scripts.js
    networkPage.clickGetRequestButton();

    // https://on.cypress.io/wait
    networkPage.waitForGetComment().its('response.statusCode').should('be.oneOf', [200, 304]);

    // Listen to POST to comments
    networkPage.interceptPostComments();

    // we have code that posts a comment when
    // the button is clicked in scripts.js
    networkPage.clickPostRequestButton();
    networkPage.waitForPostComment().should(({ request, response }) => {
      expect(request.body).to.include('email');
      expect(request.headers).to.have.property('content-type');
      expect(response && response.body).to.have.property('name', 'Using POST in cy.intercept()');
    });

    // Stub a response to PUT comments/ ****
    networkPage.interceptPutCommentsWithError(message);

    // we have code that puts a comment when
    // the button is clicked in scripts.js
    networkPage.clickPutRequestButton();

    networkPage.waitForPutComment();

    // our 404 statusCode logic in scripts.js executed
    networkPage.getPutCommentErrorText().should('contain', message);
  });
});