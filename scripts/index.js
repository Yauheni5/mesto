'use strict'
import {
  selectorsCards,
  Card
} from "./cards.js";

import {
  FormValidator,
  selectorsValidation
} from "./validate.js";

import {
  initialCards
}
from "./constants.js";
//                   ПЕРЕМЕННЫЕ


const selectorsPopUp = {
  popUp: '.pop-up',
  popUpActive: 'pop-up_active',
  popUpAddCard: '.pop-up_add-card',
  buttonAddCard: '.profile__button_add',
  popUpButtonSave: '.pop-up__button-save'
}

const selectorsPopUpProfile = {
  profilePopUp: '.pop-up_edit-profile',
  formEditProfile: '.pop-up__form-edit-profile',
  buttonEditProfile: '.profile__button_edit',
  nameUser: '.profile__user',
  jobUser: '.profile__user-job',
}

const selectorsPopUpAddNewCard = {
  buttonAddNewCard: '.profile__button_add',
}

const selectorsInput = {
  inputNameUser: '.pop-up__input_user-name',
  inputJobUser: '.pop-up__input_user-job',

}

const popUp = document.querySelectorAll(selectorsPopUp.popUp);

const buttonAddCard = document.querySelector(selectorsPopUp.buttonAddCard);
const popUpAddCard = document.querySelector(selectorsPopUp.popUpAddCard);

const profilePopUp = document.querySelector(selectorsPopUpProfile.profilePopUp);
const buttonEditProfile = document.querySelector(selectorsPopUpProfile.buttonEditProfile);
const inputNameUser = document.querySelector(selectorsInput.inputNameUser);
const inputJobUser = document.querySelector(selectorsInput.inputJobUser);
const nameUser = document.querySelector(selectorsPopUpProfile.nameUser);
const jobUser = document.querySelector(selectorsPopUpProfile.jobUser);

const popUpButtonSave = document.querySelector(selectorsPopUp.popUpButtonSave);
const formAddCard = document.querySelector(selectorsCards.formAddCard);
const formEditProfile = document.querySelector(selectorsPopUpProfile.formEditProfile);
const formValidatorCard = new FormValidator(formAddCard, selectorsValidation);
const formValidatorProfile = new FormValidator(formEditProfile, selectorsValidation);
//                    ФУНКЦИИ



/* ОТкрытие попапа */
function openPopup(modal) {
  modal.classList.add(selectorsPopUp.popUpActive);
  document.addEventListener('keyup', closePopUpPressKeyEsc);
};


/* Удаление попапа */
function removePopUp(modal) {
  modal.classList.remove(selectorsPopUp.popUpActive);
  document.removeEventListener('keyup', closePopUpPressKeyEsc);
};

/* Активировать попап Редактирование профиля. (Добавление соответсвующего класса) */
function clickEditProfileOpenPopUp() {
  openPopup(profilePopUp);
  setPopupInputValue();
  formValidatorProfile.enableValidation();
};

/* Активировать попап Добавление новой карточки. (Добавление соответсвующего класса) */
function clickAddNewCardOpenPopUp() {
  openPopup(popUpAddCard);
  formValidatorCard.enableValidation();
};

// функция которая заполняет поля ввода при открытии попапа
function setPopupInputValue() {
  inputNameUser.value = nameUser.textContent;
  inputJobUser.value = jobUser.textContent;
}

//функция которая заполняет введенным текстом из полей ввода инпута, в HTML разметку
function setTextInfoFromInput() {
  nameUser.textContent = inputNameUser.value;
  jobUser.textContent = inputJobUser.value;
}

// функция для редактирования информации о пользователе
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  setTextInfoFromInput();
  removePopUp(profilePopUp);
}

//Функиця закрытия Попапа по ESC
export const closePopUpPressKeyEsc = function (event) {
  if (event.key === 'Escape') {
    removePopUp(document.querySelector(`.${selectorsPopUp.popUpActive}`));
    document.removeEventListener('keyup', closePopUpPressKeyEsc);
  }
}

//Функиця закрытия Попапа по клику вне области попапа
function closePopupClickOverlay(event) {
  if (event.target.classList.contains('pop-up') || event.target.classList.contains('pop-up__close-icon')) {
    removePopUp(event.currentTarget);
  };
}

// Открывает попап по клику на Редактирование
buttonEditProfile.addEventListener('click', clickEditProfileOpenPopUp);

//Открывает попа по клику на Добавить новую карточку
buttonAddCard.addEventListener('click', clickAddNewCardOpenPopUp);

// Заменяет информацию о профиле(согласно полям редактирования в попапе) после нажатия на кнопку Сохранения
profilePopUp.addEventListener('submit', handleProfileFormSubmit);

// Закрывает активный попап по клику вне области попапа и по кнопке Esc

popUp.forEach((item) => {
  item.addEventListener('click', closePopupClickOverlay);
});


initialCards.forEach((item) => {
  const card = new Card(selectorsCards.templateCard, item.name, item.link);
  const newCard = card.generateCard();

  document.querySelector(selectorsCards.sectionCards).append(newCard);
})

popUpAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const card = new Card(selectorsCards.templateCard);
  const newCard = card._addNewCardFromUser();

  document.querySelector(selectorsCards.sectionCards).prepend(newCard);
})
