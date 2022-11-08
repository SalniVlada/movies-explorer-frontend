class MoviesApi {
  constructor(options) {
    this.url = options.baseUrl;
    this.headers = options.headers; 
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // получить сохраненные фильмы
  getMovies() {
    return fetch(`${this.url}beatfilm-movies`, {
      headers: this.headers,
    })
      .then(this._checkResponse);
    };
}

export const apiUrl = 'https://api.nomoreparties.co/';

export const moviesApi = new MoviesApi({
  baseUrl: `${apiUrl}`,
  headers: {
    'Content-Type': 'application/json',
  }
});