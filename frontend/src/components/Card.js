import trash from '../images/trash.svg';
import {useContext} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

const Card = ({card, onCardClick, onCardLike, onCardDelete, name, link, likes}) => {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);


  const cardDeleteButtonClassName = `gallery-item__delete ${
    isOwn ? 'gallery-item__delete_visible' : 'gallery-item__delete_hidden'
  }`;
  const cardLikeButtonClassName = `gallery-item__favourite ${isLiked ? 'gallery-item__favourite_active' : ''}`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="gallery-item">
      <img alt={name} className="gallery-item__img" src={link} onClick={handleClick} />
      <img src={trash} className={cardDeleteButtonClassName} alt="Удалить" onClick={handleDeleteClick} />
      <div className="gallery-item__footer">
        <h2 className="gallery-item__title">{name}</h2>
        <div className="gallery-item__likes-wrapper">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Поставить лайк"
            onClick={handleLikeClick}
          ></button>
          <span className="gallery-item__like-counter">{likes.length}</span>
        </div>
      </div>
    </li>
  );
};

export default Card;
