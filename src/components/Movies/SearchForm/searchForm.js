import { React, useEffect, useState } from "react";
import './searchForm.css';
import Button from '../../../images/button-invisible.png';

function SearchForm({type, searchValue, setSearchValue, isShortDurations, setIsShortDurations, onSearchCards, isResetWhenReload}) {

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let needSearchExecution = false;
    if (!isResetWhenReload) {
      const cachedSearchValue = localStorage.getItem(`${type}-searchValue`);
      if (cachedSearchValue) {
        setSearchValue(cachedSearchValue);
        needSearchExecution = true;
      }
    
      const cachedIsShortDurations = localStorage.getItem(`${type}-isShortDurations`) === "true";
      if (cachedIsShortDurations) {
        setIsShortDurations(cachedIsShortDurations);
      }
    } else {
      setSearchValue('');
      setIsShortDurations(false);
    }
    if (needSearchExecution) {
      onSearchCards();
    }
  }, []);

  const handleSwitchShortDurations = (evt) => {
    const isChecked = evt.target.checked;
    setIsShortDurations(isChecked);
    localStorage.setItem(`${type}-isShortDurations`, isChecked);
    onSearchCards();
  };

  const handleSearch = (evt) => {
    const currentSearchValue = evt.target.value
    setSearchValue(currentSearchValue);
    setErrorMessage('');
  };

  function handleSearchClick(evt) {
    if (searchValue) {
      localStorage.setItem(`${type}-searchValue`, searchValue);
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