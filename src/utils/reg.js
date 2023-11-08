  // Базовый URL для взаимодействия с сервером
  export const baseUrl = "https://auth.nomoreparties.co";

  // Функция для регистрации нового пользователя
  export function register({ email, password }) {
    return fetch(`${baseUrl}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(checkResponse)
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  // Функция для аутентификации пользователя
  export function authorize({ email, password }) {
    return fetch(`${baseUrl}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(checkResponse)
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  // Функция для получения данных о пользователе после аутентификации
  export function getContent(token) {
    return fetch(`${baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(checkResponse)
      .catch((err) => {
        console.log(err);
        throw err;
      });
  }

  // Функция для проверки HTTP-ответа
  function checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }
