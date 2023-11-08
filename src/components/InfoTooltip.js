import React from "react";
import successIcon from "../images/success-icon.png";
import failIcon from "../images/fail-icon.png";

export default function InfoTooltip({ onClose, isOpen, loginStatus }) {
  return (
    <div className={`popup popup__info-tool ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="button popup__close"
          aria-label="Close"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="popup__tool-image"
          src={loginStatus ? successIcon : failIcon}
          alt="Статус входа"
        />
        <h2 className="popup__tool-title">
          {loginStatus
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте еще раз."}
        </h2>
      </div>
    </div>
  );
}
