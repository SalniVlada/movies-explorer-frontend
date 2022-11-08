import { React } from 'react';
import { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { useFormWithValidation } from '../../utils/Validation';
import './profile.css';

function Profile({onUpdateUser, onLogout, errorMessage, setErrorMessage, succesMessage}) {

  const history = useHistory();
  const currentUser = useContext(CurrentUserContext);
  const { values, setValues, errors, isValid, handleChange } = useFormWithValidation();
  const [isChanged, setIsChanged] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    setIsChanged(values.personName !== currentUser.name || values.personEmail !== currentUser.email);
  }, [values, currentUser]);

  function handleUpdateUser(evt) {
    evt.preventDefault();
    onUpdateUser(values.personName, values.personEmail);
    setIsEditMode(false);
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

  function clickEditButton() {
    setIsEditMode(true);
  }

  function signOut() {
    onLogout();
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
          <p className={`profile__succes-message ${succesMessage && 'profile__succes-message_visible'}`}>{succesMessage}</p>
          <button type="button" className={`profile__button-edit ${!isEditMode || 'profile__button-visible'}`} onClick={clickEditButton} >Редактировать</button>
          <button type="submit" className={`profile__button-save_disable ${isValid && isChanged && 'profile__button-save'} ${isEditMode || 'profile__button-visible'}`} >Сохранить</button>
          <button type="button" className={`profile__button-exit ${!isEditMode || 'profile__button-visible'}`} onClick={signOut}>Выйти из аккаунта</button>
        </form>
      </section>
    </>
  );
};

export default Profile;

