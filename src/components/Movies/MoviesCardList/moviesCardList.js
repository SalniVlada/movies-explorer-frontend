import React from "react";
import './moviesCardList.css';
import MovieCard from '../MoviesCard/moviesCard';

function MoviesCardList({isInFavourites}) {
  const [cards, setCards] = React.useState([
    { id: 1, isSaved: false },
    { id: 2, isSaved: false },
    { id: 3, isSaved: true },
    { id: 4, isSaved: false },
    { id: 5, isSaved: false },
    { id: 6, isSaved: true },
    { id: 7, isSaved: false },
    { id: 8, isSaved: false },
    { id: 9, isSaved: false },
    { id: 10, isSaved: false },
    { id: 11, isSaved: false },
    { id: 12, isSaved: false },
  ]);

  const setNewCards = (id, newCard) => {
    setCards((state) => state.map((c) => (c.id === id ? newCard : c)));
  }

  function handleCardSave(card) {
    const newCard = { id: card.id, isSaved: !card.isSaved }
    setNewCards(card.id, newCard);
  }

  const moreButtonClasses = isInFavourites ? "card__button-more_disable" : "card__button-more";

  const renderCard = (card) => {
    if (!isInFavourites || card.isSaved) {
      return <MovieCard card={card} key={card.id} isInFavourites={isInFavourites} isSaved={card.isSaved} onCardSave={handleCardSave}></MovieCard>
    }
  }

  return (
    <section>
      <ul className="cards">
        {cards.map(renderCard)}
      </ul>
      <button className={moreButtonClasses} title="Ещё">Ещё</button>
    </section>
  );
};

export default MoviesCardList;