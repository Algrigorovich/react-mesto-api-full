class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _handleResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getProfileData() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      headers: {
        ...this._headers,
      },
    }).then(this._handleResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      headers: {
        ...this._headers,
      },
    }).then(this._handleResponse);
  }

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        ...this._headers,
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._handleResponse);
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        ...this._headers,
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._handleResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        ...this._headers,
      },
    }).then(this._handleResponse);
  }

  deleteCardLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        ...this._headers,
      }
    }).then(this._handleResponse);
  }

  setCardLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        ...this._headers,
      }
    }).then(this._handleResponse);
  }

  updateAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        ...this._headers,
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._handleResponse);
  }

  logout() {
    return fetch(`${this._baseUrl}/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        ...this._headers,
      },
    }).then(this._handleResponse);
  }
}

const api = new Api({
 // baseUrl: `${window.location.protocol}//algrigorovich.backend.nomoredomains.sbs`,
 baseUrl: '//localhost:3001',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;
