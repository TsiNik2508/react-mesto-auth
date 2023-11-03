import { Link, Routes, Route } from "react-router-dom";
import logo from '../images/logo.svg';

function Header({ userEmail, isLoggedIn, onLogout }) {
  return (
    <header className="header">
      <img src={logo} alt="Место" className="header__logo" />
      <div className="header__menu">
        {isLoggedIn ? <p className="header__menu-content">{userEmail}</p> : ""} {/* Отображаем email пользователя, если он вошел в систему, иначе не показываем ничего */}

        <Routes>
          <Route
            path="/"
            element={
              <Link
                to="/sign-in"
                className="header__menu-content"
                onClick={onLogout}
              >
                Выйти
              </Link>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Link to="/sign-up" className="header__menu-content">
                Регистрация
              </Link>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in" className="header__menu-content">
                Войти
              </Link>
            }
          />
        </Routes>
      </div>
    </header>
  );
}

export default Header;
