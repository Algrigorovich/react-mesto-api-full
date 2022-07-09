class Auth {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  _handleResponse = (res) => {
    console.log(res);
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
      credentials: 'include',
      headers: {
        ...this._headers,
      },
      body: JSON.stringify({email, password}),
    }).then(this._handleResponse);
  };

  authorize(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        ...this._headers,
      },
      body: JSON.stringify({email, password}),
    }).then(this._handleResponse);
  };

  getContent() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        ...this._headers,
      },
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
