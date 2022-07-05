let blackoutPage = document.querySelector('.blackout');
let popUp = document.querySelector('.pop-up');
let buttonEditProfile = document.querySelector('.form-edit__button');
let buttonClosePopUp = document.querySelector('.pop-up__close-icon')


function popUpOpenClickEditProfile() {
  if (!(blackoutPage.classList.contains('blackout-active'))) {
    blackoutPage.classList.add("blackout-active");
  }
}

function popUpCloseClickCloseIcon() {
  if (blackoutPage.classList.contains('blackout-active')) {
    blackoutPage.classList.remove("blackout-active");
  }
}

buttonEditProfile.addEventListener('click', popUpOpenClickEditProfile);
buttonClosePopUp.addEventListener('click', popUpCloseClickCloseIcon);
