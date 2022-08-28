'use strict'

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
   * @param {string} selectorTemplate cелектор template-элемента;
   * @param {String} name Название места
   * @param {LinkStyle} link Cсылка на картинку места
   * */

  constructor(selectorTemplate, name, link, handleCardClick) {
    this._title = name;
    this._alt = name;
    this._src = link;
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
    this._element.querySelector(selectorsCards.buttonDeleteCard).addEventListener('click', () => this._deleteCardClick());
    this._buttonLikeCard.addEventListener('click', () => this._likeCardClick());
    this._imgCard.addEventListener('click', () => this._handleCardClick(this._title, this._src));
  }

  _deleteCardClick() {
    this._element.remove();
  }

  _likeCardClick() {
    this._buttonLikeCard.classList.toggle(selectorsCards.buttonLikeActiveCard);
  }
}
