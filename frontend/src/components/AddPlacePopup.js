import PopupWithForm from './PopupWithForm';
import {useState, useEffect} from 'react';

const AddPlacePopup = ({isOpen, onClose, onAddPlace}) => {
  const [formValues, setFormValues] = useState({name: '', link: ''});

  useEffect(() => {
    setFormValues({name: '', link: ''});
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(formValues);
    e.target.reset();
  }

  function handleChange(e) {
    const {name, value} = e.target;
    setFormValues((prevState) => ({...prevState, [name]: value}));
  }

  return (
    <PopupWithForm
      name="add-item"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Создать"
      onSubmit={handleSubmit}
    >
      <label htmlFor="card-title" className="form__field">
        <input
          type="text"
          value={formValues.name || ''}
          className="form__input"
          required
          id="card-title"
          name="name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          onChange={handleChange}
        />
        <span className="form__input-error card-title-input-error">Ошибка</span>
      </label>
      <label htmlFor="card-link" className="form__field">
        <input
          type="url"
          className="form__input"
          required
          value={formValues.link || ''}
          id="card-link"
          name="link"
          placeholder="Ссылка на картинку"
          onChange={handleChange}
        />
        <span className="form__input-error card-link-input-error form__input-error_active">Ошибка</span>
      </label>
    </PopupWithForm>
  );
};
export default AddPlacePopup;
