import { Link, Routes, Route } from "react-router-dom";
import logo from '../images/logo.svg';

function Header({ userData, logOut }) {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="логотип" />
      <Routes>
        <Route
          path="/sign-in"
          element={
            <Link className="header__button" to="/sign-up">
              Зарегестрироваться
            </Link>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link className="header__button" to="/sign-in">
              Войти
            </Link>
          }
        />
        <Route
          path="/"
          element={
            <>
              <p className="header__info">{userData.email}</p>
              <button
                className='header__button header__button_disable'
                onClick={logOut}
              >
                Выйти
              </button>
            </>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;