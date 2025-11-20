import BasePage from '../BasePage.js';

/**
 * Page Object for the Actions Demo Page
 * URL: https://example.cypress.io/commands/actions
 */
class ActionsPage extends BasePage {
  constructor() {
    super();
    this.url = 'https://example.cypress.io/commands/actions';
  }
//NEEDS SOME CLEANING UP TO BE HONEST, BUT WORKS
  // Selectors
  get selectors() {
    return {
      // Type action elements
      emailInput: '.action-email',
      disabledInput: '.action-disabled',
      
      // Focus/Blur elements
      focusInput: '.action-focus',
      blurInput: '.action-blur',
      
      // Clear element
      clearInput: '.action-clear',
      
      // Form elements
      actionForm: '.action-form',
      formTextInput: '.action-form [type="text"]',
      formSubmitMessage: '.action-form + p',
      
      // Click elements
      actionButton: '.action-btn',
      actionCanvas: '#action-canvas',
      actionLabels: '.action-labels > .label',
      opacityButton: '.action-opacity > .btn',
      
      // Double click elements
      doubleClickDiv: '.action-div',
      doubleClickInput: '.action-input-hidden',
      
      // Right click elements
      rightClickDiv: '.rightclick-action-div',
      rightClickInput: '.rightclick-action-input-hidden',
      
      // Checkbox elements
      checkboxesEnabled: '.action-checkboxes [type="checkbox"]:not([disabled])',
      disabledCheckboxes: '.action-checkboxes [disabled]',
      enabledActionCheckCheckboxes: '.action-check [type="checkbox"]:not([disabled])',
      disabledActionCheckCheckboxes: '.action-check [type="checkbox"][disabled]',
      allActionCheckCheckboxes: '.action-check [type="checkbox"]',
      multipleCheckboxes: '.action-multiple-checkboxes [type="checkbox"]',
      
      // Radio button elements
      radioButtonsEnabled: '.action-radios [type="radio"]:not([disabled])',
      disabledRadioButtons: '.action-radios [disabled]',
      
      // Select elements
      singleSelect: '.action-select',
      multipleSelect: '.action-select-multiple',
      
      // Scroll elements
      horizontalScrollButtons: '#scroll-horizontal button',
      verticalScrollButtons: '#scroll-vertical button',
      bothScrollButtons: '#scroll-both button',
      scrollableHorizontal: '#scrollable-horizontal',
      scrollableVertical: '#scrollable-vertical',
      scrollableBoth: '#scrollable-both',
      
      // Trigger elements
      rangeInput: '.trigger-input-range'
    };
  }

  // Navigation
  visitActionsPage() {
    return this.visit();
  }

  getEmailField() {
    return this.getElement(this.selectors.emailInput);
  }
  
  // Type Actions
  typeInEmailField(text, options = {}) {
    this.typeText(this.selectors.emailInput, text, options);
    return this;
  }

  typeInDisabledField(text) {
    this.getElement(this.selectors.disabledInput).type(text, { force: true });
    return this;
  }

  typeSpecialKeys(keys) {
    this.getElement(this.selectors.emailInput).type(keys);
    return this;
  }

  // Focus/Blur Actions
  getFocusInput() {
    return this.getElement(this.selectors.focusInput);
  }

  focusFieldWithFocusClass() {
    this.getElement(this.selectors.focusInput).focus();
    return this;
  }

  getBlurInput() {
    return this.getElement(this.selectors.blurInput);
  }

  blurFieldWithBlurClass() {
    this.getBlurInput().blur();
    return this;
  }

  // Clear Actions
  getClearInput() {
    return this.getElement(this.selectors.clearInput);
  }
  clearField() {
    this.getClearInput().clear();
    return this;
  }

  // Form Actions
  submitForm(couponCode = 'HALFOFF') {
    this.typeText(this.selectors.formTextInput, couponCode);
    this.getElement(this.selectors.actionForm).submit();
    return this;
  }
  getFormSubmitMessage() {
    return this.getElement(this.selectors.formSubmitMessage);
  }

