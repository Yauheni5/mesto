import {
  selectors,
  selectorsCards,
  selectorsUser,
  selectorsValidation
} from '../utils/constants.js';
import {
  Api
} from '../components/Api.js';
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
import {
  PopupWithConfirmation
} from '../components/PopupWithConfirmation.js';

import './index.css';

const userAvatar = document.querySelector(selectorsUser.avatarWrapper);
const profileButtonEdit = document.querySelector(selectors.profileButtonEdit);
const buttonAddNewCard = document.querySelector(selectors.buttonAddNewCard);
const formEditProfile = document.querySelector(selectors.formEditProfile);
const formAddCard = document.querySelector(selectors.formAddCard);
const formEditAvatar = document.querySelector(selectors.formAvatarProfile);

const options = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-51',
  headers: {
    authorization: 'd4c4166d-7da1-41e5-9c12-6ada905232af',
    'Content-Type': 'application/json'
  }
}

let userID = null;

const profileValidator = new FormValidator(formEditProfile, selectorsValidation);
profileValidator.enableValidation();

const cardValidator = new FormValidator(formAddCard, selectorsValidation);
cardValidator.enableValidation();

const avatarProfileValidator = new FormValidator(formEditAvatar, selectorsValidation);
avatarProfileValidator.enableValidation();

const profileInfo = new UserInfo({
  selectorsUser
});

const dataApi = new Api(options);

const cardList = new Section({
  renderer: (item) => {
    const newCardApi = createCard({
      name: item.name,
      link: item.link,
      idOwner: item.owner._id,
      idCard: item._id,
      likes: item.likes
    });
    cardList.addItem(newCardApi);
  },
  containerSelector: selectorsCards.sectionCards
});

function createCard(dataCard) {
  const newCard = new Card({
    item: dataCard,
    selectorTemplate: selectorsCards.templateCard,
    handleCardClick: openImage,
    handleCardDelete: handleCardDelete,
    handleLikeCard: handleLikeCard,
    userID: userID
  })
  return newCard.generateCard();
}

const popupConfirmDelete = new PopupWithConfirmation(selectors.popupConfirm, (cardData) => {
  handleConfirmCardDelete(cardData)
});

const popUpWithImage = new PopupWithImage(selectorsCards.popUpViewCard);

function getPopupWithForm(selectors, popUp, apiMethod, userMethod) {
  return popUp = new PopupWithForm(selectors, (inputValues) => {
    popUp.renderLoading(true);
    dataApi[apiMethod](inputValues)
      .then((data) => {
        profileInfo[userMethod](data);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        popUp.close();
        popUp.renderLoading(false);
      });
  });
}
const profilePopUp = getPopupWithForm(selectors.popUpEditProfile, profilePopUp, 'setUserInfoApi', 'setUserInfo');
const avatarPopUp = getPopupWithForm(selectors.popUpAvatar, avatarPopUp, 'setUserAvatarApi', 'setUserInfo');
const addCardPopUp = new PopupWithForm(selectors.popUpAddCard, (data) => {
  addCardPopUp.renderLoading(true);
  const newData = {
    name: data[selectors.cardNameInput],
    link: data[selectors.cardLinkInput]
  };
  dataApi.addCard(newData)
    .then((res) => {
      cardList.prependItem(createCard(res));
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      addCardPopUp.close()
      addCardPopUp.renderLoading(false);
    });
});

function handleLikeCard(cardData) {

  dataApi.handleToggleLikeApi(cardData)
    .then(data => {
      cardData.setLike(data);
    })
    .catch((err) => {
      console.log(err);
    })
}

function handleCardDelete(card) {
  popupConfirmDelete.open();
  popupConfirmDelete.setEventListeners(card);
}

function handleConfirmCardDelete(card) {
  popupConfirmDelete.renderLoading(true);
  dataApi.deleteCard(card._item.id || card._item._id)
    .then(() => card.deleteCard())
    .finally(() => {
      popupConfirmDelete.close();
      popupConfirmDelete.renderLoading(false)
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
}

function openImage(item) {
  popUpWithImage.open(item.link, item.name);
}

function getDataAllPromise() {
  dataApi.getAllPromise()
    .then(([data, dataCards]) => {
      profileInfo.setUserInfo(data);
      userID = data._id;
      cardList.renderItems(dataCards);
    })
    .catch((err) => {
      console.log(err);
    })
}
getDataAllPromise();

buttonAddNewCard.addEventListener('click', () => {
  addCardPopUp.open();
  cardValidator.resetValidation();
});

profileButtonEdit.addEventListener('click', () => {
  const userInfo = profileInfo.getUserInfo();
  profilePopUp.setInputValues(userInfo);
  profileValidator.resetValidation();
  profilePopUp.open();
});

userAvatar.addEventListener('click', () => {
  avatarPopUp.open();
  avatarProfileValidator.resetValidation()
})
avatarPopUp.setEventListeners();
addCardPopUp.setEventListeners();
profilePopUp.setEventListeners();
popupConfirmDelete.setEventListeners();
popUpWithImage.setEventListeners();
