class Auth {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  _handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((res) => {
      return Promise.reject(`Ошибка: ${res.error === undefined ? res.message : res.error}`);
    });
  };

  register(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        ...this._headers,
      },
      body: JSON.stringify({email, password}),
      credentials: 'include',
    }).then(this.handleResponse);
  };

  authorize(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        ...this._headers,
      },
      body: JSON.stringify({email, password}),
      credentials: 'include',
    }).then(this._handleResponse);
  };

  getContent() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
      },
      credentials: 'include',
    }).then(this._handleResponse);
  };
}

const auth = new Auth({
  baseUrl: `${window.location.protocol}//algrigorovich.backend.nomoredomains.sbs`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});

export default auth;
