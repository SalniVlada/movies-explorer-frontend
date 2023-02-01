class MainApi {
  constructor(options) {
    this.url = options.baseUrl;
    this.headers = options.headers;
  }
  
  _getHeaders() {
    let currentHeaders = this.headers;
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      currentHeaders['Authorization'] = `Bearer ${jwt}`
    }
    return currentHeaders;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

   //загрузка информации о пользователи
   getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: this._getHeaders()
    })
      .then(this._checkResponse);
  }

   // редактирование профиля
   patchUserInfo(userName, userEmail) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: userName,
        email: userEmail
      })
    })
    .then(this._checkResponse);
  }

  // получить сохраненные фильмы
  getSavedMovies() {
    return fetch(`${this.url}/movies`, {
      headers: this._getHeaders(),
    })
      .then(this._checkResponse);
    };

  // добавление нового фильма
  postMovie(movie) {
    return fetch(`${this.url}/movies`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        country: movie.country ? movie.country : "Укажите страну",
        director: movie.director ? movie.director : "Укажите режиссера",
        duration: movie.duration,
        year: movie.year ? movie.year : "Укажите год",
        description: movie.description ? movie.description : "Добавьте описание",
        image: movie.image,
        trailerLink: movie.trailerLink ? movie.trailerLink : "Добавьте трейлер",
        nameRU: movie.nameRU ? movie.nameRU : "Укажите название на русском",
        nameEN: movie.nameEN ? movie.nameEN : "Укажите название на английском",
        thumbnail: movie.thumbnail,
        movieId: movie.movieId
      })
    })
    .then(this._checkResponse);
  }

  // удаление фильма
  deleteMovie(id) {
    return fetch(`${this.url}/movies/${id}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    })
    .then(this._checkResponse);
  }
}

export const mainApi = new MainApi({
  baseUrl: 'https://api.moviesexplorer.salnivlada.nomoredomains.sbs',
  headers: {
    'Content-Type': 'application/json',
  }
});