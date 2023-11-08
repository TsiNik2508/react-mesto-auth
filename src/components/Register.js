import { useState } from "react";
import { Link } from "react-router-dom";

// Экспортируем функциональный компонент Register, принимающий пропс `onRegister`
export default function Register({ onRegister }) {
  // Используем хук `useState` для создания состояния `userData`
  const [userData, setUserData] = useState({});

  // Обработчик отправки формы
  function handleSubmit(evt) {
    evt.preventDefault();
    // Извлекаем пароль и почту
    const { email, password } = userData;
    // Проверяем заполненость
    if (!email || !password) {
      return;
    }
    // Вызываем переданную функцию с данными
    onRegister(userData);
  }

  // Обработчик изменения полей формы
  function handleChange(evt) {
    const { name, value } = evt.target;
    // Обновляем `userData`, для сохранения предыдущих значений
    setUserData({
      ...userData,
      [name]: value,
    });
  }

  // Возвращаем разметку компонента
  return (
    <>
      <div className="reg">
        <h2 className="reg__title">Регистрация</h2>
        <form className="reg__form" onSubmit={handleSubmit} noValidate>
          <input
            name='email'
            className="reg__input"
            type="email"
            placeholder="Email"
            value={userData.email || ''}
            onChange={handleChange}
          />
          <input
            name='password'
            className="reg__input"
            type="password"
            placeholder="Пароль"
            value={userData.password || ''}
            onChange={handleChange}
          />
          <button className="reg__button" type="submit">
            Зарегистрироваться
          </button>
        </form>
        <Link className="reg__link" to="/sign-in">
          Уже зарегистррованы? Войти
        </Link>
      </div>
    </>
  );
}
