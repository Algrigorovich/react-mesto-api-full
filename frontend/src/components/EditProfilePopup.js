import {useState, useEffect, useContext} from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

const EditProfilePopup = ({isOpen, onClose, onUpdateUser}) => {
  const currentUser = useContext(CurrentUserContext);
  const [about, setAbout] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about,
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeAbout(e) {
    setAbout(e.target.value);
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="form__field">
        <input
          type="text"
          className="form__input"
          id="name"
          name="name"
          value={name || ''}
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
          onChange={handleChangeName}
        />
        <span className="form__input-error name-input-error">Ошибка</span>
      </label>
      <label htmlFor="about" className="form__field">
        <input
          type="text"
          className="form__input"
          id="about"
          name="info"
          value={about || ''}
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200"
          onChange={handleChangeAbout}
        />
        <span className="form__input-error about-input-error">Ошибка</span>
      </label>
    </PopupWithForm>
  );
};
export default EditProfilePopup;
