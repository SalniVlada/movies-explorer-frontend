import './register.css';
import { Link, NavLink} from 'react-router-dom';
import logo from '../../images/logo.svg';


function Register() {
  return (
    <>
      <section className="register">
        <div className="register__header">
          <NavLink className="register__logo-link" exact to="/">
            <img className="register__img" src={logo} alt="Логотип" />
          </NavLink>
          <h1 className="register__title">Добро пожаловать!</h1>
        </div>
        <form className="register__form">
          <label className='register__container'>
            <span className='register__input-name'>Имя</span>
            <input type='text' name='text' placeholder='Имя' className='register__input' required/>
          </label>
          <label className='register__container'>
            <span className='register__input-name'>E-mail</span>
            <input type='email' name='email' placeholder='Email' className='register__input' required/>
          </label>
          <label className='register__container'>
            <span className='register__input-name'>Пароль</span>
            <input type='password' name='password' placeholder='Пароль' className='register__input' required/>
            <span className='register__error'>Что-то пошло не так...</span>
          </label>
        </form>
        <button type="submit" className="register__button" title="Зарегистрироваться">Зарегистрироваться</button>
        <div className="register__quest">
          <p className="register__guest-text">Уже зарегистрированы?</p>
          <Link to='/signin' className="register__link">Войти</Link>
        </div>
      </section>
    </>
  );
};

export default Register;
