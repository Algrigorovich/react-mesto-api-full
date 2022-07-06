import {useState} from 'react';

const Login = ({onLogin}) => {
  const [formValues, setFormValues] = useState({password: '', email: ''});

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(formValues);
  }

  function handleChange(e) {
    const {name, value} = e.target;
    setFormValues((prevState) => ({...prevState, [name]: value}));
  }

  return (
    <div className="page__content">
      <h1 className="page__title">Вход</h1>
      <form action="/" method="post" className="form page__form" name="login" onSubmit={handleSubmit}>
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
          Войти
        </button>
      </form>
    </div>
  );
};
export default Login;
