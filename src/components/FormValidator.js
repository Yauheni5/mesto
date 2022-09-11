'use strict'

export class FormValidator {
  constructor(formElement, selectors) {
    this._formElement = formElement;
    this._selectors = selectors;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._selectors.inputSelector));
    this._buttonElement = this._formElement.querySelector(selectors.submitButtonSelector);
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
  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._inputElement = inputElement;
      this._errorElement = this._formElement.querySelector(`.${this._inputElement.name}-error`);
      this._hideInputError();
    });
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
