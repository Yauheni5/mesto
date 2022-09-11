'use strict'
export class UserInfo {
  constructor({
    selectorsUser
  }) {
    this._selectorsUser = selectorsUser;
    this._userName = document.querySelector(selectorsUser.name);
    this._userJob = document.querySelector(selectorsUser.about);
  }
  getUserInfo = () => {
    return {
      'name-input': this._userName.textContent,
      'job-input': this._userJob.textContent
    }
  }

  setUserInfo = (values) => {
    this._userName.textContent = values['name-input'];
    this._userJob.textContent = values['job-input'];
  }
}
