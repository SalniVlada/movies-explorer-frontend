import React from "react";
import './savedMovies.css';
import SearchForm from "../Movies/SearchForm/searchForm";
import MoviesCardList from "../Movies/MoviesCardList/moviesCardList";
import Footer from "../Footer/footer";

function SavedMovies({card, setCard}) {
  return (
    <section className="saved-movies">
      <SearchForm/>
      <MoviesCardList isInFavourites={true} card={card} setCard={setCard}/>
      <Footer/>
    </section>
  );
};

export default SavedMovies;