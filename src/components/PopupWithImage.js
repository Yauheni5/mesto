'use strict'

import {
  Popup
} from "./Popup.js";
import {
  selectorsCards
} from "../utils/constants.js";

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupImage = this._popup.querySelector(selectorsCards.popUpViewImg);
    this._imageName = this._popup.querySelector(selectorsCards.popUpViewCardTitle);
  }

  open(link, name) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._imageName.textContent = name;
    super.open()
  }
}
