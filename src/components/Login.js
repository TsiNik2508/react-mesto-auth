import { useState } from "react";

export default function Login({ onLogin }) {
  const [userData, setUserData] = useState({});

  // Обработчик изменения значений в полях ввода
  function handleInputChange(evt) {
    const { name, value } = evt.target;
    setUserData({
      ...userData,
      [name]: value
    })
  }

  // Обработчик отправки формы
  function handleSubmit(evt) {
    evt.preventDefault();
    const { email, password } = userData;

    // Проверка наличия введенных данных
    if (!email || !password) {
      return;
    }

    // Вызов функции для входа пользователя
    onLogin(userData);
  }

  return (
    <>
      <div className="reg">
        <h2 className="reg__title">Вход</h2>
        <form className="reg__form" onSubmit={handleSubmit} noValidate>
          <input
            name="email"
            className="reg__input"
            type="Email"
            placeholder="Email"
            value={userData.email || ''}
            onChange={handleInputChange}
          />
          <input
            name="password"
            className="reg__input"
            type="password"
            placeholder="Пароль"
            value={userData.password || ''}
            onChange={handleInputChange}
          />
          <button className="reg__button" type="submit">
            Войти
          </button>
        </form>
      </div>
    </>
  );
}
