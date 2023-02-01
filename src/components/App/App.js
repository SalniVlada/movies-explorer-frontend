import { React, useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import Header from '../Header/header';
import Main from '../Main/main';
import Footer from '../Footer/footer';
import Login from '../Login/login';
import Register from '../Register/register';
import Profile from '../Profile/profile';
import PageNotFound from '../PageNotFound/pageNotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import RedirectRoute from '../RedirectRoute/RedirectRoute';
import Movies from '../Movies/movies';
import { authApi } from '../../utils/AuthApi';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';

function App() {

  const [errorMessage, setErrorMessage] = useState('');
  const [currentUser, setCurrentUser] = useState([]);
  const [loggedIn, setLoggedIn] = useState(null);
  const [allCards, setAllCards] = useState([]);
  const [likedCards, setLikedCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [succesMessage, setSuccesMessage] = useState('');

  useEffect(() => {
    tokenCheck();
    if (loggedIn) {
      mainApi.getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => console.error(err));
      
      fetchLikedCards()
        .then((data) => {
          setLikedCards(data);
        })
        .catch((err) => console.error(err));

      const cachedAllCards = localStorage.getItem('all-movies-cards');
      if (cachedAllCards) {
        setAllCards(JSON.parse(cachedAllCards));
      }
    }
  }, [loggedIn]);

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      authApi.getUserAuth(jwt)
        .then((data) => {
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
          setLoggedIn(false);
          onLogout();
        });
    } else {
      setLoggedIn(false);
      onLogout();
    }
  }

  function onRegister(name, email, password) {
    authApi.signUp({name: name, password: password, email: email})
      .then(() => {
        onLogin(password, email);
      })
      .catch((err) => {
        if (409) {
          setErrorMessage('Пользователь с таким email уже существует');
        } else {
          setErrorMessage('При регистрации пользователя произошла ошибка.')
        }
      })
  }

  function onLogin(password, email) {
    authApi.signIn({password: password, email: email})
      .then((data) => {
        localStorage.setItem('jwt', data.jwt);
        setCurrentUser(data);
        setLoggedIn(true);
        setErrorMessage('');
      })
      .catch((err) => {
        if (401) {
          setErrorMessage('Неправильные почта или пароль');
        } else {
          setErrorMessage('При авторизации пользователя произошла ошибка')
        }
      })
  }

  function onLogout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('all-movies-cards');
    localStorage.removeItem('all-movies-search-form-isShortDurations');
    localStorage.removeItem('all-movies-search-form-searchValue');
    localStorage.removeItem('saved-movies-cards');
    localStorage.removeItem('saved-movies-search-form-isShortDurations');
    localStorage.removeItem('saved-movies-search-form-searchValue');
  }

  function handleUpdateUser(name, email) {
    mainApi.patchUserInfo(name, email)
      .then((data)=>{
        setCurrentUser(data);
        setSuccesMessage('Успешно!')
      })
      .catch((err) => {
        if (400) {
          setErrorMessage('Пользователь с таким email уже существует.');
        } else {
          setErrorMessage('При обновлении профиля произошла ошибка')
        }
      })
  };

  function refreshAllCards() {
    if (loggedIn && allCards.length === 0) {
      setIsLoading(true);
      const likedCardsFetching = fetchLikedCards();
      const allCardsFetching = moviesApi.getMovies();
      Promise.all([likedCardsFetching, allCardsFetching])
        .then(function([currentLikedCards, currentAllCards]) {
          setLikedCards(currentLikedCards);
          const loadedCards = currentAllCards.map((card) => {
              const likedCard = currentLikedCards.find((likedCard) => likedCard.movieId === card.id);
              const likedCardId = likedCard ? likedCard._id : undefined;
              return {
                country: card.country,
                director: card.director,
                duration: card.duration,
                year: card.year,
                description: card.description,
                image: `https://api.nomoreparties.co${card.image.url}`,
                trailerLink: card.trailerLink,
                nameRU: card.nameRU,
                nameEN: card.nameEN,
                thumbnail: `https://api.nomoreparties.co${card.image.formats.thumbnail.url}`,
                movieId: card.id,
                owner: card.owner,
                isSaved: likedCard ? true : false,
                _id: likedCardId
              };
            });
          setAllCards(loadedCards);
          localStorage.setItem('all-movies-cards', JSON.stringify(loadedCards));
        })
        .catch((err) => console.error(err))
        .finally(() => setIsLoading(false));
    }
  };

  function fetchLikedCards() {
    if (likedCards.length === 0) {
      return mainApi.getSavedMovies().then((data) => data.data);
    } else {
      return Promise.resolve(likedCards);
    }
  }

  function refreshLikedCards() {}

  function handleCardSave(card) {
    mainApi.postMovie(card)
      .then((data) => {
        const newCard = { ...data.data, isSaved: true }
        setAllCards((state) => {
          const newState = state.map((c) => (c.movieId === card.movieId ? newCard : c));
          localStorage.setItem('all-movies-cards', JSON.stringify(newState));
          return newState;
        });
        setLikedCards((state) => {
          const currentLikedCards = state.filter((c) => (c._id !== card._id));
          currentLikedCards.push(newCard);
          return currentLikedCards;
        });
      })
      .catch((err) => console.error(err))
  }

  function handleCardRemove(card) {
    mainApi.deleteMovie(card._id)
      .then(() => {
        const newCard = { ...card, isSaved: false }
        setAllCards((state) => {
          const newState = state.map((c) => (c.movieId === card.movieId ? newCard : c));
          localStorage.setItem('all-movies-cards', JSON.stringify(newState));
          return newState;
        });
        setLikedCards((state) => state.filter((c) => (c._id !== card._id)));
      })
      .catch((err) => console.error(err))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="page">
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Header loggedIn={loggedIn}/>
              <Main/>
              <Footer/>
            </Route>

            <ProtectedRoute exact path="/movies" loggedIn={loggedIn}>
              <Movies key="all-movies" type="all-movies" isLoading={isLoading} cards={allCards} refreshCards={refreshAllCards} 
                handleCardSave={handleCardSave} handleCardRemove={handleCardRemove} isInFavourites={false}/>
            </ProtectedRoute>

            <RedirectRoute exact path="/signin" isRedirect={loggedIn} redirectPath="/movies">
              <Login onLogin={onLogin} errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>
            </RedirectRoute>

            <RedirectRoute exact path="/signup" isRedirect={loggedIn} redirectPath="/movies">
              <Register onRegister={onRegister} errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>
            </RedirectRoute>

            <ProtectedRoute exact path="/profile" loggedIn={loggedIn}>
              <Header loggedIn={true}/>
              <Profile onUpdateUser={handleUpdateUser} onLogout={onLogout} errorMessage={errorMessage} setErrorMessage={setErrorMessage}
               succesMessage={succesMessage}/>
            </ProtectedRoute>

            <ProtectedRoute exact path="/saved-movies" loggedIn={loggedIn}>
              <Movies key="saved-movies" type="saved-movies" isLoading={isLoading} cards={likedCards} refreshCards={refreshLikedCards} 
                 handleCardSave={handleCardSave} handleCardRemove={handleCardRemove} isInFavourites={true}/>
            </ProtectedRoute>

            <Route path="*">
              <PageNotFound/>
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
