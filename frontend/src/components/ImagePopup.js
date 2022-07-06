const ImagePopup = ({card, onClose}) => {
  const cardName = card ? card.name : '';
  const cardLink = card ? card.link : '#';

  return (
    <div className={`popup popup_type_fullscreen-img ${card ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_type_image">
        <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose}></button>
        <img src={cardLink} alt={cardName} className="popup__img" />
        <p className="popup__img-name">{cardName}</p>
      </div>
    </div>
  );
};
export default ImagePopup;
