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

const options = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-51',
  headers: {
    authorization: 'd4c4166d-7da1-41e5-9c12-6ada905232af',
    'Content-Type': 'application/json'
  }
}

function createCard(dataCard) {
  const newCard = new Card(dataCard, selectorsCards.templateCard, openImage, handleCardDelete, handleLikeCard, userID)
  return newCard.generateCard();
}

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
    }
  },
  selectorsCards.sectionCards
);

const popupConfirmDelete = new PopupWithConfirmation(selectors.popupConfirm, (idCardDelete) => {
  handleConfirmCardDelete(idCardDelete)
});

const popUpWithImage = new PopupWithImage(selectorsCards.popUpViewCard);

function newPopupWithForm(selectors, popUp, apiMethod) {
  popUp = new PopupWithForm(selectors, (inputValues) => {
    popUp.renderLoading(true);
    dataApi[apiMethod](inputValues)
      .then(() => getDataAllPromise())
      .then(popUp.close())
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        popUp.renderLoading(false);
      });
  });
  return popUp
}
const profilePopUp = newPopupWithForm(selectors.popUpEditProfile, profilePopUp, 'setUserInfoApi');
const avatarPopUp = newPopupWithForm(selectors.popUpAvatar, avatarPopUp, 'setUserAvatarApi');
const addCardPopUp = new PopupWithForm(selectors.popUpAddCard, (data) => {
  addCardPopUp.renderLoading(true);
  const newData = {
    name: data[selectors.cardNameInput],
    link: data[selectors.cardLinkInput]
  };
  dataApi.addCard(newData)
    .then(() => {
      getDataAllPromise()
    })
    .then(() => addCardPopUp.close())
    .finally(() => {
      addCardPopUp.renderLoading(false);
    });
});

function getDataAllPromise() {
  dataApi.getAllPromise()
    .then(([data, dataCards]) => {
      profileInfo.setUserInfo(data);
      profileInfo.setUserAvatar(data);
      userID = data._id;
      cardList.renderItems(dataCards);
    })
    .catch((err) => {
      console.log(err);
    })
}
getDataAllPromise();

function handleLikeCard(button, idCard, counterLike) {
  if (button.classList.contains(selectorsCards.buttonLikeActiveCard)) {
    dataApi.dislikesCard(idCard)
      .then(data => {
        button.classList.remove(selectorsCards.buttonLikeActiveCard);
        counterLike.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  } else {
    dataApi.likesCard(idCard)
      .then(data => {
        button.classList.add(selectorsCards.buttonLikeActiveCard);
        counterLike.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }
}

function handleCardDelete(idCardDelete) {
  popupConfirmDelete.open();
  popupConfirmDelete.setEventListeners(idCardDelete);
}

function handleConfirmCardDelete(idCardDelete) {
  popupConfirmDelete.renderLoading(true);
  dataApi.deleteCard(idCardDelete)
    .then(() => getDataAllPromise())
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
