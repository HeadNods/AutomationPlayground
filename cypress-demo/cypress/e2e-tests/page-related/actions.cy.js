import { ActionsPage } from '../../page-object-model/index.js';

describe('Actions with Page Objects', () => {
  let actionsPage = new ActionsPage();;

  beforeEach(() => {
    actionsPage = new ActionsPage();
    actionsPage.visitActionsPage();
  });

  // https://on.cypress.io/interacting-with-elements

  it('.type() - type into a DOM element', () => {
    // https://on.cypress.io/type
    actionsPage
      .typeInEmailField('fake@email.com')
      .getEmailField()
      .should('have.value', 'fake@email.com');

    // .type() with special character sequences
    actionsPage.typeSpecialKeys('{leftarrow}{rightarrow}{uparrow}{downarrow}');
    actionsPage.typeSpecialKeys('{del}{selectall}{backspace}');

    // .type() with key modifiers
    actionsPage.typeSpecialKeys('{alt}{option}'); // these are equivalent
    actionsPage.typeSpecialKeys('{ctrl}{control}'); // these are equivalent
    actionsPage.typeSpecialKeys('{meta}{command}{cmd}'); // these are equivalent
    actionsPage.typeSpecialKeys('{shift}');

    // Delay each keypress by 0.1 sec
    actionsPage
      .typeInEmailField('slow.typing@email.com', { delay: 100 })
      .getEmailField()
      .should('have.value', 'slow.typing@email.com');

    actionsPage
      .typeInDisabledField('disabled error checking')
      .getDisabledInput()
      .should('have.value', 'disabled error checking');
  });

  it('.focus() - focus on a DOM element', () => {
    // https://on.cypress.io/focus
    actionsPage
      .focusFieldWithFocusClass()
      .getFocusInput()
      .should('have.class', 'focus');
  });

  it('.blur() - blur off a DOM element', () => {
    // https://on.cypress.io/blur
    actionsPage.getElement(actionsPage.selectors.blurInput).type('About to blur');
    actionsPage
      .blurFieldWithBlurClass()
      .getBlurInput()
      .should('have.class', 'error');
  });

  it('.clear() - clears an input or textarea element', () => {
    // https://on.cypress.io/clear
    actionsPage.getClearInput()
      .type('Clear this text')
      .should('have.value', 'Clear this text');
    actionsPage.clearField()
      .getClearInput()
      .should('have.value', '');
  });

  it('.submit() - submit a form', () => {
    // https://on.cypress.io/submit
    actionsPage
      .submitForm('HALFOFF')
      .getFormSubmitMessage()
      .should('be.visible')
      .and('contain', 'Your form has been submitted!');
  });

  it('.click() - click on a DOM element', () => {
    // https://on.cypress.io/click
    actionsPage.clickActionButton();

    // You can click on 9 specific positions of an element:
    //  -----------------------------------
    // | topLeft        top       topRight |
    // |                                   |
    // |                                   |
    // |                                   |
    // | left          center        right |
    // |                                   |
    // |                                   |
    // |                                   |
    // | bottomLeft   bottom   bottomRight |
    //  -----------------------------------

    // clicking in the center of the element is the default
    actionsPage.clickCanvas();

    actionsPage.clickCanvas('topLeft');
    actionsPage.clickCanvas('top');
    actionsPage.clickCanvas('topRight');
    actionsPage.clickCanvas('left');
    actionsPage.clickCanvas('right');
    actionsPage.clickCanvas('bottomLeft');
    actionsPage.clickCanvas('bottom');
    actionsPage.clickCanvas('bottomRight');

    // .click() accepts an x and y coordinate
    // that controls where the click occurs :)
    actionsPage.clickCanvasCoordinates(80, 75); // click 80px on x coord and 75px on y coord
    actionsPage.clickCanvasCoordinates(170, 75);
    actionsPage.clickCanvasCoordinates(80, 165);
    actionsPage.clickCanvasCoordinates(100, 185);
    actionsPage.clickCanvasCoordinates(125, 190);
    actionsPage.clickCanvasCoordinates(150, 185);
    actionsPage.clickCanvasCoordinates(170, 165);

    // click multiple elements by passing multiple: true
    actionsPage.clickMultipleLabels();

    // Ignore error checking prior to clicking
    actionsPage.clickOpacityButton();
  });

  it('.dblclick() - double click on a DOM element', () => {
    // https://on.cypress.io/dblclick

    // Our app has a listener on 'dblclick' event in our 'scripts.js'
    // that hides the div and shows an input on double click
    actionsPage
      .doubleClickDiv()
      .getDoubleClickInput()
      .should('be.visible');
  });

  it('.rightclick() - right click on a DOM element', () => {
    // https://on.cypress.io/rightclick

    // Our app has a listener on 'contextmenu' event in our 'scripts.js'
    // that hides the div and shows an input on right click
    actionsPage
      .rightClickDiv()
      .getRightClickInput()
      .should('be.visible');
  });

  it('.check() - check a checkbox or radio element', () => {
    // https://on.cypress.io/check

    // By default, .check() will check all
    // matching checkbox or radio elements in succession, one after another
    actionsPage
      .checkAllEnabledCheckboxes()
      .getAllEnabledCheckboxes()
      .should('be.checked');

    actionsPage
      .checkAllEnabledRadioButtons()
      .getAllEnabledRadioButtons()
      .should('be.checked');

    // .check() accepts a value argument
    actionsPage.checkSpecificRadioButton('radio1');
    actionsPage.getElement(actionsPage.selectors.radioButtonsEnabled + "[value='" + 'radio1' + "']")
      .should('be.checked');

    // .check() accepts an array of values
    actionsPage.checkSpecificCheckboxes(['checkbox1', 'checkbox2']);
    actionsPage.getElement(actionsPage.selectors.multipleCheckboxes + "[value='checkbox1']").should('be.checked');
    actionsPage.getElement(actionsPage.selectors.multipleCheckboxes + "[value='checkbox2']").should('be.checked');

    // Ignore error checking prior to checking
    actionsPage.checkDisabledCheckbox();
    actionsPage.getElement(actionsPage.selectors.disabledCheckboxes).should('be.checked');

    actionsPage.getElement(actionsPage.selectors.disabledRadioButtons).check('radio3', { force: true });
    actionsPage.getElement(actionsPage.selectors.disabledRadioButtons + "[value='" + 'radio3' + "']").should('be.checked');
  });

  it('.uncheck() - uncheck a checkbox element', () => {
    // https://on.cypress.io/uncheck

    // By default, .uncheck() will uncheck all matching
    // checkbox elements in succession, one after another
    actionsPage.uncheckAllCheckboxes();
    actionsPage.getElement(actionsPage.selectors.enabledActionCheckCheckboxes)
      .should('not.be.checked');

    // .uncheck() accepts a value argument
    actionsPage.getElement(actionsPage.selectors.enabledActionCheckCheckboxes)
      .check('checkbox1');
    actionsPage.getElement(actionsPage.selectors.enabledActionCheckCheckboxes)
      .uncheck(['checkbox1']);
    actionsPage.getElement(actionsPage.selectors.enabledActionCheckCheckboxes + '[value="checkbox1"]')
      .should('not.be.checked');

    // .uncheck() accepts an array of values
    actionsPage.getElement(actionsPage.selectors.enabledActionCheckCheckboxes)
      .check(['checkbox1', 'checkbox3']);
    actionsPage.getElement(actionsPage.selectors.enabledActionCheckCheckboxes)
      .uncheck(['checkbox1', 'checkbox3']);
    actionsPage.getElement(actionsPage.selectors.enabledActionCheckCheckboxes + '[value="checkbox1"]')
      .should('not.be.checked');
    actionsPage.getElement(actionsPage.selectors.enabledActionCheckCheckboxes + '[value="checkbox3"]')
      .should('not.be.checked');

    // Ignore error checking prior to unchecking
    actionsPage.getElement(actionsPage.selectors.disabledActionCheckCheckboxes)
      .should('be.checked');
    actionsPage.getElement(actionsPage.selectors.disabledActionCheckCheckboxes)
      .uncheck({ force: true });
    actionsPage.getElement(actionsPage.selectors.disabledActionCheckCheckboxes)
      .should('not.be.checked');
  });

  it('.select() - select an option in a <select> element', () => {
    // https://on.cypress.io/select

    // at first, no option should be selected
    actionsPage.getElement(actionsPage.selectors.singleSelect)
      .should('have.value', '--Select a fruit--');

    // Select option(s) with matching text content
    actionsPage
      .selectSingleOption('apples')
      .getSelectSingleOption()
      .should('have.value', 'fr-apples');

    actionsPage
      .selectMultipleOptions(['apples', 'oranges', 'bananas'])
      .getSelectMultipleOption()
      .invoke('val')
      .should('deep.equal', ['fr-apples', 'fr-oranges', 'fr-bananas']);

    // Select option(s) with matching value
    actionsPage
      .selectSingleOption('fr-bananas')
      .getSelectSingleOption()
      .should('have.value', 'fr-bananas');
    
    actionsPage
      .selectMultipleOptions(['fr-apples', 'fr-oranges', 'fr-bananas'])
      .getSelectMultipleOption()
      .invoke('val')
      .should('deep.equal', ['fr-apples', 'fr-oranges', 'fr-bananas']);
    // assert the selected values include oranges
    actionsPage.getElement(actionsPage.selectors.multipleSelect)
      .invoke('val').should('include', 'fr-oranges');
  });

  it('.scrollIntoView() - scroll an element into view', () => {
    // https://on.cypress.io/scrollintoview

    // normally all of these buttons are hidden,
    // because they're not within
    // the viewable area of their parent
    // (we need to scroll to see them)
    actionsPage.getElement(actionsPage.selectors.horizontalScrollButtons).should('not.be.visible');

    // scroll the button into view, as if the user had scrolled
    actionsPage
      .scrollHorizontalButtonIntoView()
      .getHorizontalButton()
      .should('be.visible');

    actionsPage
      .getVerticalButton()
      .should('not.be.visible');

    // Cypress handles the scroll direction needed
    actionsPage
      .scrollVerticalButtonIntoView()
      .getVerticalButton()
      .should('be.visible');

    actionsPage
      .getBothButton()
      .should('not.be.visible');

    // Cypress knows to scroll to the right and down
    actionsPage
      .scrollBothButtonIntoView()
      .getBothButton()
      .should('be.visible');
  });

  it('.trigger() - trigger an event on a DOM element', () => {
    // https://on.cypress.io/trigger

    // To interact with a range input (slider)
    // we need to set its value & trigger the
    // event to signal it changed

    // Here, we invoke jQuery's val() method to set
    // the value and trigger the 'change' event
    actionsPage
      .setRangeValue(25)
      .getRangeValue()
      .should('have.value', 25);
    actionsPage
      .getRangeValueText()
      .should('have.text', '25');
  });

  it('cy.scrollTo() - scroll the window or element to a position', () => {
    // https://on.cypress.io/scrollto

    // You can scroll to 9 specific positions of an element:
    //  -----------------------------------
    // | topLeft        top       topRight |
    // |                                   |
    // |                                   |
    // |                                   |
    // | left          center        right |
    // |                                   |
    // |                                   |
    // |                                   |
    // | bottomLeft   bottom   bottomRight |
    //  -----------------------------------

    // if you chain .scrollTo() off of cy, we will
    // scroll the entire window
    cy.scrollTo('bottom');

    actionsPage.scrollToPosition(actionsPage.selectors.scrollableHorizontal, 'right');

    // or you can scroll to a specific coordinate:
    // (x axis, y axis) in pixels
    actionsPage.scrollToCoordinates(actionsPage.selectors.scrollableVertical, 250, 250);

    // or you can scroll to a specific percentage
    // of the (width, height) of the element
    actionsPage.scrollToPercentage(actionsPage.selectors.scrollableBoth, '75%', '25%');

    // control the easing of the scroll (default is 'swing')
    actionsPage.getElement(actionsPage.selectors.scrollableVertical)
      .scrollTo('center', { easing: 'linear' });

    // control the duration of the scroll (in ms)
    actionsPage.getElement(actionsPage.selectors.scrollableBoth)
      .scrollTo('center', { duration: 2000 });
  });

  it('checkdisabledstate() - check that an input field is disabled', () => {
    actionsPage.getDisabledInput()
      .should('be.disabled');
  });
});