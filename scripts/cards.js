'use strict'
import {
  closePopUpPressKeyEsc
} from './index.js';

const selectorsCards = {
  templateCard: '#template-card',
  articleCard: '.card',
  sectionCards: '.cards',
  imgCard: '.card__image',
  titleCard: '.card__title',
  buttonDeleteCard: '.card__button-delete',
  buttonLikeCard: '.card__button-like',
  buttonLikeActiveCard: 'card__button-like_active',
  formAddCard: '.pop-up__form-add-card',
  popUpViewCard: '.pop-up_view-card',
  popUpViewImg: '.pop-up__view-img',
  popUpViewCardTitle: '.pop-up__title-view-img',
  popUpCloseIcons: '.pop-up__close-icon',
  inputNameCard: '.pop-up__input_card-name',
  inputUrlCard: '.pop-up__input_card-url',
}
export {
  selectorsCards
};


export class Card {
  /**
   * Класс Карточка
   * @param {String} name Название места
   * @param {LinkStyle} link Cсылка на картинку места
   * */

  constructor(selectorTemplate, name, link) {
    this._title = name;
    this._alt = name;
    this._src = link;
    this._selectorTemplate = selectorTemplate;
  }

  _getTemplate = () => {
    const cardElement = document.querySelector(this._selectorTemplate).content.querySelector(selectorsCards.articleCard).cloneNode(true);
    return cardElement;
  }

  generateCard = () => {
    this._element = this._getTemplate();
    this._element.querySelector(selectorsCards.titleCard).textContent = this._title;
    this._element.querySelector(selectorsCards.imgCard).alt = this._title;
    this._element.querySelector(selectorsCards.imgCard).src = this._src;
    this._setEventListeners();
    return this._element;
  }

  _addNewCardFromUser = () => {
    this._title = document.querySelector(selectorsCards.inputNameCard).value;;
    this._src = document.querySelector(selectorsCards.inputUrlCard).value;;
    this.generateCard();
    document.querySelector('.pop-up_active').remove();
    return this._element;
  }

  _setEventListeners = () => {
    this._element.querySelector(selectorsCards.buttonDeleteCard).addEventListener('click', () => this._deleteCardClick());
    this._element.querySelector(selectorsCards.buttonLikeCard).addEventListener('click', () => this._likeCardClick());
    this._element.querySelector(selectorsCards.imgCard).addEventListener('click', () => this._viewCard());
  }

  _viewCard = () => {
    document.querySelector(selectorsCards.popUpViewCard).classList.add('pop-up_active');
    document.querySelector(selectorsCards.popUpViewCard).src = this._src;
    document.querySelector(selectorsCards.popUpViewCardTitle).textContent = this._title;
    document.querySelector(selectorsCards.popUpViewImg).alt = this._alt;
    document.addEventListener('keyup', closePopUpPressKeyEsc);
  }

  _deleteCardClick() {
    this._element.remove();
  }

  _likeCardClick() {
    this._element.querySelector(selectorsCards.buttonLikeCard).classList.toggle(selectorsCards.buttonLikeActiveCard);
  }
}
