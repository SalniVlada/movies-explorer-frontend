import React from "react";
import './aboutMe.css';
import avatar from '../../../images/IMG_9935.png';

function AboutMe() {
  return (
      <section className="student">
        <h2 className="student__header">Студентка</h2>
        <div className="student__about">
          <div className="student__container">
            <h2 className="student__name">Влада</h2>
            <h3 className="student__profession">Фронтенд-разработчик, 27 лет</h3>
            <p className="student__info">Я живу в Санкт-Петербурге.
                Всю жизнь люблю делать что-то руками. С недавних пор начала увлекаться веб-разработкой и кодить. 
                В повседневной жизнь шью, пеку, путешествую на машине и воспитываю рыжего кота по кличке Сырник.</p>
            <a href="https://github.com/SalniVlada" className="student__github-link" rel="noreferrer" target="_blank">Github</a>
          </div>
          <img className="student__photo" src={avatar} alt="Личное фото" />
        </div>
      </section>
  );
};

export default AboutMe;