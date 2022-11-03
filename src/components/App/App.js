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
import SearchForm from '../Movies/SearchForm/searchForm';
import MoviesCardList from '../Movies/MoviesCardList/moviesCardList';
import Preloader from '../Preloader/Preloader';
import NothingFound from '../Movies/NothingFound/nothingFound';
import { authApi } from '../../utils/AuthApi';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';

function App() {

  const [errorMessage, setErrorMessage] = useState('');
  const [currentUser, setCurrentUser] = useState([]);
  const [loggedIn, setLoggedIn] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [isShortDurations, setIsShortDurations] = useState(false);
  const [card, setCard] = useState([]);
  const [likedCards, setLikedCards] = useState([]);
  const [filteredLikedCards, setFilteredLikedCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    tokenCheck();
    if (loggedIn) {
      mainApi.getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => console.error(err));

      mainApi.getSavedMovies()
        .then((data) => {
          setLikedCards(data.data);
          setFilteredLikedCards(data.data);
        })
        .catch((err) => console.error(err));

      const cachedCards = localStorage.getItem('cards');
      if (cachedCards) {
        setCard(JSON.parse(cachedCards));
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
        });
    } else {
      setLoggedIn(false);
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
        history.push('/movies');
        history.go(0);
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

  function handleUpdateUser(name, email) {
    mainApi.patchUserInfo(name, email)
      .then((data)=>{
        setCurrentUser(data);
      })
      .catch((err) => {
        if (400) {
          setErrorMessage('Пользователь с таким email уже существует.');
        } else {
          setErrorMessage('При обновлении профиля произошла ошибка')
        }
      })
  };

  //фильтр по фильмам
  function filterCards(card) {
    const filteredCard = card
    .filter((card) => {
      return (card.nameRU.toUpperCase().includes(searchValue.toUpperCase()) || 
        card.nameEN.toUpperCase().includes(searchValue.toUpperCase())) && ((isShortDurations && card.duration <= 40) || !isShortDurations);
    })
    return filteredCard;
  }

  function searchCards(searchValue, isShortDurations) {
    setIsLoading(true);
    if (loggedIn) {
      moviesApi.getMovies().then((data) => {
        const filteredCards = filterCards(data)
          .map((card) => {
            const likedCard = likedCards.find((likedCard) => likedCard.movieId === card.id);
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
        setCard(filteredCards);
        localStorage.setItem('cards', JSON.stringify(filteredCards));
      })
      .catch((err) => console.error(err))
     .finally(() => setIsLoading(false));
    }
  };

  function searchSavedCards() {
    const filteredSavedCards = filterCards(likedCards);
    setFilteredLikedCards(filteredSavedCards);
  }

  function handleCardSave(card) {
    mainApi.postMovie(card)
      .then((data) => {
        const newCard = { ...data.data, isSaved: true }
        setCard((state) => {
          const newState = state.map((c) => (c.movieId === card.movieId ? newCard : c));
          localStorage.setItem('cards', JSON.stringify(newState));
          return newState;
        });
        setLikedCards((state) => {
          const currentLikedCards = state.filter((c) => (c._id !== card._id));
          currentLikedCards.push(newCard);
          return currentLikedCards;
        });
        setFilteredLikedCards((state) => {
          const currentLikedCards = state.filter((c) => (c._id !== card._id));
          currentLikedCards.push(newCard);
          return filterCards(currentLikedCards);
        });
      })
      .catch((err) => console.error(err))
  }

  function handleCardRemove(card) {
    mainApi.deleteMovie(card._id)
      .then(() => {
        const newCard = { ...card, isSaved: false }
        setCard((state) => {
          const newState = state.map((c) => (c.movieId === card.movieId ? newCard : c));
          localStorage.setItem('cards', JSON.stringify(newState));
          return newState;
        });
        setLikedCards((state) => state.filter((c) => (c._id !== card._id)));
        setFilteredLikedCards((state) => state.filter((c) => (c._id !== card._id)));
      })
      .catch((err) => console.error(err))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="page">
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Header/>
              <Main/>
              <Footer/>
            </Route>

            <ProtectedRoute exact path="/movies" loggedIn={loggedIn}>
              <Header/>
              <SearchForm searchValue={searchValue} setSearchValue={setSearchValue} 
                isShortDurations={isShortDurations} setIsShortDurations={setIsShortDurations} onSearchCards={searchCards}/>
              {(() => {
                if (isLoading) { return (<Preloader/>) }
                else if (card.length === 0) { return (<NothingFound/>) }
                else { return (<MoviesCardList key="found-cards" isInFavourites={false} cards={card} handleCardSave={handleCardSave} handleCardRemove={handleCardRemove}/>) }
              })()}
              <Footer/>
            </ProtectedRoute>

            <Route exact path="/signin" isRedirect={loggedIn} redirectPath="/movies">
              <Login onLogin={onLogin} errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>
            </Route>

            <Route exact path="/signup" isRedirect={loggedIn} redirectPath="/movies">
              <Register onRegister={onRegister} errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>
            </Route>

            <ProtectedRoute exact path="/profile" loggedIn={loggedIn}>
              <Header/>
              <Profile onUpdateUser={handleUpdateUser} errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>
            </ProtectedRoute>

            <ProtectedRoute exact path="/saved-movies" loggedIn={loggedIn}>
              <Header/>
              <SearchForm searchValue={searchValue} setSearchValue={setSearchValue} 
                isShortDurations={isShortDurations} setIsShortDurations={setIsShortDurations} onSearchCards={searchSavedCards}/>
              {(() => {
                if (isLoading) { return (<Preloader/>) }
                else if (filteredLikedCards.length === 0) { return (<NothingFound/>) }
                else { return (<MoviesCardList key="liked-cards" isInFavourites={true} cards={filteredLikedCards} handleCardRemove={handleCardRemove}/>) }
              })()}
              <Footer/>
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
