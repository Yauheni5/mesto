'use strict'
//                   ПЕРЕМЕННЫЕ


// Блок который затемняет фон страницы(весь блок модального окна(попап)) в DOM
let popUp = document.querySelector('.pop-up');

// Попап контейнер(модальное окно)
let modal = document.querySelector('.pop-up__container');

// Кнопка редактирования профиля пользователя
let buttonEditProfile = document.querySelector('.profile__button_edit');

// Кнопка(крестик) закрывающая Попап
let buttonClosePopUpIcon = document.querySelector('.pop-up__close-icon');

// Редакционное поле ввода ИмяФамилия пользователя
let nameInput = modal.querySelector('.pop-up__profile-user');

// Редакционное поле ввода должности пользователя
let jobInput = modal.querySelector('.pop-up__profile-user-job');

// Кнопка "сохранить" блока Попапа
let buttonSaveEditProfile = modal.querySelector('.pop-up__button-save');

// Элемент Профиль пользователя(Имя Фамилия)
let profileUserHtml = document.querySelector('.profile__user');

// Элемент инфо о пользователе
let profileJobUserHtml = document.querySelector('.profile__user-job');


//                    ФУНКЦИИ

/* ОТкрытие попапа */
function openPopup() {
  popUp.classList.add('pop-up_active');
}

/* Удаление попапа */
function popUpRemove() {
  popUp.classList.remove('pop-up_active');
}

/* Активировать попап. (Добавление соответсвующего класса) */
function popUpOpenClickEditProfile() {
  if (!(popUp.classList.contains('pop-up_active'))) {
    openPopup();
    setPopupInputValue();
  }
};

/* Деактивировать попап по клику на крестик. Удаление соответствующего класса. */
function popUpCloseClickCloseIcon() {
  if (popUp.classList.contains('pop-up_active')) {
    popUpRemove();
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
  popUpRemove();
}


//Обработчики событий

// Открывает попап по клику на Редактирование
buttonEditProfile.addEventListener('click', popUpOpenClickEditProfile);

// Закрывает попап  по клику на Крестик
buttonClosePopUpIcon.addEventListener('click', popUpCloseClickCloseIcon);

// Закрывает попап  по клику вне области Модального окна
popUp.addEventListener('click', popUpCloseClickBlackout);

// Заменяет информацию о профиле(согласно полям редактирования в попапе) после нажатия на кнопку Сохранения
popUp.addEventListener('submit', formSubmitHandler);
