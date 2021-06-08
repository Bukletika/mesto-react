import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

  const currentUserData = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('test');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUserData.name);
    setDescription(currentUserData.about);
  }, [currentUserData]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

    return (
      <PopupWithForm
        title="Редактировать профиль"
        name="profile"
        children={
          <fieldset className="form__author">
            <input className="form__item popup__input form__item_el_name" value={name || ''} onChange={handleChangeName} id="profile-name" name="name" type="text" placeholder="Имя" minLength="2"  maxLength="40" required />
            <span id="profile-name-error" className="popup__error">Вы пропустили это поле</span>
            <input className="form__item popup__input form__item_el_about" onChange={handleChangeDescription} value={description || ''} id="profile-about" name="about" type="text" placeholder="О себе" minLength="2" maxLength="200" required />
            <span id="profile-about-error" className="popup__error"></span>
          </fieldset>
        }
        isSubmitted={props.isSubmitted}
        submitBtnText="Сохранить"
        submitBtnLoadText="Сохранение..."
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
      />

    );
}

export default EditProfilePopup;
