import React from 'react';
import successIcon from '../images/success.svg';
import failIcon from '../images/fail.svg';

 const InfoTooltip = ({isOpen, onClose, isSuccess}) => {

  const successImg = isSuccess ? successIcon : failIcon;
  const succesAltText = isSuccess ? 'Успех' : 'Ошибка';
  const succesText = isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.';
  return (
    <div className={`popup popup_type_tooltip ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_type_tooltip">
        <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose}></button>
        <img className="popup__response-icon" src={successImg} alt={succesAltText}/>
        <p className="popup__text">{succesText}</p>
      </div>
    </div>
  )
}
export default InfoTooltip;
