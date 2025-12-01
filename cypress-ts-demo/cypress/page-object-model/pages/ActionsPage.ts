import BasePage from '../BasePage.js';

/**
 * Page Object for the Actions Demo Page
 * URL: https://example.cypress.io/commands/actions
 */
class ActionsPage extends BasePage {
  //PRIVATE Selectors - tests shouldn't access these directly
  private readonly selectors = {
    emailInput: '.action-email',
    disabledInput: '.action-disabled',
    focusInput: '.action-focus',
    blurInput: '.action-blur',
    clearInput: '.action-clear',
    actionForm: '.action-form',
    formTextInput: '.action-form [type="text"]',
    formSubmitMessage: '.action-form + p',
    actionButton: '.action-btn',
    actionCanvas: '#action-canvas',
    actionLabels: '.action-labels > .label',
    opacityButton: '.action-opacity > .btn',
    doubleClickDiv: '.action-div',
    doubleClickInput: '.action-input-hidden',
    rightClickDiv: '.rightclick-action-div',
    rightClickInput: '.rightclick-action-input-hidden',
    checkboxesEnabled: '.action-checkboxes [type="checkbox"]:not([disabled])',
    disabledCheckboxes: '.action-checkboxes [disabled]',
    enabledActionCheckCheckboxes: '.action-check [type="checkbox"]:not([disabled])',
    disabledActionCheckCheckboxes: '.action-check [type="checkbox"][disabled]',
    allActionCheckCheckboxes: '.action-check [type="checkbox"]',
    multipleCheckboxes: '.action-multiple-checkboxes [type="checkbox"]',
    radioButtonsEnabled: '.action-radios [type="radio"]:not([disabled])',
    disabledRadioButtons: '.action-radios [disabled]',
    singleSelect: '.action-select',
    multipleSelect: '.action-select-multiple',
    horizontalScrollButtons: '#scroll-horizontal button',
    verticalScrollButtons: '#scroll-vertical button',
    bothScrollButtons: '#scroll-both button',
    scrollableHorizontal: '#scrollable-horizontal',
    scrollableVertical: '#scrollable-vertical',
    scrollableBoth: '#scrollable-both',
    rangeInput: '.trigger-input-range'
  };

  constructor() {
    super();
    this.url = 'https://example.cypress.io/commands/actions';
  }

  // ========================================
  // ACTIONS - Return 'this' for chaining
  // ========================================

  visitActionsPage() {
    return this.visit();
  }
  typeInEmailField(text: string, options = {}) {
    this.typeText(this.selectors.emailInput, text, options);
    return this;
  }
  typeInBlurInput(text: string) {
    this.getBlurInput().type(text);
    return this;
  }
  typeInDisabledField(text: string) {
    this.getElement(this.selectors.disabledInput).type(text, { force: true });
    return this;
  }
  typeSpecialKeys(keys: string) {
    this.getElement(this.selectors.emailInput).type(keys);
    return this;
  }
  focusFieldWithFocusClass() {
    this.getElement(this.selectors.focusInput).focus();
    return this;
  }
  blurFieldWithBlurClass() {
    this.getBlurInput().blur();
    return this;
  }
  clearField() {
    this.getClearInput().clear();
    return this;
  }
  submitForm(couponCode = 'HALFOFF') {
    this.typeText(this.selectors.formTextInput, couponCode);
    this.getElement(this.selectors.actionForm).submit();
    return this;
  }
  clickActionButton() {
    this.clickElement(this.selectors.actionButton);
    return this;
  }
  /**
    * Click on the canvas
    * @param {'center' | 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'right'} position - Position to click
    */
  clickCanvas(position: 'center' | 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight' | 'left' | 'right' = 'center') {
    this.getElement(this.selectors.actionCanvas).click(position);
    return this;
  }
  clickCanvasCoordinates(x: number, y: number) {
    this.getElement(this.selectors.actionCanvas).click(x, y);
    return this;
  }
  clickMultipleLabels() {
    this.getElement(this.selectors.actionLabels).click({ multiple: true });
    return this;
  }
  clickOpacityButton() {
    this.getElement(this.selectors.opacityButton).click({ force: true });
    return this;
  }
  doubleClickDiv() {
    this.getElement(this.selectors.doubleClickDiv).dblclick();
    return this;
  }
  rightClickDiv() {
    this.getElement(this.selectors.rightClickDiv).rightclick();
    return this;
  }
  checkAllEnabledCheckboxes() {
    this.checkElement(this.selectors.checkboxesEnabled);
    return this;
  }
  checkDisabledCheckbox() {
    this.getElement(this.selectors.disabledCheckboxes).check({ force: true });
    return this;
  }
  uncheckAllCheckboxes() {
    this.uncheckElement(this.selectors.enabledActionCheckCheckboxes);
    return this;
  }
  checkSpecificCheckboxes(values: string[]) {
    this.getElement(this.selectors.multipleCheckboxes).check(values);
    return this;
  }
  uncheckSpecificCheckboxes(values: string[]) {
    this.getElement(this.selectors.multipleCheckboxes).uncheck(values);
    return this;
  }
  checkAllEnabledRadioButtons() {
    this.checkElement(this.selectors.radioButtonsEnabled);
    return this;
  }
  checkSpecificRadioButton(value: string) {
    this.getElement(this.selectors.radioButtonsEnabled).check(value);
    return this;
  }
  selectSingleOption(option: string) {
    this.selectOption(this.selectors.singleSelect, option);
    return this;
  }
  selectMultipleOptions(options: string[]) {
    this.getElement(this.selectors.multipleSelect).select(options);
    return this;
  }
  scrollHorizontalButtonIntoView() {
    this.scrollIntoView(this.selectors.horizontalScrollButtons);
    return this;
  }
  scrollVerticalButtonIntoView() {
    this.scrollIntoView(this.selectors.verticalScrollButtons);
    return this;
  }
  scrollBothButtonIntoView() {
    this.scrollIntoView(this.selectors.bothScrollButtons);
    return this;
  }
  scrollToPosition(element: Cypress.Chainable<JQuery<HTMLElement>>, position: string) {
    element.scrollTo(position);
    return this;
  }
  scrollToCoordinates(element: Cypress.Chainable<JQuery<HTMLElement>>, x: number, y: number) {
    element.scrollTo(x, y);
    return this;
  }
  scrollToPercentage(element: Cypress.Chainable<JQuery<HTMLElement>>, xPercent: string, yPercent: string) {
    element.scrollTo(xPercent, yPercent);
    return this;
  }
  setRangeValue(value: number) {
    this.getElement(this.selectors.rangeInput)
      .invoke('val', value)
      .trigger('change');
    return this;
  }

