import {Link} from 'react-router-dom';
import {useState} from 'react';

const Register = ({onRegister}) => {
  const [formValues, setFormValues] = useState({password: '', email: ''});

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(formValues);
  }

  function handleChange(e) {
    const {name, value} = e.target;
    setFormValues((prevState) => ({...prevState, [name]: value}));
  }

  return (
    <div className="page__content">
      <h1 className="page__title">Регистрация</h1>
      <form action="/" method="post" className="form page__form" name="registration" onSubmit={handleSubmit}>
        <label htmlFor="email" className="form__field">
          <input
            value={formValues.email || ''}
            className="form__input form__input_place_page"
            required
            id="user-email"
            name="email"
            type="email"
            placeholder="Email"
            minLength="2"
            maxLength="30"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="card-link" className="form__field">
          <input
            type="password"
            className="form__input form__input_place_page"
            required
            value={formValues.password || ''}
            id="user-password"
            name="password"
            placeholder="Пароль"
            onChange={handleChange}
          />
        </label>
        <button className="form__submit form__submit_place_page" type="submit">
          Зарегистрироваться
        </button>
        <p className="form__helper">
          Уже зарегистрированы?{' '}
          <Link className="form__link" to="/sign-in">
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
};
export default Register;
