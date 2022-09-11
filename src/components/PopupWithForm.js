'use strict'

import {
  Popup
} from "./Popup.js";
import {
  selectors
} from "../utils/constants.js";

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
      this._formValues[input.name] = input.value;

    });
    return this._formValues;
  }
  setInputValues(values) {
    this._inputList.forEach((input) => {
      // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
      input.value = values[input.name];
    });
  }
  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.submitHandler(this._getInputValues());
    });
  }
}
