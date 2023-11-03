import { Link } from "react-router-dom";
import { forwardRef } from "react";

// общая форма для входа и регистрации
const RegForm = forwardRef(
  (
    {
      title,
      name,
      buttonText,
      buttonTextOnLoading,
      linkText = "",
      handleSubmit,
      isValid,
      onLoading,
      children,
    },
    ref
  ) => {
    return (
      <form
        action="#"
        name={name}
        onSubmit={handleSubmit}
        noValidate
        className="reg-form"
        ref={ref}
      >
        <h2 className="reg-form__title">{title}</h2>
        {children}
        <button
          type="submit"
          aria-label=""
          className={`reg-form__button ${!isValid && "reg-form__button_disabled"}`}
        >
          {isValid && onLoading ? buttonTextOnLoading : buttonText}
        </button>
        <Link to="/sign-in" className="reg-form__link">
          {linkText}
        </Link>
      </form>
    );
  }
);

export default RegForm;
