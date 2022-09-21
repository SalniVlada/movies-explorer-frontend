import './profile.css';

function Profile() {

  //const []
  return (
    <>
      <section className="profile">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <form className="profile__person" novalidate>
          <label className="profile__input-area">
            <span className="profile__text">Имя</span>
            <input type="text" name="personName" className="profile__input" placeholder='Виталий' required />
          </label>
          <label className="profile__input-area">
            <span className="profile__text">E-mail</span>
            <input type="text" name="personEmail" className="profile__input" placeholder="salnivlada@ya.ru" required />
          </label>
          <button type="submit" className="profile__button-edit">Редактировать</button>
          <button type="button" className="profile__button-exit">Выйти из аккаунта</button>
          {/* <button type="submit" className="profile__button-save">Сохранить</button>
          <p className="profile__error-message">При обновлении профиля произошла ошибка.</p>
          <button type="submit" className="profile__button-save_disable">Сохранить</button> */}
        </form>
      </section>
    </>
  );
};

export default Profile;

