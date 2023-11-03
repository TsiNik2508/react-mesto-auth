import React from "react";
const PopupWithForm = React.forwardRef(
  (
    {
      title,               // Заголовок попапа
      name,                // Имя попапа
      buttonText = "Сохранить", // Текст на кнопке сохарнения
      buttonTextOnLoading = "Сохранение",  // Текст на кнопке во время загрузки
      isOpen, // Состояние попапа
      onClose, // Функция для закрытия попапа
      onOverlayClick, // Функция для закрытия попапа при клике на оверлей
      onTransitionEnd, // Функция, вызываемая при завершении анимации
      onSubmit, // Функция для обработки события отправки формы
      onLoading, // Состояние загрузки
      isValid, // Валидность формы
      children, // Дочерние компоненты формы
    },
    ref
  ) => {
    return (
      <div
        className={`popup popup_${name} ${isOpen && "popup_opened"}`}
        onClick={onOverlayClick}
        onTransitionEnd={onTransitionEnd}
      >
        <div className="popup__container">
          <form
            action="#"
            onSubmit={onSubmit}
            name={name}
            className="popup__form"
            noValidate
            ref={ref}
          >
            <h2 className="popup__title">{title}</h2>
            {children} {/* Вставляем дочерние компоненты внутрь формы */}
            <button
              type="submit"
              aria-label="Сохранить"
              className={`popup__button ${!isValid && "popup__button_disabled"}`}
            >
              {/* Изменяем текст кнопки в зависимости от состояния загрузки и валидности формы */}
              {isValid && onLoading ? buttonTextOnLoading : buttonText}
            </button>
          </form>
          <button
            type="button"
            className="popup__close"
            onClick={() => {
              onClose(true);
            }}
          ></button>
        </div>
      </div>
    );
  }
);

export default PopupWithForm;
