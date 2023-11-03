import { useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({
  cards,           // Список карточек
  onEditProfile,   // Функция открытия редактирования профиля
  onAddPlace,      // Функция открытия добавления новой карточки
  onEditAvatar,    // Функция открытия редактирования аватара
  onCardClick,     // Функция открытия попапа с увеличенной картинкой
  onCardLike,      // Функция вызова для постановки/снятия лайка
  onCardDelete,    // Функция вызова для удаления карточки
}) {
  const user = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__container-avatar">
          <img
            src={user.avatar}
            alt="Аватар профиля"
            className="profile__avatar"
            onClick={() => {
              onEditAvatar(true);
            }}
          />
        </div>

        <div className="profile__info">
          <div className="profile__info-box">
            <h1 className="profile__title">{user.name}</h1>
            <button
              type="button"
              aria-label="Редактировать профиль"
              className="profile__edit-button"
              onClick={() => {
                onEditProfile(true);
              }}
            ></button>
          </div>
          <p className="profile__bio">{user.about}</p>
        </div>
        <button
          type="button"
          aria-label="Добавить карточку"
          className="profile__add-button"
          onClick={() => {
            onAddPlace(true);
          }}
        ></button>
      </section>

      <section className="elements">
        {cards.map((card) => (
          <Card
            name={card.name}
            link={card.link}
            likes={card.likes}
            key={card._id}
            id={card._id}
            owner={card.owner}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
