function ImagePopup({
  card,
  isOpen,
  onClose,
  onOverlayClick, 
  onTransitionEnd, 
}) {
  return (
    <div
      className={`popup popup_type-card ${isOpen && "popup_opened"}`} // Устанавливаем классы в зависимости от состояния попапа
      onClick={onOverlayClick} // Обрабатываем клик на оверлей попапа, чьобы закрыть его
      onTransitionEnd={onTransitionEnd} // Обрабатываем завершение анимации
    >
      <div className="popup__card">
        <img src={card?.link} alt={card?.name} className="popup__img" /> 
        <button
          type="button"
          className="popup__close popup__close-card"
          onClick={onClose} // Обрабатываем клик кнопке закрытия попапа
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
