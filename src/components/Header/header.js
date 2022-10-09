import { React } from 'react';
import {Link, Route, Switch, useLocation, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './header.css';
import Logo from '../../images/logo.svg';
import IconBurgrMenu from '../../images/icon-burgerMenu.svg';
import BurgerMenu from '../BurgerMenu/burgerMenu';

function Header() {
  const [isBurgerMenuOpened, setBurgerMenuOpened] = useState(false);

  const useFindPath = () => {
    const location = useLocation();
    const [currentPath, setCurrentPath] = useState();
    useEffect(() => {
        setCurrentPath(location.pathname);
    }, [location]);
    return currentPath;
  };

  const backgroundColor = useFindPath() === '/' ? 'header header__color' : 'header';

  function handleBurgerMenuClick() {
    setBurgerMenuOpened(true);
  }

  function handleBurgerMenuClose() {
    setBurgerMenuOpened(false);
  }

  return (
    <header className={backgroundColor}>
      <div className='header__container'>
        <NavLink className="header__logolink"  activeClassName="header__logolink-active" exact to="/">
          <img className="header__logo" src={Logo} alt="Логотип"/>
        </NavLink>

        <Switch>
          <Route exact path="/">
            <div className="header__auth">
              <Link className="header__registry" to="/signup">Регистрация</Link>
              <Link className="header__login" to="/signin">
                <button className="header__link" type="button" aria-label="Войти" title="Войти">Войти</button>
              </Link>
            </div>
          </Route>

          <Route exact path={["/movies", "/saved-movies", "/profile"]}>
            <div className="header__nav">
              <NavLink className="header__nav_films" activeClassName="header__nav_films-active" to="/movies">Фильмы</NavLink>
              <NavLink className="header__nav_films" activeClassName="header__nav_films-active" to="/saved-movies">Сохранённые фильмы</NavLink>
            </div>
            <div className="header__profile">
              <Link className="header__link-accaunt" to="/profile">
                <button type="button" className="header__button-account" title="Аккаунт">Аккаунт</button>
              </Link>
            </div>
            <button type="button" className="header__burgerButton" title="Меню" onClick={handleBurgerMenuClick}><img src={IconBurgrMenu} className="header__burgerMenu_img" alt="Меню"/></button>
            <BurgerMenu isOpen={isBurgerMenuOpened} onClose={handleBurgerMenuClose}/>
          </Route>
        </Switch>
      </div>
    </header>
  );
};

export default Header;