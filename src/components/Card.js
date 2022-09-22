'use strict'

import {
  selectorsCards
} from "../utils/constants.js";

export class Card {
  constructor(item, selectorTemplate, handleCardClick, handleCardDelete, handleLikeCard, userID) {
    this._item = item;
    this._title = this._item.name;
    this._alt = this._item.name;
    this._src = this._item.link;
    this._idOwner = this._item.idOwner;
    this._idCard = this._item.idCard
    this._likes = this._item.likes;
    this._selectorTemplate = selectorTemplate;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleLikeCard = handleLikeCard;
    this._userId = userID;
  }
  _getTemplate = () => {
    const cardElement = document.querySelector(this._selectorTemplate).content.querySelector(selectorsCards.articleCard).cloneNode(true);
    return cardElement;
  }
  generateCard = () => {
    this._element = this._getTemplate();
    this._buttonLikeCard = this._element.querySelector(selectorsCards.buttonLikeCard);
    this._buttonDeleteCard = this._element.querySelector(selectorsCards.buttonDeleteCard);
    this._counterLike = this._element.querySelector(selectorsCards.counterLike);
    this._imgCard = this._element.querySelector(selectorsCards.imgCard);
    this._element.querySelector(selectorsCards.titleCard).textContent = this._title;
    this._imgCard.alt = this._title;
    this._imgCard.src = this._src;
    this._setEventListeners();
    this._checkIdCard();
    this.setLikes();
    return this._element;
  }

  _checkIdCard = () => {
    if (this._idOwner && (this._idOwner !== this._userId)) {
      this._buttonDeleteCard.classList.add(selectorsCards.buttonDeleteCardInactive)
    }
  }

  setLikes() {
    if (this._likes) {
      this._counterLike.textContent = this._likes.length;
      this._likes.forEach((element) => {
        if (element._id === this._userId) {
          this._buttonLikeCard.classList.add(selectorsCards.buttonLikeActiveCard)
        }
      })
    }
  }

  _setEventListeners = () => {
    this._buttonDeleteCard.addEventListener('click', () => this._handleCardDelete(this._idCard));
    this._buttonLikeCard.addEventListener('click', () => this._handleLike());
    this._imgCard.addEventListener('click', () => this._handleCardClick(this._item));
  }

  _handleLike = () => {
    this._handleLikeCard(this._buttonLikeCard, this._idCard, this._counterLike)
  }
}
