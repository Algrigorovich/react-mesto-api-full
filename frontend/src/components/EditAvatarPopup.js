import React from 'react';
import PopupWithForm from './PopupWithForm';
import {useRef} from 'react';

const EditAvatarPopup = ({isOpen, onClose, onUpdateAvatar}) => {
  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
    e.target.reset();
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <label htmlFor="avatar-link" className="form__field">
        <input
          type="url"
          className="form__input"
          required
          id="avatar-link"
          name="avatar-link"
          placeholder="Ссылка на аватар"
          ref={inputRef}
        />
        <span className="form__input-error avatar-link-input-error form__input-error_active">Ошибка</span>
      </label>
    </PopupWithForm>
  );
};
export default EditAvatarPopup;
