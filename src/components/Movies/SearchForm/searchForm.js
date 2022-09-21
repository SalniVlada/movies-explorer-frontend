import React from "react";
import './searchForm.css';
import Button from '../../../images/button-invisible.png';

function SearchForm() {
  return (
    <section className="seach">
      <div className="seach__container">
        <input className="seach__input" type="text" placeholder="Фильм" />
        <button className="seach__button" title="Найти"><img className="seach__button-img" src={Button} alt="Найти"/></button>
      </div>
      <div className="seach__switch">
        <input type="checkbox" className="seach__checkbox" />
        <h3 className="seach__checkbox-name">Короткометражки</h3>
      </div>
      <div className="seach__line"></div>
    </section>
  );
};

export default SearchForm;