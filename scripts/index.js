//                   ПЕРЕМЕННЫЕ


// Блок который затемняет фон страницы(весь блок модального окна(попап)) в DOM
let blackoutPage = document.querySelector('.pop-up');

// Попап контейнер(модальное окно)
let popUp = document.querySelector('.pop-up__container');

// Кнопка редактирования профиля пользователя
let buttonEditProfile = document.querySelector('.profile__button_edit');

// Кнопка(крестик) закрывающая Попап
let buttonClosePopUp = document.querySelector('.pop-up__close-icon');

// Редакционное поле ввода ИмяФамилия пользователя
let nameInput = popUp.querySelector('.pop-up__profile-user');

// Редакционное поле ввода должности пользователя
let jobInput = popUp.querySelector('.pop-up__profile-user-job');

// Кнопка "сохранить" блока Попапа
let buttonSaveEditProfile = popUp.querySelector('.pop-up__button-save');

// Элемент Профиль пользователя(Имя Фамилия)
let profileUserHtml = document.querySelector('.profile__user');

// Элемент професии пользователя
let profileJobUserHtml = document.querySelector('.profile__user-job');


//                    ФУНКЦИИ


/* Активировать попап. (Добавление соответсвующего класса) */
function popUpOpenClickEditProfile() {
  if (!(blackoutPage.classList.contains('pop-up_active'))) {
    blackoutPage.classList.add("pop-up_active");
  }
};

/* Деактивировать попап по клику на крестик. Удаление соответствующего класса. */
function popUpCloseClickCloseIcon() {
  if (blackoutPage.classList.contains('pop-up_active')) {
    blackoutPage.classList.remove("pop-up_active");
  }
};

/* Скрыть попап при клике вне окна самого попапа */
function popUpCloseClickBlackout(event) {
  if (event.target.classList.contains('pop-up') && !event.target.classList.contains('pop-up__container')) {
    popUpCloseClickCloseIcon();
  }
};

// функция для редактирования информации о пользователе
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Получите значение полей jobInput и nameInput из свойства value
  let nameInputValue = nameInput.value;
  let jobInputValue = jobInput.value;
  // Выберите элементы, куда должны быть вставлены значения полей
  // Вставьте новые значения с помощью textContent
  profileUserHtml.textContent = nameInputValue;
  profileJobUserHtml.textContent = jobInputValue;
}


//Обработчики событий

// Открывает попап по клику нв Редактирование
buttonEditProfile.addEventListener('click', popUpOpenClickEditProfile);

// Закрывает попап  по клику на Крестик
buttonClosePopUp.addEventListener('click', popUpCloseClickCloseIcon);

// Закрывает попап  по клику вне области Модального окна
blackoutPage.addEventListener('click', popUpCloseClickBlackout);

// Заменяет информацию о профиле(согласно полям редактирования в попапе)
// после нажатия на кнопку Сохранения
buttonSaveEditProfile.addEventListener('click', formSubmitHandler);
buttonSaveEditProfile.addEventListener('click', popUpCloseClickCloseIcon);
