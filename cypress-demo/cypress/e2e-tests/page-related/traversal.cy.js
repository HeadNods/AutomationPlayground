import { TraversalPage } from '../../page-object-model/index.js';

describe('Traversal with Page Objects', () => {
  let traversalPage = new TraversalPage();

  beforeEach(() => {
    traversalPage = new TraversalPage();
    traversalPage.visitTraversalPage();
  });

  it('.children() - get child DOM elements', () => {
    // https://on.cypress.io/children
    traversalPage.getChildrenOfBreadcrumb().should('contain', 'Data');
  });

  it('.closest() - get closest ancestor DOM element', () => {
    // https://on.cypress.io/closest
    traversalPage.getClosestUlOfBadge().should('have.class', 'list-group');
  });

  it('.eq() - get a DOM element at a specific index', () => {
    // https://on.cypress.io/eq
    traversalPage.getListItemByIndex(1).should('contain', 'siamese');
  });

  it('.filter() - get DOM elements that match the selector', () => {
    // https://on.cypress.io/filter
    traversalPage.getActiveNavItem().should('contain', 'About');
  });

  it('.find() - get descendant DOM elements of the selector', () => {
    // https://on.cypress.io/find
    traversalPage.getPaginationLinks().should('have.length', 7);
  });

  it('.first() - get first DOM element', () => {
    // https://on.cypress.io/first
    traversalPage.getFirstTableCell().should('contain', 1);
  });

  it('.last() - get last DOM element', () => {
    // https://on.cypress.io/last
    traversalPage.getLastButton().should('contain', 'Submit');
  });

  it('.next() - get next sibling DOM element', () => {
    // https://on.cypress.io/next
    traversalPage.getNextAfterApples().should('contain', 'oranges');
  });

  it('.nextAll() - get all next sibling DOM elements', () => {
    // https://on.cypress.io/nextall
    traversalPage.getNextAllAfterOranges().should('have.length',  3);
  });

  it('.nextUntil() - get next sibling DOM elements until next el', () => {
    // https://on.cypress.io/nextuntil
    traversalPage.getNextUntilNuts().should('have.length', 3);
  });

  it('.not() - remove DOM elements from set of DOM elements', () => {
    // https://on.cypress.io/not
    traversalPage.getNonDisabledButtons().should('not.contain', 'Disabled');
  });

  it('.parent() - get parent DOM element from DOM elements', () => {
    // https://on.cypress.io/parent
    traversalPage.getParentOfMark().should('contain', 'Morbi leo risus');
  });

  it('.parents() - get parent DOM elements from DOM elements', () => {
    // https://on.cypress.io/parents
    traversalPage.getParentsOfCite().should('match', 'blockquote');
  });

  it('.parentsUntil() - get parent DOM elements from DOM elements until el', () => {
    // https://on.cypress.io/parentsuntil
    traversalPage.getParentsUntilClothesNav().should('have.length', 2);
  });

  it('.prev() - get previous sibling DOM element', () => {
    // https://on.cypress.io/prev
    traversalPage.getPrevOfActiveBird().should('contain', 'Lorikeets');
  });

  it('.prevAll() - get all previous sibling DOM elements', () => {
    // https://on.cypress.io/prevall
    traversalPage.getPrevAllOfThird().should('have.length', 2);
  });

  it('.prevUntil() - get all previous sibling DOM elements until el', () => {
    // https://on.cypress.io/prevuntil
    traversalPage.getPrevUntilVeggies().should('have.length', 3); 
  });

  it('.siblings() - get all sibling DOM elements', () => {
    // https://on.cypress.io/siblings
    traversalPage.getSiblingsOfActive().should('have.length', 2);
  });
});