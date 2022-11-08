import { React } from "react";
import './moviesCard.css';

function MoviesCard({card, isInFavourites, isSaved, onCardSave, onCardRemove}) {

  const useButtonClassName = (() => {
    if (isInFavourites) {
      return 'card__button_delete';
    } else if (isSaved) {
      return 'card__button_save';
    } else {
      return 'card__button';
    }
  })();

  const handleCardSaveRemove = () => {
    if (isInFavourites || card.isSaved) {
      onCardRemove(card);
    } else {
      onCardSave(card);
    }
  }

  function getTimeFromMins(duration) {
    let hours = Math.trunc(duration/60);
    let minutes = duration % 60;
    return hours + 'ч ' + minutes + 'м';
};

  return (
    <li className="card">
      <a href={card.trailerLink} rel="noreferrer" target="_blank"><img src={`${card.image}`} alt={card.nameRU} className="card__photo"/></a>
      <div className="card__group">
        <div className="card__title">
          <h3 className="card__name">{card.nameRU}</h3>
          <h3 className="card__duration">{getTimeFromMins(card.duration)}</h3>
        </div>
        <button type="button" className={useButtonClassName} title="Кнопка реакции" onClick={handleCardSaveRemove}></button>
      </div>
    </li>
  );
};

export default MoviesCard;