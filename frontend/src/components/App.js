import {useState, useEffect} from 'react';
import api from '../utils/api'; // спасибо, видимо гит не посчитал переименование за изменение, поправил
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import auth from '../utils/auth';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {Route, Switch, Redirect, useHistory} from 'react-router-dom';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [email, setEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getProfileData(), api.getInitialCards()])
      .then(([user, cardList]) => {
        setCurrentUser(user);
        setCards(cardList);
      })
      .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  const handleUpdateUser = ({name, about}) => {
    api
      .editProfile(name, about)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateAvatar = ({avatar}) => {
    api
      .updateAvatar(avatar)
      .then(() => {
        setCurrentUser({...currentUser, avatar});
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    const likeAction = isLiked ? api.deleteCardLike(card._id) : api.setCardLike(card._id);

    likeAction
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((items) => items.filter((c) => c._id !== card._id && c));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleAddPlaceSubmit({name, link}) {
    api
      .addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const hadleCardClick = (card) => {
    setSelectedCard(card);
  };
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setInfoTooltipPopupOpen(false);
  };

  // Авторизация
  const handleRegister = ({password, email}) => {
    auth
      .register(email, password)
      .then((res) => {
        setInfoTooltipPopupOpen(true);
        setIsSuccess(true);
        history.push('/sign-in');
      })
      .catch((err) => {
        setInfoTooltipPopupOpen(true);
        setIsSuccess(false);
        console.log(err)
      });
  };

  const handleLogin = ({password, email}) => {
    auth
      .authorize(email, password)
      .then((res) => {
        setLoggedIn(true);
        setEmail(email);
        history.push('/');
      })
      .catch((err) => {
        setInfoTooltipPopupOpen(true);
        setIsSuccess(false);
        console.log(err);
      })
  };

  const handleSignOut = () => {
    api
    .logout()
    .then((res) => {
      setLoggedIn(false);
      setEmail('');
      history.push('/sign-in');
    })
    .catch((err) => {
      console.log(err);
    })
  };

  const tokenCheck = () => {
    auth
      .getContent()
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setEmail(res.email);
          history.push('/');
        }
      })
      .catch((err) => console.error(err));
  }


  useEffect(() => {
    tokenCheck();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header onSignOut={handleSignOut} email={email} />

        <Switch>
          <ProtectedRoute
            onEditAvatarClick={handleEditAvatarClick}
            onEditProfileClick={handleEditProfileClick}
            onAddPlaceClick={handleAddPlaceClick}
            onCardClick={hadleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            component={Main}
            loggedIn={loggedIn}
            exact
            path="/"
          />

          <Route path="/sign-in">
            <Login onLogin={handleLogin}/>
          </Route>

          <Route path="/sign-up">
            <Register onRegister={handleRegister}/>
          </Route>

          <Route>{loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}</Route>
        </Switch>

        {loggedIn && <Footer />}

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        <PopupWithForm name="confirm" title="Вы уверены?" buttonText="Да" />

        <InfoTooltip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} isSuccess={isSuccess} />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
