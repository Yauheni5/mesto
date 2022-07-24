'use strict'
//                   ПЕРЕМЕННЫЕ

const selectorsCards = {
  templateCard: '#template-card',
  articleCard: '.card',
  sectionCards: '.cards',
  imgCard: '.card__image',
  titleCard: '.card__title',
  inputNameCard: '.pop-up__name-new-card',
  inputUrlCard: '.pop-up__url-new-card',
  buttonDeleteCard: '.card__button-delete',
  buttonLikeCard: '.card__button-like',
  buttonAddCard: '.profile__button_add',
  buttonSaveCard: '.pop-up__button-save',
  popUpAddCard: '.pop-up_add-card',
}

const selectorsPopUp = {
  popUp: '.pop-up',
  form: '.pop-up__container',
  popUpViewCard: '.pop-up_view-card',
  popUpViewImg: '.pop-up__view-img',
  popUpCardCloseIcon: '.pop-up__close-icon',
  popUpViewCardTitle: '.pop-up__title-view-img'
}

// Блок который затемняет фон страницы(весь блок модального окна(попап)) в DOM
const popUp = document.querySelector(selectorsPopUp.popUp);
// Кнопка редактирования профиля пользователя
let buttonEditProfile = document.querySelector('.profile__button_edit');

// Кнопка(крестик) закрывающая Попап
let buttonClosePopUpIcon = document.querySelector('.pop-up__close-icon');

// Редакционное поле ввода ИмяФамилия пользователя
let nameInput = document.querySelector('.pop-up__profile-user');

// Редакционное поле ввода должности пользователя
let jobInput = document.querySelector('.pop-up__profile-user-job');

// Кнопка "сохранить" блока Попапа
let buttonSaveEditProfile = document.querySelector('.pop-up__button-save');

// Элемент Профиль пользователя(Имя Фамилия)
let profileUserHtml = document.querySelector('.profile__user');

// Элемент инфо о пользователе
let profileJobUserHtml = document.querySelector('.profile__user-job');

const templateCard = document.querySelector(selectorsCards.templateCard).content.querySelector(selectorsCards.articleCard);
const articleCard = document.querySelector(selectorsCards.articleCard);
let form = document.querySelector(selectorsPopUp.form);
const sectionCards = document.querySelector(selectorsCards.sectionCards);
const buttonAddCard = document.querySelector(selectorsCards.buttonAddCard);
const popUpAddCard = document.querySelector(selectorsCards.popUpAddCard);
const popUpCardCloseIcon = popUpAddCard.querySelector(selectorsPopUp.popUpCardCloseIcon);
const buttonSaveCard = document.querySelector(selectorsCards.buttonSaveCard);
const popUpViewCard = document.querySelector(selectorsPopUp.popUpViewCard);
const popUpViewImg = document.querySelector(selectorsPopUp.popUpViewImg);
const popUpViewCardTitle = document.querySelector(selectorsPopUp.popUpViewCardTitle);

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
function popUpRemove(modal) {
  modal.classList.remove('pop-up_active');
}

/* Активировать попап Редактирование профиля. (Добавление соответсвующего класса) */
function popUpOpenClickEditProfile() {
  if (!(popUp.classList.contains('pop-up_active'))) {
    openPopup(popUp);
    setPopupInputValue();
  }
};

/* Активировать попап Добавление новой карточки. (Добавление соответсвующего класса) */
function popUpOpenClickAddNewCard() {
  if (!(popUpAddCard.classList.contains('pop-up_active'))) {
    openPopup(popUpAddCard);
  }
};

/* Деактивировать попап Редактирование профиля по клику на крестик. Удаление соответствующего класса. */
function popUpCloseClickCloseIcon() {
  if (popUp.classList.contains('pop-up_active')) {
    popUpRemove(popUp);
  }
};

/* Деактивировать попап Добавление новой карточки по клику на крестик. Удаление соответствующего класса. */
function popUpNewCardCloseClickCloseIcon() {
  if (popUpAddCard.classList.contains('pop-up_active')) {
    popUpRemove(popUpAddCard);
  }
};

/* Скрыть попап при клике вне окна самого попапа */
function popUpCloseClickBlackout(event) {
  if (event.target.classList.contains('pop-up') && !event.target.classList.contains('pop-up__container')) {
    popUpCloseClickCloseIcon();
  }
};

// функция которая заполняет поля ввода при открытии попапа
function setPopupInputValue() {
  nameInput.value = profileUserHtml.textContent;
  jobInput.value = profileJobUserHtml.textContent;
}

//функция которая заполняет введенным текстом из полей ввода инпута, в HTML разметку
function setTextInfoFromInput() {
  profileUserHtml.textContent = nameInput.value;
  profileJobUserHtml.textContent = jobInput.value;
}

// функция для редактирования информации о пользователе
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  setTextInfoFromInput();
  popUpRemove(popUp);
}

//Функция переключения соответсвующих классов Карточек при клике по like
function likeCard(event) {
  if (event.target.classList.contains('card__button-like_active')) {
    event.target.classList.remove('card__button-like_active');
  } else {
    event.target.classList.add('card__button-like_active');
  }
};

//добавление-удаление Карточек
function createNewCard(initialCard) {
  const newCard = templateCard.cloneNode(true);
  const imgCard = newCard.querySelector(selectorsCards.imgCard);
  const titleCard = newCard.querySelector(selectorsCards.titleCard);
  const buttonDeleteCard = newCard.querySelector(selectorsCards.buttonDeleteCard);
  const buttonLikeCard = newCard.querySelector(selectorsCards.buttonLikeCard);

  buttonDeleteCard.addEventListener('click', function () {
    newCard.remove();
  });

  buttonLikeCard.addEventListener('click', likeCard);

  imgCard.addEventListener('click', function (evt) {
    evt.preventDefault();
    openPopup(popUpViewCard);
    console.log(popUpViewCard);
    popUpViewImg.src = imgCard.src;
    popUpViewCardTitle.textContent = imgCard.alt;
  })

  imgCard.src = initialCard.link;
  imgCard.alt = initialCard.name;
  titleCard.textContent = initialCard.name;
  sectionCards.prepend(newCard);
}

function inputNewCardFromUser() {
  form = popUpAddCard.querySelector(selectorsPopUp.form);
  const inputNameCard = document.querySelector(selectorsCards.inputNameCard);
  const inputUrlCard = document.querySelector(selectorsCards.inputUrlCard);

  form.addEventListener('submit', function (evt) {

    evt.preventDefault();

    const name = inputNameCard.value
    const link = inputUrlCard.value
    const arrNameLink = {
      name,
      link
    };

    createNewCard(arrNameLink);
    popUpRemove(popUpAddCard);
  });
}
inputNewCardFromUser();

function createInitialCards() {
  initialCards.map(createNewCard);
}
createInitialCards();



// Открывает попап по клику на Редактирование
buttonEditProfile.addEventListener('click', popUpOpenClickEditProfile);

//Открывает попа по клику на Добавить новую карточку
buttonAddCard.addEventListener('click', popUpOpenClickAddNewCard);

// Закрывает попап  по клику на Крестик
buttonClosePopUpIcon.addEventListener('click', popUpCloseClickCloseIcon);
popUpCardCloseIcon.addEventListener('click', popUpNewCardCloseClickCloseIcon);

// Закрывает попап  по клику вне области Модального окна
popUp.addEventListener('click', popUpCloseClickBlackout);

// Заменяет информацию о профиле(согласно полям редактирования в попапе) после нажатия на кнопку Сохранения
popUp.addEventListener('submit', formSubmitHandler);
