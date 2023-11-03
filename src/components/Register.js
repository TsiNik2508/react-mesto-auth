import { useEffect } from "react";
import FormValidation from "./FormValidation";
import RegForm from "./RegForm";

function Register({ onSubmit, onTokenCheck, onLoading }) {
  const { values, errors, isValid, handleChange, setValue, formRef } =
    FormValidation();

  // Сбрасываем значения почты и пароля
  useEffect(() => {
    setValue("email", "");
    setValue("password", "");
  }, [setValue]);

  // Функция для обработки отправки формы
  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      const { password, email } = values;
      onSubmit(password, email);
    }
  }

  // Проверяем наличие токена 
  useEffect(() => {
    onTokenCheck();
  }, []);

  return (
    <RegForm
      title="Регистрация"
      name="register"
      buttonText="Зарегистрироваться"
      buttonTextOnLoading="Регистрация..."
      linkText="Уже зарегистрированы? Войти"
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

export default Register;