  // ========================================
  // GETTERS FOR ASSERTIONS - Return Chainable for .should()
  // ========================================

  getMultipleCheckboxes() {
    return this.getElement(this.selectors.multipleCheckboxes);
  }
  getDisabledCheckboxes() {
    return this.getElement(this.selectors.disabledCheckboxes);
  }
  getDisabledRadioButtons() {
    return this.getElement(this.selectors.disabledRadioButtons);
  }
  getEnabledActionCheckCheckboxes() {
    return this.getElement(this.selectors.enabledActionCheckCheckboxes);
  }
  getDisabledActionCheckCheckboxes() {
    return this.getElement(this.selectors.disabledActionCheckCheckboxes);
  }
  getEmailField() {
    return this.getElement(this.selectors.emailInput);
  }
  getFocusInput() {
    return this.getElement(this.selectors.focusInput);
  }
  getBlurInput() {
    return this.getElement(this.selectors.blurInput);
  }
  getClearInput() {
    return this.getElement(this.selectors.clearInput);
  }
  getFormSubmitMessage() {
    return this.getElement(this.selectors.formSubmitMessage);
  }
  getDoubleClickInput() {
    return this.getElement(this.selectors.doubleClickInput);
  }
  getRightClickInput() {
    return this.getElement(this.selectors.rightClickInput);
  }
  getAllEnabledCheckboxes() {
    return this.getElement(this.selectors.checkboxesEnabled);
  }
  getAllEnabledRadioButtons() {
    return this.getElement(this.selectors.radioButtonsEnabled);
  }
  getSelectSingleOption() {
    return this.getElement(this.selectors.singleSelect);
  }
  getSelectMultipleOption() {
    return this.getElement(this.selectors.multipleSelect);
  }
  getHorizontalButton() {
    return this.getElement(this.selectors.horizontalScrollButtons);
  }
  getVerticalButton() {
    return this.getElement(this.selectors.verticalScrollButtons);
  }
  getBothButton() {
    return this.getElement(this.selectors.bothScrollButtons);
  }
  getDisabledInput() {
    return this.getElement(this.selectors.disabledInput);
  }
  getRangeValue() {
    return this.getElement(this.selectors.rangeInput);
  }
  getRangeValueText() {
    return this.getElement(this.selectors.rangeInput).siblings('p');
  }
  getScrollableHorizontal() {
    return this.getElement(this.selectors.scrollableHorizontal);
  }
  getScrollableVertical() {
    return this.getElement(this.selectors.scrollableVertical);
  }
  getScrollableBoth() {
    return this.getElement(this.selectors.scrollableBoth);
  }
}

export default ActionsPage;