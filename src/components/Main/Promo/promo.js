import React from 'react';
import './promo.css';
import promoImg from '../../../images/landing-logo.svg';

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
        <img className="promo__img" src={promoImg} alt="Баннер главной страницы" />
      </div>
    </section>
  );
};

export default Promo;