  // Click Actions
  clickActionButton() {
    this.clickElement(this.selectors.actionButton);
    return this;
  }

  clickCanvas(position = 'center') {
    this.getElement(this.selectors.actionCanvas).click(position);
    return this;
  }

  clickCanvasCoordinates(x, y) {
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

  // Double Click Actions
  doubleClickDiv() {
    this.getElement(this.selectors.doubleClickDiv).dblclick();
    return this;
  }
  getDoubleClickInput() {
    return this.getElement(this.selectors.doubleClickInput);
  }

  // Right Click Actions
  rightClickDiv() {
    this.getElement(this.selectors.rightClickDiv).rightclick();
    return this;
  }
  getRightClickInput() {
    return this.getElement(this.selectors.rightClickInput);
  }

  // Checkbox Actions
  checkAllEnabledCheckboxes() {
    this.checkElement(this.selectors.checkboxesEnabled);
    return this;
  }
  getAllEnabledCheckboxes() {
    return this.getElement(this.selectors.checkboxesEnabled);
  }
  getAllEnabledRadioButtons() {
    return this.getElement(this.selectors.radioButtonsEnabled);
  }

  checkDisabledCheckbox() {
    this.getElement(this.selectors.disabledCheckboxes).check({ force: true });
    return this;
  }

  uncheckAllCheckboxes() {
    this.uncheckElement(this.selectors.enabledActionCheckCheckboxes);
    return this;
  }

  checkSpecificCheckboxes(values) {
    this.getElement(this.selectors.multipleCheckboxes).check(values);
    return this;
  }

  uncheckSpecificCheckboxes(values) {
    this.getElement(this.selectors.multipleCheckboxes).uncheck(values);
    return this;
  }

  // Radio Button Actions
  checkAllEnabledRadioButtons() {
    this.checkElement(this.selectors.radioButtonsEnabled);
    return this;
  }

  checkSpecificRadioButton(value) {
    this.getElement(this.selectors.radioButtonsEnabled).check(value);
    return this;
  }

  // Select Actions
  selectSingleOption(option) {
    this.selectOption(this.selectors.singleSelect, option);
    return this;
  }
  getSelectSingleOption() {
    return this.getElement(this.selectors.singleSelect);
  }

  selectMultipleOptions(options) {
    this.getElement(this.selectors.multipleSelect).select(options);
    return this;
  }
  getSelectMultipleOption() {
    return this.getElement(this.selectors.multipleSelect);
  }

  // Scroll Actions
  scrollHorizontalButtonIntoView() {
    this.scrollIntoView(this.selectors.horizontalScrollButtons);
    return this;
  }
  getHorizontalButton() {
    return this.getElement(this.selectors.horizontalScrollButtons);
  }

  scrollVerticalButtonIntoView() {
    this.scrollIntoView(this.selectors.verticalScrollButtons);
    return this;
  }
  getVerticalButton() {
    return this.getElement(this.selectors.verticalScrollButtons);
  }

  scrollBothButtonIntoView() {
    this.scrollIntoView(this.selectors.bothScrollButtons);
    return this;
  }
  getBothButton() {
    return this.getElement(this.selectors.bothScrollButtons);
  }

  scrollToPosition(element, position) {
    this.getElement(element).scrollTo(position);
    return this;
  }

  scrollToCoordinates(element, x, y) {
    this.getElement(element).scrollTo(x, y);
    return this;
  }

  scrollToPercentage(element, xPercent, yPercent) {
    this.getElement(element).scrollTo(xPercent, yPercent);
    return this;
  }

  getDisabledInput() {
    return this.getElement(this.selectors.disabledInput);
  }

  // Trigger Actions
  setRangeValue(value) {
    this.getElement(this.selectors.rangeInput)
      .invoke('val', value)
      .trigger('change');
    return this;
  }
  getRangeValue() {
    return this.getElement(this.selectors.rangeInput);
  }
  getRangeValueText() {
    return this.getElement(this.selectors.rangeInput).siblings('p');
  }
}

export default ActionsPage;