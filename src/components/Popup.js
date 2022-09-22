'use strict'
import {
  selectorsCards,
  selectorsPopup
} from "../utils/constants.js";

export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(`${popupSelector}`);
    this._closeIcon = this._popup.querySelector(selectorsCards.popUpCloseIcons);
  }
  open() {
    this._popup.classList.add(selectorsPopup.popupActive);
    document.addEventListener('keyup', this._handleEscClose);
  }
  close() {
    this._popup.classList.remove(selectorsPopup.popupActive);
    document.removeEventListener('keyup', this._handleEscClose);
  }
  _handleEscClose = (event) => {
    if (event.key === 'Escape') {
      this.close();
    }
  }
  _handleClickIconClose = (event) => {
    if (event.target.classList.contains(selectorsPopup.popup) || event.target.classList.contains(selectorsPopup.popUpCloseIcon)) {
      this.close();
    };

  }
  setEventListeners() {
    this._popup.addEventListener('click', this._handleClickIconClose);
  }
}
