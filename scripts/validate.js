'use strict'

export const selectorsValidation = {
  formSelector: '.pop-up__form',
  inputSelector: '.pop-up__input',
  submitButtonSelector: '.pop-up__button',
  inactiveButtonClass: 'pop-up__button_inactive',
  inputErrorClass: 'pop-up__input_type_error',
  errorClass: 'pop-up__error_visible'
}

export class FormValidator {
  /**
   * Класс Карточка
   * @param {String} selectors Селекторы для валидации
   * @param {String} formElement Форма для валидиции
   * */
  constructor(formElement, selectors) {
    this._formElement = formElement;
    this._selectors = selectors;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._selectors.inputSelector));
    this._inputElement = this._formElement.querySelector(this._selectors.inputSelector);
    this._buttonElement = this._formElement.querySelector(selectors.submitButtonSelector);
    this._errorElement = this._formElement.querySelector(`.${this._inputElement.name}-error`);
    this._errorMessage = this._inputElement.validationMessage;
  }

  _showInputError = () => {
    this._inputElement.classList.add(this._selectors.inputErrorClass);
    this._errorElement.textContent = this._errorMessage;
    this._errorElement.classList.add(this._selectors.errorClass);
  };

  _hideInputError = () => {
    this._inputElement.classList.remove(this._selectors.inputErrorClass);
    this._errorElement.classList.remove(this._selectors.errorClass);
    this._errorElement.textContent = '';
  };

  _isValid = () => {
    if (!this._inputElement.validity.valid) {
      this._showInputError();
    } else {
      this._hideInputError();
    }
  };

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _enableSubmitButton = () => {
    this._buttonElement.classList.add(this._selectors.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', 'disabled');
  }

  _disableSubmitButton = () => {
    this._buttonElement.classList.remove(this._selectors.inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  }

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._enableSubmitButton();
    } else {
      this._disableSubmitButton();
    }
  }

  _setEventListeners = () => {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._inputElement = inputElement;
        this._errorElement = this._formElement.querySelector(`.${this._inputElement.name}-error`);
        this._errorMessage = this._inputElement.validationMessage;
        this._isValid();
        this._toggleButtonState();
      });
    })
  };
  enableValidation = () => {
    this._setEventListeners();
  }
}
