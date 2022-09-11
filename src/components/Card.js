'use strict'

import {
  selectorsCards
} from "../utils/constants.js";

export class Card {
  constructor(item, selectorTemplate, handleCardClick) {
    this._item = item;
    this._title = this._item.name;
    this._alt = this._item.name;
    this._src = this._item.link;
    this._selectorTemplate = selectorTemplate;
    this._handleCardClick = handleCardClick;
  }
  _getTemplate = () => {
    const cardElement = document.querySelector(this._selectorTemplate).content.querySelector(selectorsCards.articleCard).cloneNode(true);
    return cardElement;
  }
  generateCard = () => {
    this._element = this._getTemplate();
    this._imgCard = this._element.querySelector(selectorsCards.imgCard);
    this._element.querySelector(selectorsCards.titleCard).textContent = this._title;
    this._imgCard.alt = this._title;
    this._imgCard.src = this._src;
    this._buttonLikeCard = this._element.querySelector(selectorsCards.buttonLikeCard);
    this._setEventListeners();
    return this._element;
  }
  _setEventListeners = () => {
    this._element.querySelector(selectorsCards.buttonDeleteCard).addEventListener('click', () => this._handleCardDelete());
    this._buttonLikeCard.addEventListener('click', () => this._handleLike());
    this._imgCard.addEventListener('click', () => this._handleCardClick(this._item));
  }
  _handleCardDelete = () => {
    this._element.remove();
  }
  _handleLike = () => {
    this._buttonLikeCard.classList.toggle(selectorsCards.buttonLikeActiveCard);
  }
}
