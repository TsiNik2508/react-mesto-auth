import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import DeleteCardPopup from "./DeleteCardPopup.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./ProfilePopup.js";
import EditAvatarPopup from "./AvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import { api } from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Register from "./Register.js";
import Login from "./Login.js";
import InfoTooltip from "./InfoTooltip.js";
import *as reg from "./Reg.js"

// Определяем функцию компонента App
function App() {
  // Используем хуки состояния (useState) для управления состоянием различных компонентов и данных
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [cards, setCards] = React.useState([]);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [registered, setRegistered] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const navigate = useNavigate();
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  // Вычисляем признак открытия любого попапа
  const isPopupOpen =
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    isConfirmPopupOpen ||
    isImagePopupOpen;

  // Используем хук useEffect для выполнения запросов к API при загрузке компонента
  React.useEffect(() => {
    // Получаем список начальных карточек и информацию о пользователе
    api
      .getInitialCards()
      .then((cardList) => {
        setCards(cardList);
      })
      .catch((err) => console.log(err));

    api
      .getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((err) => console.log(err));
  }, []);

  // Функция для закрытия всех попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmPopupOpen(false);
  }

  // Функция для закрытия попапа при клике по оверлею
  function closeOnOverlayClick(e) {
    if (e.target === e.currentTarget) {
      closeAllPopups();
    }
  }

  // Функция для закрытия попапов при нажати Escape
  const closePopupsOnEsc = React.useCallback((e) => {
    if (e.key === "Escape") {
      closeAllPopups();
    }
  }, []);

  // Используем хук useEffect для добавления и удаления обработчика Escape
  React.useEffect(() => {
    if (isPopupOpen) {
      document.addEventListener("keydown", closePopupsOnEsc);
      return () => document.removeEventListener("keydown", closePopupsOnEsc);
    }
  }, [isPopupOpen, closePopupsOnEsc]);

  // Функция, которая срабатывает после завершения анимации закрытия попапа
  function handleTransitionEnd() {
    if (!isPopupOpen) {
      setSelectedCard({});
    }
  }

  // Функция для обработки лайка
  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);

    api
      .updateLikeCard(card.id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card.id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Функция для удаления карточки
  function handleCardDelete(card) {
    const isOwn = card.owner._id === currentUser._id;
    setIsLoading(true);

    if (isOwn) {
      api
        .deleteCard(card.id)
        .then(() => {
          setCards((state) => state.filter((c) => c._id !== card.id));
          closeAllPopups();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    }
  }

  // Функция для открытия попапа удаленя карточки
  function handleCardDeleteClick(card) {
    setIsConfirmPopupOpen(true);
    setSelectedCard(card);
  }

  // Функция для открытия попапа с изображением при клике на карточку
  function handleCardImageClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  // Функция для обновления информации о пользователе
  function handleUpdateUser(updateUserInfo) {
    setIsLoading(true);
    api
      .editUserInfo(updateUserInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  // Функция для обновления аватара пользователя
  function handleUpdateAvatar(updateUserAvatar) {
    setIsLoading(true);
    api
      .updateAvatar(updateUserAvatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Функция для добавления новой карточки
  function handleAddPlaceSubmit(newCard) {
    setIsLoading(true);
    api
      .addCard(newCard)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Функция для обработки входа пользователя
function handleLogin(email) {
  setUserEmail(email);
  setLoggedIn(true);
}

// Функция для обработки отправки формы входа
function handleLoginSubmit(password, email) {
  setIsLoading(true);
  // Вызываем функцию аутентификации пользователя
  reg.authorize(password, email)
    .then((data) => {
      if (data.token) {
        // Если аутентификация успешна, сохранякм в локальное хранилище
        localStorage.setItem("token", data.token);
        setUserEmail(email);
        setLoggedIn(true);
        navigate("/");
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
}

// Функция для обработки отправки формы регистрации
function handleRegisterSubmit(password, email) {
  setIsLoading(true);
  // Вызываем функцию регистрации нового пользователя
  reg.register(password, email)
    .then((data) => {
      navigate("/sign-in");
      setRegistered(true);
      handleTooltipOpen();
    })
    .catch((err) => {
      setRegistered(false);
      handleTooltipOpen();
      console.log(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
}

// Функция для проверки наличия токена и входа пользователя
function handleTokenCheck() {
  // Получаем токен из локального хранилища
  const token = localStorage.getItem("token");
  if (!token) {
    return;
  }

  // Получаем информацию о пользователе
  reg.getContent(token)
    .then((res) => {
      if (res) {
        setLoggedIn(true);
        handleLogin(res.data.email);
        navigate("/");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// Функция для выхода пользователя из системы
function handleLogout() {
  localStorage.removeItem("token");
  setLoggedIn(false);
  setUserEmail("");
}

// Функция для открытия статуса
function handleTooltipOpen() {
  setIsInfoTooltipOpen(true);
}


  // Возвращаем JSX-разметку компонента App, включая дочерние компоненты и попапы
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header
            userEmail={userEmail}
            isLoggedIn={loggedIn}
            onLogout={handleLogout}
          />

          <Routes>
            <Route
              path="/"
              element={
                loggedIn ? (
                  <Main
                    cards={cards}
                    onEditProfile={setIsEditProfilePopupOpen}
                    onAddPlace={setIsAddPlacePopupOpen}
                    onEditAvatar={setIsEditAvatarPopupOpen}
                    onCardClick={handleCardImageClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDeleteClick}
                  />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />

            <Route
              path="/sign-up"
              element={
                <Register
                  onSubmit={handleRegisterSubmit}
                  onTokenCheck={handleTokenCheck}
                  onLoading={isLoading}
                />
              }
            />
            <Route
              path="/sign-in"
              element={
                <Login
                  onSubmit={handleLoginSubmit}
                  onTokenCheck={handleTokenCheck}
                  onLoading={isLoading}
                />
              }
            />
            <Route path="*" element={<h2>Not Found</h2>} />
          </Routes>

          {loggedIn && <Footer />}

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onOverlayClick={closeOnOverlayClick}
            onUpdateUser={handleUpdateUser}
            onLoading={isLoading}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onOverlayClick={closeOnOverlayClick}
            onUpdateAvatar={handleUpdateAvatar}
            onLoading={isLoading}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onOverlayClick={closeOnOverlayClick}
            onAddPlace={handleAddPlaceSubmit}
            onLoading={isLoading}
          />

          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
            onOverlayClick={closeOnOverlayClick}
            onTransitionEnd={handleTransitionEnd}
          />

          <DeleteCardPopup
            card={selectedCard}
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
            onOverlayClick={closeOnOverlayClick}
            onTransitionEnd={handleTransitionEnd}
            onCardDelete={handleCardDelete}
            onLoading={isLoading}
          />

          <InfoTooltip
            name="info-tooltip"
            isOpen={isInfoTooltipOpen}
            registered={registered}
            onClose={closeAllPopups}
            onOverlayClick={closeOnOverlayClick}
            onTransitionEnd={handleTransitionEnd}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
