import './register.css';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { useFormWithValidation } from '../../utils/Validation';


function Register({onRegister, isDisabledButton, errorMessage, setErrorMessage}) {

  const { values, errors, isValid, handleChange } = useFormWithValidation();

  function handleRegister(evt) {
    evt.preventDefault();
    onRegister(values.name, values.email, values.password);
  }

  function handleInputsChange(evt) {
    handleChange(evt);
    cleanErrorMessage();
  }

  function cleanErrorMessage() {
    setErrorMessage('');
  }

  return (
    <>
      <section className="register">
        <div className="register__header">
          <NavLink className="register__logo-link" exact to="/">
            <img className="register__img" src={logo} alt="Логотип" />
          </NavLink>
          <h1 className="register__title">Добро пожаловать!</h1>
        </div>
        <form className="register__form" onSubmit={handleRegister}>
          <label className='register__container'>
            <span className='register__input-name'>Имя</span>
            <input type='text' name='name' placeholder='Имя' className='register__input' value={values.name || ""} onChange={handleInputsChange}
            minLength={2} maxLength={30} pattern='[A-Za-zА-Яа-яЁё\s-]+' required/>
            <span className='register__error'>{errors.name}</span>
          </label>
          <label className='register__container'>
            <span className='register__input-name'>E-mail</span>
            <input type='email' name='email' placeholder='Email' className='register__input' value={values.email || ""} onChange={handleInputsChange} 
            minLength={5} maxLength={30} pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$" required/>
            <span className='register__error'>{errors.email}</span>
          </label>
          <label className='register__container'>
            <span className='register__input-name'>Пароль</span>
            <input type='password' name='password' placeholder='Пароль' className='register__input' value={values.password || ""} onChange={handleInputsChange}
            minLength={8} maxLength={30} required/>
            <span className='register__error'>{errors.password}</span>
          </label>
          <p className={`register__error-message ${errorMessage && 'register__error-message_visible'}`}>{errorMessage}</p>
          <button type="submit" className={`register__button ${!isValid && 'register__button_disabled'}`} 
          disabled={!isValid || isDisabledButton} title="Зарегистрироваться">Зарегистрироваться</button>
        </form>
        <div className="register__quest">
          <p className="register__guest-text">Уже зарегистрированы?</p>
          <Link to='/signin' className="register__link" onClick={cleanErrorMessage}>Войти</Link>
        </div>
      </section>
    </>
  );
};

export default Register;
