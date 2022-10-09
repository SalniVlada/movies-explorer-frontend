import React from "react";
import './savedMovies.css';
import SearchForm from "../Movies/SearchForm/searchForm";
import MoviesCardList from "../Movies/MoviesCardList/moviesCardList";
import Footer from "../Footer/footer";

function SavedMovies() {
  return (
    <section className="saved-movies">
      <SearchForm/>
      <MoviesCardList isInFavourites={true}/>
      <Footer/>
    </section>
  );
};

export default SavedMovies;