import {
  selectors,
  initialCards,
  selectorsCards,
  selectorsUser,
  selectorsValidation
} from '../utils/constants.js';
import {
  Card
} from '../components/Card.js';
import {
  PopupWithForm
} from '../components/PopupWithForm.js';
import {
  PopupWithImage
} from '../components/PopupWithImage.js';
import {
  Section
} from '../components/Section.js';
import {
  UserInfo
} from '../components/UserInfo.js';
import {
  FormValidator
} from '../components/FormValidator.js';
import './index.css';

const profileButtonEdit = document.querySelector(selectors.profileButtonEdit)
const buttonAddNewCard = document.querySelector(selectors.buttonAddNewCard);
const formEditProfile = document.querySelector(selectors.formEditProfile);
const formAddCard = document.querySelector(selectors.formAddCard);
const profileValidator = new FormValidator(formEditProfile, selectorsValidation);
profileValidator.enableValidation();
const cardValidator = new FormValidator(formAddCard, selectorsValidation);
cardValidator.enableValidation();

function createCard(item) {
  const newCard = new Card(item, selectorsCards.templateCard, openImage);
  return newCard.generateCard();
}

const cardsList = new Section({
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      cardsList.addItem(card);
    }
  },
  selectorsCards.sectionCards
);
cardsList.renderItems();

const addCardPopUp = new PopupWithForm(selectors.popUpAddCard, (data) => {
  const card = createCard({
    name: data[selectors.cardNameInput],
    link: data[selectors.cardLinkInput]
  });
  cardsList.prependItem(card);
  addCardPopUp.close();
});
addCardPopUp.setEventListeners();

buttonAddNewCard.addEventListener('click', () => {
  addCardPopUp.open();
  cardValidator.resetValidation();
});

function openImage(item) {
  popUpWithImage.open(item.link, item.name);
}

const popUpWithImage = new PopupWithImage(selectorsCards.popUpViewCard);
popUpWithImage.setEventListeners();

const profileInfo = new UserInfo({
  selectorsUser
});
const profilePopUp = new PopupWithForm(selectors.popUpEditProfile, (inputValues) => {
  profileInfo.setUserInfo(inputValues);
  profilePopUp.close();
});
profilePopUp.setEventListeners();

profileButtonEdit.addEventListener('click', () => {
  profilePopUp.open();
  const userInfo = profileInfo.getUserInfo();
  profilePopUp.setInputValues(userInfo);
  profileValidator.resetValidation();
});
