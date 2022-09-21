import {
  selectors,
  initialCards,
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

const profileValidator = new FormValidator(formEditProfile, selectorsValidation);
profileValidator.enableValidation();

const cardValidator = new FormValidator(formAddCard, selectorsValidation);
cardValidator.enableValidation();

const avatarProfileValidator = new FormValidator(formEditAvatar, selectorsValidation);
avatarProfileValidator.enableValidation();

const profileInfo = new UserInfo({
  selectorsUser
});

const option = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-51',
  headers: {
    authorization: 'd4c4166d-7da1-41e5-9c12-6ada905232af',
    'Content-Type': 'application/json'
  }
}
let userID = null;
const dataApi = new Api(option)
dataApi.getUserInfoApi()
  .then(data => {
    profileInfo.setUserInfo(data);
    profileInfo.setUserAvatar(data);
    userID = data._id;
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });


function createCard(item) {
  const newCard = new Card(item, selectorsCards.templateCard, openImage, handleCardDelete, dataApi, userID)
  return newCard.generateCard();
}

let closeElement = {};

function handleCardDelete(element, idCardDelete) {
  popupConfirmDelete.open();
  popupConfirmDelete.setEventListeners();
  closeElement.element = element;
  closeElement.idCardDelete = idCardDelete;
  return closeElement
}

/* const popupConfirmDelete = new PopupWithForm(selectors.popupConfirm, () => {
  popupConfirmDelete.renderLoading(true);
  dataApi.deleteCard(closeElement.idCardDelete)
    .finally(() => popupConfirmDelete.renderLoading(false))
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  popupConfirmDelete.close();
  closeElement.element.remove();
}); */

const popupConfirmDelete = new PopupWithConfirmation(selectors.popupConfirm, () => {
  popupConfirmDelete.renderLoading(true);
  dataApi.deleteCard(closeElement.idCardDelete)
    .finally(() => popupConfirmDelete.renderLoading(false))
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  popupConfirmDelete.close();
  closeElement.element.remove();
});

const cardsList = new Section({
  items: createCard,
  renderer: (item) => createCard(item)
}, selectorsCards.sectionCards)

const addCardPopUp = new PopupWithForm(selectors.popUpAddCard, (data) => {
  addCardPopUp.renderLoading(true);
  const newData = {
    name: data[selectors.cardNameInput],
    link: data[selectors.cardLinkInput]
  };
  const card = createCard(newData);
  dataApi.addCard(newData)
    .finally(() => addCardPopUp.renderLoading(false));
  addCardPopUp.close();
  cardsList.prependItem(card);
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

const profilePopUp = new PopupWithForm(selectors.popUpEditProfile, (inputValues) => {
  profilePopUp.renderLoading(true);
  dataApi.setUserInfoApi(inputValues)
    .finally(() => profilePopUp.renderLoading(false));
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

const avatarPopUp = new PopupWithForm(selectors.popUpAvatar, (inputValues) => {
  avatarPopUp.renderLoading(true)
  dataApi.setUserAvatarApi(inputValues)
    .finally(() => popupConfirmDelete.renderLoading(false))
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
  profileInfo.setUserAvatar(inputValues);
  avatarPopUp.close();
});

userAvatar.addEventListener('click', () => {
  avatarPopUp.open();
  avatarProfileValidator.resetValidation()
})
avatarPopUp.setEventListeners();

dataApi.getInitialCards()
  .then(cards => {
    const cardsListFromApi = new Section({
        items: cards,
        renderer: (item) => {
          const newCardApi = createCard({
            name: item.name,
            link: item.link,
            idOwner: item.owner._id,
            idCard: item._id,
            likes: item.likes
          });
          cardsListFromApi.addItem(newCardApi);
        }
      },
      selectorsCards.sectionCards
    );
    cardsListFromApi.renderItems(cards);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });
