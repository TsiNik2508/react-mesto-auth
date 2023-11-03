function InfoTooltip({
  name,
  isOpen,
  registered,
  onClose,
  onOverlayClick,
  onTransitionEnd,
}) {
  return (
    <div
      className={`popup popup_${name} ${isOpen && "popup_opened"}`}
      onClick={onOverlayClick}
      onTransitionEnd={onTransitionEnd}
    >
      <div className="popup__container">
        <div className="popup__tool-content">
          <img
            className="popup__tool-image"
            src={
              registered
                ? require("../images/success-icon.png")
                : require("../images/fail-icon.png")
            }
            alt="статус отправки"
          />
          <h2 className="popup__title popup__tool-title">
            {registered
              ? "Вы успешно зарегистрировались!"
              : `Что-то пошло не так!
Попробуйте ещё раз.`}
          </h2>
        </div>

        <button
          type="button"
          className="popup__close-button"
          onClick={() => {
            onClose(true);
          }}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;