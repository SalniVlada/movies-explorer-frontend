import { React } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from '../Header/header';
import Main from '../Main/main';
import Footer from '../Footer/footer';
import Login from '../Login/login';
import Register from '../Register/register';
import Profile from '../Profile/profile';
import PageNotFound from '../PageNotFound/pageNotFound';
import SearchForm from '../Movies/SearchForm/searchForm';
import MoviesCardList from '../Movies/MoviesCardList/moviesCardList';
import SavedMovies from '../SavedMovies/savedMovies';

function App() {
  return (
    <div className="page">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Header/>
            <Main/>
            <Footer/>
          </Route>

          <Route exact path="/movies">
            <Header/>
            <SearchForm/>
            <MoviesCardList isInFavourites={false}/>
            <Footer/>
          </Route>

          <Route exact path="/signin">
            <Login/>
          </Route>

          <Route exact path="/signup">
            <Register/>
          </Route>

          <Route exact path="/profile">
            <Header/>
            <Profile/>
          </Route>

          <Route path="/saved-movies">
            <Header/>
            <SavedMovies/>
          </Route>

          <Route path="*">
            <PageNotFound/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
