import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.js";
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
import * as reg from "../utils/reg.js";

// Определяем функцию компонента App
function App() {
  // Используем хуки состояния (useState) для управления состоянием различных компонентов и данных
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [loadingForm, setLoadingForm] = useState(false);
  const [cards, setCards] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const token = localStorage.getItem("jwt");
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);

  // Вычисляем признак открытия любого попапа
  const isPopupOpen =
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    isConfirmPopupOpen ||
    isImagePopupOpen;

  // Используем хук useEffect для выполнения запросов к API при загрузке компонента
  useEffect(() => {
    if (isLoggedIn) {
      // Получаем список начальных карточек и информацию о пользователе
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  // Эффект для проверки токена и автоматической авторизации
  useEffect(() => {
    if (!token) {
      return;
    }
    reg
      .getContent(token)
      .then((userData) => {
        setUserData(userData.data);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Функция для закрытия всех попапов
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard(null);
  }

  // Функция для закрытия попапа при клике по оверлею
  function closeOnOverlayClick(e) {
    if (e.target === e.currentTarget) {
      closeAllPopups();
    }
  }

  // Функция для закрытия попапов при нажатии Escape
  const closePopupsOnEsc = (e) => {
    if (e.key === "Escape") {
      closeAllPopups();
    }
  };

  // Используем хук для добавления и удаления обработчика Escape
  useEffect(() => {
    if (isPopupOpen) {
      document.addEventListener("keydown", closePopupsOnEsc);
      return () => document.removeEventListener("keydown", closePopupsOnEsc);
    }
  }, [isPopupOpen]);

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
    if (isOwn) {
      api
        .deleteCard(card.id)
        .then(() => {
          setCards((state) => state.filter((c) => c._id !== card.id));
          closeAllPopups();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // Функция для открытия попапа удаления карточки
  function handleCardDeleteClick(card) {
    setIsConfirmPopupOpen(true);
    setSelectedCard(card);
  }

  // Функция для открытия попапа с изображением при клике на карточку
  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  // Функция для обновления информации о пользователе
  function handleUpdateUser(data) {
    setLoadingForm(true);
    api
      .editUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingForm(false));
  }

  // Функция для обновления аватара пользователя
  function handleUpdateAvatar(data) {
    setLoadingForm(true);
    api
      .updateAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingForm(false));
  }

  // Функция для добавления новой карточки
  function handleAddPlaceSubmit(data) {
    setLoadingForm(true);
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingForm(false));
  }
  // Функция для обработки входа пользователя и отправки формы
  function handleLogin(dataLogin) {
    reg
      .authorize(dataLogin)
      .then((dataUser) => {
        localStorage.setItem("jwt", dataUser.token);
        setLoginStatus(true);
        setUserData(dataLogin);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // Функция для обработки отправки формы регистрации
  function handleRegister(dataRegister) {
    reg
      .register(dataRegister)
      .then(() => {
        setIsInfoTooltipPopupOpen(true);
        setLoginStatus(true);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipPopupOpen(true);
      });
  }
  //Функция для выхода пользователя из системы
  function logOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setUserData({});
    navigate("/sign-in");
  }

  function handleEditAvatarClick() {
    setIsEditAvatarOpen(true);
  }

  // Возвращаем JSX-разметку компонента App, включая дочерние компоненты и попапы
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header userData={userData} isLoggedIn={isLoggedIn} logOut={logOut} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                loggedIn={isLoggedIn}
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={setIsAddPlacePopupOpen}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDeleteClick}
                cards={cards}
                userData={userData}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register onRegister={handleRegister} isLoggedIn={isLoggedIn} />
            }
          />
          <Route
            path="/sign-in"
            element={<Login onLogin={handleLogin} isLoggedIn={isLoggedIn} />}
          />
          <Route
            path="/*"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <Navigate to="/sign-in" replace />
              )
            }
          />
        </Routes>
        {isLoggedIn && <Footer />}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onOverlayClick={closeOnOverlayClick}
          onUpdateUser={handleUpdateUser}
          isLoadingForm={loadingForm}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onOverlayClick={closeOnOverlayClick}
          onUpdateAvatar={handleUpdateAvatar}
          isLoadingForm={loadingForm}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onOverlayClick={closeOnOverlayClick}
          onAddPlace={handleAddPlaceSubmit}
          isLoadingForm={loadingForm}
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
        />
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          loginStatus={loginStatus}
          onClose={closeAllPopups}
          onOverlayClick={closeOnOverlayClick}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
