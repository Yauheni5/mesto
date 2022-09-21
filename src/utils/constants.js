'use strict'

import brestImg from '../images/brest.jpg';
import vitebskImg from '../images/vitebsk.jpg';
import homelImg from '../images/gomel.jpg';
import hrodnoImg from '../images/hrodno.jpg';
import mogilevImg from '../images/mogilev.jpg';
import minskImg from '../images/minsk.jpg';

export const initialCards = [{
    name: 'Брест',
    link: brestImg
  },
  {
    name: 'Витебск',
    link: vitebskImg
  },
  {
    name: 'Гомель',
    link: homelImg
  },
  {
    name: 'Гродно',
    link: hrodnoImg
  },
  {
    name: 'Могилев',
    link: mogilevImg
  },
  {
    name: 'Минск',
    link: minskImg
  }
];

export const selectorsUser = {
  name: '.profile__user',
  about: '.profile__user-job',
  avatar: '.profile__avatar',
  avatarWrapper: '.profile__img-wrapper'
}

export const selectors = {
  buttonAddNewCard: '.profile__button_add',
  popUpEditProfile: '.pop-up_edit-profile',
  formEditProfile: '.pop-up__form-edit-profile',
  formAddCard: '.pop-up__form-add-card',
  profileButtonEdit: '.profile__button_edit',
  popUpAddCard: '.pop-up_add-card',
  popUpForm: '.pop-up__form',
  popUpButtonSave: '.pop-up__button-save',
  popUpInput: '.pop-up__input',
  popUpInputUserName: '.pop-up__input_user-name',
  popUpInputUserInfo: '.pop-up__input_user-job',
  userNameInput: 'name-input',
  userInfoInput: 'job-input',
  cardNameInput: 'name-card-input',
  cardLinkInput: 'url-input',
  popUpAvatar: '.pop-up_edit-avatar',
  formAvatarProfile: '.pop-up__form-edit-avatar',
  popupConfirm: '.pop-up_delete-card'
}

export const selectorsPopup = {
  popupActive: 'pop-up_active',
  popup: 'pop-up',
  popUpCloseIcon: 'pop-up__close-icon',
}

export const selectorsCards = {
  templateCard: '#template-card',
  articleCard: '.card',
  sectionCards: '.cards',
  imgCard: '.card__image',
  titleCard: '.card__title',
  buttonDeleteCard: '.card__button-delete',
  buttonDeleteCardInactive: 'card__button-delete_inactive',
  buttonLikeCard: '.card__button-like',
  counterLike: '.card__like-counter',
  buttonLikeActiveCard: 'card__button-like_active',
  formAddCard: '.pop-up__form-add-card',
  popUpViewCard: '.pop-up_view-card',
  popUpViewImg: '.pop-up__view-img',
  popUpViewCardTitle: '.pop-up__title-view-img',
  popUpCloseIcons: '.pop-up__close-icon',
  inputNameCard: '.pop-up__input_card-name',
  inputUrlCard: '.pop-up__input_card-url',
}

export const selectorsValidation = {
  formSelector: '.pop-up__form',
  inputSelector: '.pop-up__input',
  submitButtonSelector: '.pop-up__button',
  inactiveButtonClass: 'pop-up__button_inactive',
  inputErrorClass: 'pop-up__input_type_error',
  errorClass: 'pop-up__error_visible'
}
