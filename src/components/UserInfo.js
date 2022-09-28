'use strict'
export class UserInfo {
  constructor({
    selectorsUser
  }) {
    this._selectorsUser = selectorsUser;
    this._userName = document.querySelector(this._selectorsUser.name);
    this._userJob = document.querySelector(this._selectorsUser.about);
    this._userAvatar = document.querySelector(this._selectorsUser.avatar);
    this._nameInputName = this._selectorsUser.userNameInput;
    this._jobInputName = this._selectorsUser.jobInputName;
    this._avatarInputName = this._selectorsUser.avatarInputName;
  }
  getUserInfo = () => {
    return {
      [this._nameInputName]: this._userName.textContent,
      [this._jobInputName]: this._userJob.textContent
    }
  }

  setUserInfo = (values) => {
    this._userName.textContent = values[this._nameInputName] || values['name'];
    this._userJob.textContent = values[this._jobInputName] || values['about'];
    this._userAvatar.src = values.avatar || values[this._avatarInputName];
  }
}
