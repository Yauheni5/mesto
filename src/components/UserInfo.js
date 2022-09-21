'use strict'
export class UserInfo {
  constructor({
    selectorsUser
  }) {
    this._selectorsUser = selectorsUser;
    this._userName = document.querySelector(this._selectorsUser.name);
    this._userJob = document.querySelector(this._selectorsUser.about);
    this._userAvatar = document.querySelector(this._selectorsUser.avatar)
  }
  getUserInfo = () => {
    return {
      'name-input': this._userName.textContent,
      'job-input': this._userJob.textContent
    }
  }

  setUserInfo = (values) => {
    this._userName.textContent = values['name-input'] || values['name'];
    this._userJob.textContent = values['job-input'] || values['about'];
  }

  setUserAvatar = (data) => {
    this._userAvatar.src = data.avatar || data['url-avatar-input'];
  }
}
