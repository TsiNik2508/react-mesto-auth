import { useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";
import useFormValidation from "./FormValidation.js";

// Компонент AvatarPopup, отвечающий за форму обновления аватара пользователя
function AvatarPopup({
  isOpen, 
  onClose, 
  onOverlayClick, 
  onUpdateAvatar,
  onLoading,
}) {
  // Используем хук useFormValidation для управления состоянием формы и валидации
  const { values, errors, isValid, handleChange, setValue, reset, formRef } =
    useFormValidation();

  // Используем хук useEffect для сброса значения поля аватара при открытии попапа
  useEffect(() => {
    setValue("avatar", "");
  }, [isOpen, setValue]);

  // Функция дляотправки формы
  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      onUpdateAvatar({ avatar: values.avatar });
    }
  }

  // Функция для закрытия попапа и сброса формы
  const onClosePopup = () => {
    onClose();
    reset();
  };

  return (
    // Рендеринг компонента PopupWithForm с формой обновления аватара
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={isOpen}
      onClose={onClosePopup}
      onOverlayClick={onOverlayClick}
      onSubmit={handleSubmit}
      onLoading={onLoading}
      isValid={isValid}
      ref={formRef}
    >
      <input
        name="avatar"
        value={values["avatar"] ?? ""}
        type="url"
        onChange={handleChange}
        placeholder="Ссылка на картинку"
        id="image-link"
        className="popup__input popup__input_type_avatar"
        required
      />
      <span className="popup__input-error">{errors["avatar"]}</span>
    </PopupWithForm>
  );
}

export default AvatarPopup;
