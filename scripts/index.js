'use strict'
//                   ПЕРЕМЕННЫЕ

const selectorsCards = {
  templateCard: '#template-card',
  articleCard: '.card',
  sectionCards: '.cards',
  imgCard: '.card__image',
  titleCard: '.card__title',
  buttonDeleteCard: '.card__button-delete',
  buttonLikeCard: '.card__button-like',
  buttonAddCard: '.profile__button_add',
  popUpAddCard: '.pop-up_add-card',
  formAddCard: '.pop-up__form-add-card',
}

const selectorsPopUp = {
  popUp: '.pop-up',
  popUpViewCard: '.pop-up_view-card',
  popUpViewImg: '.pop-up__view-img',
  popUpViewCardTitle: '.pop-up__title-view-img',
  popUpCloseIcons: '.pop-up__close-icon'
}

const selectorsPopUpProfile = {
  profilePopUp: '.pop-up_edit-profile',
  buttonEditProfile: '.profile__button_edit',
}

const selectorsPopUpAddNewCard = {
  buttonAddNewCard: '.profile__button_add',
}

const selectorsInput = {
  inputNameUser: '.pop-up__profile-user',
  inputJobUser: '.pop-up__profile-user-job',
  inputNameCard: '.pop-up__name-new-card',
  inputUrlCard: '.pop-up__url-new-card',
}

const selectorsGeneral = {
  nameUser: '.profile__user',
  jobUser: '.profile__user-job',
}

const templateCard = document.querySelector(selectorsCards.templateCard).content.querySelector(selectorsCards.articleCard);
const articleCard = document.querySelector(selectorsCards.articleCard);
const formAddCard = document.querySelector(selectorsCards.formAddCard);
const sectionCards = document.querySelector(selectorsCards.sectionCards);
const buttonAddCard = document.querySelector(selectorsCards.buttonAddCard);
const popUpAddCard = document.querySelector(selectorsCards.popUpAddCard);
const popUpViewCard = document.querySelector(selectorsPopUp.popUpViewCard);
const popUpViewImg = document.querySelector(selectorsPopUp.popUpViewImg);
const popUpViewCardTitle = document.querySelector(selectorsPopUp.popUpViewCardTitle);
const popUpCloseIcons = document.querySelectorAll(selectorsPopUp.popUpCloseIcons);
const profilePopUp = document.querySelector(selectorsPopUpProfile.profilePopUp);
const buttonEditProfile = document.querySelector(selectorsPopUpProfile.buttonEditProfile);
const inputNameUser = document.querySelector(selectorsInput.inputNameUser);
const inputJobUser = document.querySelector(selectorsInput.inputJobUser);
const nameUser = document.querySelector(selectorsGeneral.nameUser);
const jobUser = document.querySelector(selectorsGeneral.jobUser);


const initialCards = [{
    name: 'Брест',
    link: './images/brest.jpg'
  },
  {
    name: 'Витебск',
    link: './images/vitebsk.jpg'
  },
  {
    name: 'Гомель',
    link: './images/gomel.jpg'
  },
  {
    name: 'Гродно',
    link: './images/hrodno.jpg'
  },
  {
    name: 'Могилев',
    link: './images/mogilev.jpg'
  },
  {
    name: 'Минск',
    link: './images/minsk.jpg'
  }
];

//                    ФУНКЦИИ


/* ОТкрытие попапа */
function openPopup(modal) {
  modal.classList.add('pop-up_active');
}

/* Удаление попапа */
function removePopUp(modal) {
  modal.classList.remove('pop-up_active');
}

/* Активировать попап Редактирование профиля. (Добавление соответсвующего класса) */
function clickEditProfileOpenPopUp() {
  openPopup(profilePopUp);
  setPopupInputValue();
};

/* Активировать попап Добавление новой карточки. (Добавление соответсвующего класса) */
function clickAddNewCardOpenPopUp() {
  openPopup(popUpAddCard);
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

//Функция переключения соответсвующих классов Карточек при клике по like
function clickLikeCard(event) {
  event.target.classList.toggle('card__button-like_active');
};

//функция обработки массива заготовленных карточек
function createInitialCards() {
  initialCards.map(createNewCard);
}
createInitialCards();

//Функция для обработки карточки
function createCard(item) {
  const cardElement = templateCard.cloneNode(true);
  const imgCard = cardElement.querySelector(selectorsCards.imgCard);
  const titleCard = cardElement.querySelector(selectorsCards.titleCard);
  const buttonDeleteCard = cardElement.querySelector(selectorsCards.buttonDeleteCard);
  const buttonLikeCard = cardElement.querySelector(selectorsCards.buttonLikeCard);

  buttonDeleteCard.addEventListener('click', function () {
    cardElement.remove();
  });

  buttonLikeCard.addEventListener('click', clickLikeCard);

  imgCard.addEventListener('click', function (evt) {
    evt.preventDefault();
    openPopup(popUpViewCard);
    popUpViewImg.src = imgCard.src;
    popUpViewCardTitle.textContent = imgCard.alt;
    popUpViewImg.alt = imgCard.alt;
  })

  imgCard.src = item.link;
  imgCard.alt = item.name;
  titleCard.textContent = item.name;
  return cardElement;
}

//добавление карточки
function createNewCard(item) {
  const newCard = createCard(item);
  sectionCards.prepend(newCard);
}

//добавление карточки от пользователя
function inputNewCardFromUser() {
  const inputNameCard = document.querySelector(selectorsInput.inputNameCard);
  const inputUrlCard = document.querySelector(selectorsInput.inputUrlCard);

  formAddCard.addEventListener('submit', function (evt) {

    evt.preventDefault();

    const name = inputNameCard.value;
    const link = inputUrlCard.value;
    const arrNameLink = {
      name,
      link
    };
    evt.target.reset()
    createNewCard(arrNameLink);
    removePopUp(popUpAddCard);
  });
}
inputNewCardFromUser();


//Выборка всех кнопок Закрытия попапов
function clickCloseIconPopup(button) {
  const popUpActive = button.closest(selectorsPopUp.popUp);
  button.addEventListener('click', (evt) => {
    evt.preventDefault();
    removePopUp(popUpActive);
  });
}

// Открывает попап по клику на Редактирование
buttonEditProfile.addEventListener('click', clickEditProfileOpenPopUp);

//Открывает попа по клику на Добавить новую карточку
buttonAddCard.addEventListener('click', clickAddNewCardOpenPopUp);

// Закрывает попап  по клику на Крестик
popUpCloseIcons.forEach(clickCloseIconPopup);

// Заменяет информацию о профиле(согласно полям редактирования в попапе) после нажатия на кнопку Сохранения
profilePopUp.addEventListener('submit', handleProfileFormSubmit);
