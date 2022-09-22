export class Api {
  constructor(options) {
    this.url = options.url;
    this._headers = options.headers;
  }

  _checkResponseError = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfoApi() {
    return fetch(`${this.url}/users/me`, {
        method: 'GET',
        headers: this._headers,
      })
      .then(this._checkResponseError)
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
        method: 'GET',
        headers: this._headers
      })
      .then(this._checkResponseError)
  }

  setUserInfoApi(userData) {
    return fetch(`${this.url}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: userData['name-input'],
          about: userData['job-input']
        })
      })
      .then(this._checkResponseError)
  }

  setUserAvatarApi(userData) {
    return fetch(`${this.url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: userData['url-avatar-input']
        })
      })
      .then(this._checkResponseError)
  }

  addCard(data) {
    return fetch(`${this.url}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
      .then(this._checkResponseError)
  }

  deleteCard(idCardDelete) {
    return fetch(`${this.url}/cards/${idCardDelete}`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(this._checkResponseError)
  }

  likesCard(idCard) {
    return fetch(`${this.url}/cards/${idCard}/likes`, {
        method: 'PUT',
        headers: this._headers,
      })
      .then(this._checkResponseError)
  }

  dislikesCard(idCard) {
    return fetch(`${this.url}/cards/${idCard}/likes`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(this._checkResponseError)
  }
  getAllPromise() {
    return Promise.all([this.getUserInfoApi(), this.getInitialCards()])
  }
}
