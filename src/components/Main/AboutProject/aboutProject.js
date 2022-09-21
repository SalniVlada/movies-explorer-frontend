import React from "react";
import './aboutProject.css';

function AboutProject() {
  return (
    <section className="about">
      <h2 className="about__title">О проекте</h2>
      <ul className='about__list'>
        <li className='about__info'>
          <h3 className='about__info-title'>Дипломный проект включал 5 этапов</h3>
          <p className='about__info-text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </li>
        <li className='about__info'>
          <h3 className='about__info-title'>На выполнение диплома ушло 5 недель</h3>
          <p className='about__info-text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </li>
      </ul>
      <ul className='about__block'>
        <li className='about__block-item'>
          <p className='about__block-time about__block-time_green'>1 неделя</p>
          <p className='about__block-tech'>Back-end</p>
        </li>
        <li className='about__block-item'>
          <p className='about__block-time about__block-time_grey'>1 неделя</p>
          <p className='about__block-tech'>Front-end</p>
        </li>
      </ul>
    </section>
  );
};

export default AboutProject;