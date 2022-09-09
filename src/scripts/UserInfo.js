'use strict'
export class UserInfo {
  constructor({
    selectorsUser
  }) {
    this._selectorsUser = selectorsUser;
    this._userName = document.querySelector(selectorsUser.name);
    this._userJob = document.querySelector(selectorsUser.about);
  }
  getUserInfo() {
    console.log({
      name: document.querySelector(this._selectorsUser.name).textContent,
      about: document.querySelector(this._selectorsUser.about).textContent
    })
    return {
      name: document.querySelector(this._selectorsUser.name).textContent,
      about: document.querySelector(this._selectorsUser.about).textContent
    }
  }

  setUserInfo = (values) => {
    console.log(values)
    this._userName.textContent = values['name-input'];
    this._userJob.textContent = values['job-input'];
  }
}
