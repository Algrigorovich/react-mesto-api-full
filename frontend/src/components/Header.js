import logo from '../images/logo.svg';
import {Link, Switch, Route} from 'react-router-dom';

const Header = ({email, onSignOut}) => {
  return (
    <header className="header page__header">
      <a href="/" className="logo">
        <img className="logo__img" src={logo} alt="Логотип" />
      </a>
      <Switch>
        <Route exact path="/sign-up">
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>
        </Route>
        <Route exact path="/sign-in">
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        </Route>
        <Route exact path="/">
          <div className="header__wrapper">
            <p className="header__email">{email}</p>
            <Link className="header__link header__link_exit" to="/sign-in" onClick={onSignOut}>
              Выйти
            </Link>
          </div>
        </Route>
      </Switch>
    </header>
  );
};
export default Header;
