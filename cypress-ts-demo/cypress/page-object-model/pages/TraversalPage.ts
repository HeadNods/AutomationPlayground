import BasePage from '../BasePage.js';

/**
 * Page Object for the Traversal Demo Page
 * URL: https://example.cypress.io/commands/traversal
 */
class TraversalPage extends BasePage {
  private readonly selectors = {
    traversalBreadcrumb: '.traversal-breadcrumb',
    traversalBadge: '.traversal-badge',
    traversalList: '.traversal-list',
    traversalListItems: '.traversal-list > li',
    traversalNav: '.traversal-nav',
    traversalNavItems: '.traversal-nav > li',
    traversalPagination: '.traversal-pagination',
    traversalTable: '.traversal-table',
    traversalTableCells: '.traversal-table td',
    traversalButtons: '.traversal-buttons',
    traversalButtonsBtn: '.traversal-buttons .btn',
    traversalUl: '.traversal-ul',
    traversalNextAll: '.traversal-next-all',
    veggiesId: '#veggies',
    nutsId: '#nuts',
    traversalDisabled: '.traversal-disabled',
    traversalDisabledBtn: '.traversal-disabled .btn',
    traversalMark: '.traversal-mark',
    traversalCite: '.traversal-cite',
    clothesNav: '.clothes-nav',
    birds: '.birds',
    fruitsList: '.fruits-list',
    foodsList: '.foods-list',
    traversalPills: '.traversal-pills'
  };

  constructor() {
    super();
    this.url = 'https://example.cypress.io/commands/traversal';
  };

  // ========================================
  // ACTIONS - Return 'this' for chaining
  // ========================================
  visitTraversalPage() {
    return this.visit();
  }

  // ========================================
  // DATA RETRIEVAL - Return Chainable for .should()
  // ========================================
  // .children()
  getChildrenOfBreadcrumb() {
    return this.getElement(this.selectors.traversalBreadcrumb).children('.active');
  }
  // .closest()
  getClosestUlOfBadge() {
    return this.getElement(this.selectors.traversalBadge).closest('ul');
  }
  // .eq()
  getListItemByIndex(index: number) {
    return this.getElement(this.selectors.traversalListItems).eq(index);
  }
  // .filter()
  getActiveNavItem() {
    return this.getElement(this.selectors.traversalNavItems).filter('.active');
  }
  // .find()
  getPaginationLinks() {
    return this.getElement(this.selectors.traversalPagination).find('li').find('a');
  }
  // .first()
  getFirstTableCell() {
    return this.getElement(this.selectors.traversalTableCells).first();
  }
  // .last()
  getLastButton() {
    return this.getElement(this.selectors.traversalButtonsBtn).last();
  }
  // .next()
  getNextAfterApples() {
    return this.getElement(this.selectors.traversalUl).contains('apples').next();
  }
  // .nextAll()
  getNextAllAfterOranges() {
    return this.getElement(this.selectors.traversalNextAll).contains('oranges').nextAll();
  }
  // .nextUntil()
  getNextUntilNuts() {
    return this.getElement(this.selectors.veggiesId).nextUntil(this.selectors.nutsId);
  }
  // .not()
  getNonDisabledButtons() {
    return this.getElement(this.selectors.traversalDisabledBtn).not('[disabled]');
  }
  // .parent()
  getParentOfMark() {
    return this.getElement(this.selectors.traversalMark).parent();
  }
  // .parents()
  getParentsOfCite() {
    return this.getElement(this.selectors.traversalCite).parents();
  }
  // .parentsUntil()
  getParentsUntilClothesNav() {
    return this.getElement(this.selectors.clothesNav)
      .find('.active')
      .parentsUntil(this.selectors.clothesNav);
  }
  // .prev()
  getPrevOfActiveBird() {
    return this.getElement(this.selectors.birds).find('.active').prev();
  }
  // .prevAll()
  getPrevAllOfThird() {
    return this.getElement(this.selectors.fruitsList).find('.third').prevAll();
  }
  // .prevUntil()
  getPrevUntilVeggies() {
    return this.getElement(this.selectors.foodsList).find(this.selectors.nutsId)
      .prevUntil(this.selectors.veggiesId);
  }
  // .siblings()
  getSiblingsOfActive() {
    return this.getElement(this.selectors.traversalPills).find('.active').siblings();
  }
}

export default TraversalPage;