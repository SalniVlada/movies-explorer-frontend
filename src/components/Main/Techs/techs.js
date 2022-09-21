import React from "react";
import './techs.css';

function Techs() {
  return (
    <section className="techs">
      <div className="techs__container">
        <h2 className="techs__header">Технологии</h2>
        <h2 className="techs__title">7 технологий</h2>
        <p className="techs__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className="techs__list">
          <li className="techs__list-item"><div className="techs__list-icon">HTML</div></li>
          <li className="techs__list-item"><div className="techs__list-icon">CSS</div></li>
          <li className="techs__list-item"><div className="techs__list-icon">JS</div></li>
          <li className="techs__list-item"><div className="techs__list-icon">React</div></li>
          <li className="techs__list-item"><div className="techs__list-icon">Git</div></li>
          <li className="techs__list-item"><div className="techs__list-icon">Express.js</div></li>
          <li className="techs__list-item"><div className="techs__list-icon">mongoDB</div></li>
        </ul>
      </div>
    </section>
  );
};

export default Techs;