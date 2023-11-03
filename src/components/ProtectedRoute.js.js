import { Navigate } from "react-router-dom";

// Компонент для защищенных маршрутов
function ProtectedRoute({ element: Component, ...props }) {
  // Если пользователь авторизован (вошел в систему), отрисовать переданный компонент
  // Иначе перенаправить пользователя на страницу входа
  return props.loggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to="/sign-in" replace />
  );
}

export default ProtectedRoute;
