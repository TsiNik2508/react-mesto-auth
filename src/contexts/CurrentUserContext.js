import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../utils/Api';

// Создаем контекст для хранения данных текущего пользователя
export const CurrentUserContext = createContext();

// Компонент представляет контекст текущего пользователя для всего приложения
export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({
    name: '',
    about: '',
    avatar: '',
  });

  // Получение данных текущего пользователя с сервера
  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser({
          name: userData.name,
          about: userData.about,
          avatar: userData.avatar,
        });
      })
      .catch((error) => {
        console.error('Ошибка при получении пользовательских данных:', error);
      });
  }, []);

  // Предоставляем данные текущего пользователя через контекст для всех дочерних компонентов
  return (
    <CurrentUserContext.Provider value={currentUser}>
      {children}
    </CurrentUserContext.Provider>
  );
};
