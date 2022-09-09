'use strict'

import {
  Popup
} from "./Popup.js";
import {
  selectors
} from "./constants.js";

export class PopupWithForm extends Popup {
  constructor(selectorName, submitHandler) {
    super(selectorName);
    this.submitHandler = submitHandler;
    this.form = this._popup.querySelector(selectors.popUpForm);
    this._inputList = this._popup.querySelectorAll(selectors.popUpInput);
    this._inputName = this._popup.querySelector(selectors.popUpInputUserName);
    this._inputUserInfo = this._popup.querySelector(selectors.popUpInputUserInfo);
  }
  close() {
    this.form.reset();
    super.close();
  }
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      //this._formValues[input.name] = input.value;
      this._formValues[input.name] = input.value;

    });
    return this._formValues;
  }
  _setInputValues(values) {
    this._inputName.value = values.name;
    this._inputUserInfo.value = values.about;
  }
  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.submitHandler(this._getInputValues());
    });
  }
}
