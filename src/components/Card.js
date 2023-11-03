import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card(card) {
  // Используем хук useContext для получения информации о пользователе
  const user = useContext(CurrentUserContext);

  // Проверяем, является ли пользователь владельцем карточки
  const isOwn = card.owner._id === user._id;

  // Проверяем, поставил ли пользователь лайк этой карточке
  const isLiked = card.likes.some((like) => like._id === user._id);

  // Определяем класс для кнопки лайка на основе состояния isLiked
  const cardLikeButtonClassName = `element__button ${isLiked && "element__button_active"}`;

  // Функция для клика на карточку и открытия полноразмерного изображения
  function handleCardClick() {
    card.onCardClick(card);
  }

  // Функция для клика на кнопку лайка
  function handleLikeClick() {
    card.onCardLike(card);
  }

  // Функция для обработки клика на кнопку удаления
  function handleCardDeleteClick() {
    card.onCardDelete(card);
  }

  return (
    <article className="element">
      {isOwn && (
        <button
          type="button"
          aria-label="Удалить"
          className="element__thrash-button"
          onClick={handleCardDeleteClick}
        ></button>
      )}
      <img
        src={card.link}
        alt={card.name}
        className="element__img"
        onClick={handleCardClick}
      />
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <button
          type="button"
          aria-label="Поставить лайк"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        ></button>
        <p
          className={`element__like-count ${
            card.likes.length > 0 && "element__like-count_active"
          }`}
        >
          {card.likes.length}
        </p>
      </div>
    </article>
  );
}

export default Card;
