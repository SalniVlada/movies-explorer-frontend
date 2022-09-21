import { React } from "react";
import { Link, NavLink } from 'react-router-dom';
import './burgerMenu.css';

function BurgerMenu({isOpen, onClose}) {

  // <Link className="burgerMenu__link-home"></Link>
  return (
    <div className={`burgerMenu ${isOpen && 'burgerMenu_opened'}`}>
      <button className="burgerMenu__button-close" type="button" onClick={onClose}></button>
      <nav className="burgerMenu__links">
        <NavLink to="/" className="burgerMenu__link">Главная</NavLink>
        <NavLink to="/movies" activeClassName="burgerMenu__link_active" className="burgerMenu__link">Фильмы</NavLink>
        <NavLink to="/saved-movies" activeClassName="burgerMenu__link_active" className="burgerMenu__link">Сохраненые фильмы</NavLink>
      </nav>
      <Link className="burgerMenu__link-home" to="/profile">
        <button type="button" className="burgerMenu__button-home">Аккаунт</button>
      </Link>
    </div>
  );
};

export default BurgerMenu;