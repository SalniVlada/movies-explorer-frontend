import { React } from 'react';
import { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { useFormWithValidation } from '../../utils/Validation';
import './profile.css';

function Profile({onUpdateUser, errorMessage, setErrorMessage}) {

  const history = useHistory();
  const currentUser = useContext(CurrentUserContext);
  const { values, setValues, errors, isValid, handleChange } = useFormWithValidation();
  const [isEditMode, setIsEditMode] = useState(false);

  function handleUpdateUser(evt) {
    evt.preventDefault();
    onUpdateUser(values.personName, values.personEmail);
  }

  function handleChangeName(evt) {
    handleChange(evt);
    cleanErrorMessage();
  };

  function handleChangeEmail(evt) {
    handleChange(evt);
    cleanErrorMessage();
  };

  function cleanErrorMessage() {
    setErrorMessage('');
  }

  useEffect(() => {
    setValues({personName: currentUser.name, personEmail: currentUser.email});
  }, [currentUser]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(values.personName, values.personEmail);
  }

  function clickEditButton() {
    setIsEditMode(true);
  }

  function clickSaveButton() {
    history.go(0);
  }

  function signOut() {
    localStorage.removeItem('jwt');
    history.push('/');
    history.go(0);
  }

  return (
    <>
      <section className="profile">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <form className="profile__person" noValidate onSubmit={handleUpdateUser}>
          <label className="profile__input-area">
            <span className="profile__text">Имя</span>
            <input type="text" name="personName" className="profile__input" value={values.personName || ""} onChange={handleChangeName} placeholder='Имя'
              minLength={2} maxLength={30} pattern='[A-Za-zА-Яа-яЁё\s-]+' required disabled={!isEditMode} />
          </label>
          <p className='profile__error'>{errors.personName}</p>
          <label className="profile__input-area">
            <span className="profile__text">E-mail</span>
            <input type="text" name="personEmail" className="profile__input" value={values.personEmail || ""} onChange={handleChangeEmail} placeholder='Email'
              minLength={5} maxLength={30} pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$" required disabled={!isEditMode} />
          </label>
          <p className='profile__error'>{errors.personEmail}</p>
          <p className={`profile__error-message ${errorMessage && 'profile__error-message_visible'}`}>{errorMessage}</p>
          <button type="button" className={`profile__button-edit ${!isEditMode || 'profile__button-visible'}`} onSubmit={handleSubmit} onClick={clickEditButton} >Редактировать</button>
          <button type="submit" className={`profile__button-save_disable ${isValid && 'profile__button-save'} ${isEditMode || 'profile__button-visible'}`} onClick={clickSaveButton} >Сохранить</button>
          <button type="button" className={`profile__button-exit ${!isEditMode || 'profile__button-visible'}`} onClick={signOut}>Выйти из аккаунта</button>
        </form>
      </section>
    </>
  );
};

export default Profile;

