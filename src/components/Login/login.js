import './login.css';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../images/logo.svg';

function Login() {
  return (
    <>
      <section className="login">
        <div className="login__header">
        <NavLink className="login__logo-link" exact to="/">
          <img className="login__logo" src={Logo} alt="Логотип" />
        </NavLink>
          <h1 className="login__title">Рады видеть!</h1>
        </div>
        <form className="login__form">
          <label className='login__container'>
            <span className='login__input-name'>E-mail</span>
            <input type='email' name='email' placeholder='Email' className='login__input' required/>
          </label>
          <label className='login__container'>
            <span className='login__input-name'>Пароль</span>
            <input type='text' name='password' placeholder='Пароль' className='login__input' required/>
          </label>
        </form>
        <button type="submit" className="login__button" title="Войти">Войти</button>
        <div className="login__quest">
          <p className="login__guest-text">Ещё не зарегистрированы?</p>
          <Link to='/signup' className="login__link">Регистрация</Link>
        </div>
      </section>
    </>
  );
};

export default Login;