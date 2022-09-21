'use strict'

import {
  Popup
} from "./Popup.js";
import {
  selectors
} from "../utils/constants.js";

export class PopupWithConfirmation extends Popup {
  constructor(selectorName, submitHandler) {
    super(selectorName);
    this.form = this._popup.querySelector(selectors.popUpForm);
    this._popUpButtonSave = this._popup.querySelector(selectors.popUpButtonSave);
    this._popUpButtonTextContent = this._popUpButtonSave.textContent;
    this.submitHandler = submitHandler
  }
  renderLoading(isLoading) {
    if (isLoading) {
      this._popUpButtonSave.textContent = 'Сохранение...';
    } else {
      this._popUpButtonSave.textContent = this._popUpButtonTextContent;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.submitHandler();
    });
  }

}
