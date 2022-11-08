import { React, useState, useEffect } from "react";
import './moviesCardList.css';
import MovieCard from '../MoviesCard/moviesCard';
import { BREAKPOINT_768, BREAKPOINT_480, VISIBLE_MOVIES_5, VISIBLE_MOVIES_8, VISIBLE_MOVIES_12,
        MOVIES_TO_LOAD_2, MOVIES_TO_LOAD_3 } from '../../../utils/Constants';

function MoviesCardList({isInFavourites, cards, handleCardSave, handleCardRemove}) {

  const [showedCards, setShowedCards] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [displayedMovies, setDisplayedMovies] = useState(0);
  const [moviesToLoad, setMoviesToLoad] = useState(0);

  const moreButtonClassHidden = "card__button-more_disable";
  const moreButtonClassVisible = "card__button-more";

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    let showedCardsCountAtOnce = displayedMovies;

    if (windowWidth <= BREAKPOINT_480) {
      showedCardsCountAtOnce = VISIBLE_MOVIES_5;
      setMoviesToLoad(MOVIES_TO_LOAD_2);
    } else if (windowWidth <= BREAKPOINT_768) {
      showedCardsCountAtOnce = VISIBLE_MOVIES_8;
      setMoviesToLoad(MOVIES_TO_LOAD_2);
    } else {
      showedCardsCountAtOnce = VISIBLE_MOVIES_12;
      setMoviesToLoad(MOVIES_TO_LOAD_3);
    }

    setDisplayedMovies(showedCardsCountAtOnce);
    setShowedCards(cards.slice(0, showedCardsCountAtOnce));

    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [cards, isInFavourites, windowWidth, displayedMovies])

  function addShowedCards() {
    const leftBound = showedCards.length;
    const rightBound = showedCards.length + moviesToLoad;
    const addedCards = cards.slice(leftBound, rightBound);
    setShowedCards((state) => state.concat(addedCards));
  }

  const renderCard = (card) => {
    return <MovieCard card={card} key={card.movieId} isInFavourites={isInFavourites} isSaved={card.isSaved} 
      onCardSave={handleCardSave} onCardRemove={handleCardRemove}></MovieCard>
  }

  return (
    <section>
      <ul className="cards">
        {showedCards.map(renderCard)}
      </ul>
      <button className={(showedCards.length < cards.length ? moreButtonClassVisible : moreButtonClassHidden)} title="Ещё" onClick={addShowedCards}>Ещё</button>
    </section>
  );
};

export default MoviesCardList;