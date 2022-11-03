import { React, useState } from "react";
import './searchForm.css';
import Button from '../../../images/button-invisible.png';

function SearchForm({searchValue, setSearchValue, isShortDurations, setIsShortDurations, onSearchCards}) {

  const [errorMessage, setErrorMessage] = useState('');

  useState(() => {
    const cachedSearchValue = localStorage.getItem('searchValue');
    if (cachedSearchValue) {
      setSearchValue(cachedSearchValue);
    }
    
    const cachedIsShortDurations = localStorage.getItem('isShortDurations') === "true";
    if (cachedIsShortDurations) {
      setIsShortDurations(cachedIsShortDurations);
    }
  });

  const handleSwitchShortDurations = (evt) => {
    const isChecked = evt.target.checked;
    setIsShortDurations(isChecked);
    localStorage.setItem('isShortDurations', isChecked);
    onSearchCards();
  };

  const handleSearch = (evt) => {
    const currentSearchValue = evt.target.value
    setSearchValue(currentSearchValue);
    setErrorMessage('');
  };

  function handleSearchClick(evt) {
    localStorage.setItem('searchValue', searchValue);
    if (searchValue) {
      setErrorMessage('');
      onSearchCards();
    } else {
      setErrorMessage('Нужно ввести ключевое слово');
    }
    evt.preventDefault();
  }

  return (
    <section className="seach">
      <form className="seach__container" onSubmit={handleSearchClick}>
        <input className="seach__input" type="text" placeholder="Фильм" value={searchValue || ""} onChange={handleSearch} />
        <button className="seach__button" title="Найти"><img className="seach__button-img" src={Button} alt="Найти"/></button>
      </form>
      <p className={`seach__error-message ${errorMessage && 'seach__error-message_visible'}`}>{errorMessage}</p>
      <div className="seach__switch">
        <input type="checkbox" className="seach__checkbox" checked={isShortDurations} onChange={handleSwitchShortDurations} />
        <h3 className="seach__checkbox-name">Короткометражки</h3>
      </div>
      <div className="seach__line"></div>
    </section>
  );
};

export default SearchForm;