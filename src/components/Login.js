import { useEffect } from "react";
import FormValidation from "./FormValidation"; 
import RegForm from "./RegForm"; 

function Login({ onSubmit, onTokenCheck, onLoading }) {
  // Используем хук FormValidation для управления состоянием формы и валидации
  const { values, errors, isValid, handleChange, setValue, formRef } = FormValidation();

  // Эффект для сброса значений
  useEffect(() => {
    setValue("email", "");
    setValue("password", "");
  }, [setValue]);

  // Обработчик отправки формы
  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      const { password, email } = values;
      if (!password || !email) {
        return;
      }
      // Вызываем функцию данными пользователя
      onSubmit(password, email);
    }
  }

  // Отрисовываем компонент формы входа с переданными параметрами
  return (
    <RegForm
      title="Вход"
      name="login"
      buttonText="Войти"
      buttonTextOnLoading="Вход..."
      handleSubmit={handleSubmit}
      onLoading={onLoading}
      isValid={isValid}
      ref={formRef}
    >
      <input
        type="email"
        minLength="2"
        maxLength="30"
        required
        placeholder="Email"
        className="reg-form__input"
        onChange={handleChange}
        name="email"
        value={values["email"] ?? ""}
      />
      <span className="reg-form__input-error">{errors.email}</span>
      <input
        type="password"
        minLength="2"
        maxLength="30"
        required
        placeholder="Пароль"
        className="reg-form__input"
        onChange={handleChange}
        name="password"
        value={values["password"] ?? ""}
      />
      <span className="reg-form__input-error">{errors.password}</span>
    </RegForm>
  );
}

export default Login;
