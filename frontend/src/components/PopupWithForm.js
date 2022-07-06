const PopupWithForm = ({
  isOpen,
  onClose,
  title,
  name,
  onSubmit,
  children,
  buttonText
}) => {

  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        <form
          action="/"
          method="post"
          className="form"
          name={name}
          id={`${name}-form`}
          onSubmit={onSubmit}
        >
          {children}
          <button className="form__submit" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};
export default PopupWithForm;
