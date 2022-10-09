import { React } from "react";
import './moviesCard.css';
import CardImage from '../../../images/pic-1.png';

function MoviesCard({card, isInFavourites, isSaved, onCardSave}) {

  const useButtonClassName = (() => {
    if (isInFavourites) {
      return 'card__button_delete';
    } else if (isSaved) {
      return 'card__button_save';
    } else {
      return 'card__button';
    }
  })();

  const handleCardSave = () => {
    onCardSave(card);
  }

  return (

    <li className="card">
      <img src={CardImage} alt="Девушка с детьми" className="card__photo" />
      <div className="card__group">
        <div className="card__title">
          <h3 className="card__name">33 слова о дизайне</h3>
          <h3 className="card__duration">1ч 47м</h3>
        </div>
        <button type="button" className={useButtonClassName} title="Кнопка реакции" onClick={handleCardSave}></button>
      </div>
    </li>
  );
};

export default MoviesCard;