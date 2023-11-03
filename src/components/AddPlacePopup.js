import { useEffect } from "react";
import useFormValidation from "./FormValidation.js";
import PopupWithForm from "./PopupWithForm.js";

// Компонент отвечающий за форму добавления нового места
function AddPlacePopup({
  isOpen,
  onClose,
  onOverlayClick,
  onAddPlace,
  onLoading,
}) {
  // Используем хук useFormValidation для управления формой валидации
  const { values, errors, isValid, handleChange, setValue, reset, formRef } =
    useFormValidation();

  // Используем хук useEffect для сброса формы при открытии попапа
  useEffect(() => {
    setValue("name", "");
    setValue("link", "");
  }, [isOpen, setValue]);

  // Функция для обработки отправки формы
  function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      onAddPlace({ name: values.name, link: values.link });
    }
  }

  // Функция для закрытия попапа и сброса формы
  const onClosePopup = () => {
    onClose();
    reset();
  };

  return (
    // Рендеринг компонента PopupWithForm с формой добавления нового места
    <PopupWithForm
      title="Новое место"
      name="add"
      isOpen={isOpen}
      onClose={onClosePopup}
      onOverlayClick={onOverlayClick}
      onSubmit={handleSubmit}
      onLoading={onLoading}
      isValid={isValid}
      ref={formRef}
    >
      <input
        name="name"
        value={values["name"] ?? ""}
        type="text"
        onChange={handleChange}
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        id="locate-name"
        className="popup__input popup__input_type_name"
      />
      <span className="popup__input-error">{errors.name}</span>
      <input
        name="link"
        value={values["link"] ?? ""}
        type="url"
        onChange={handleChange}
        placeholder="Ссылка на картинку"
        required
        id="avatar-link"
        className="popup__input popup__input_type_link"
      />
      <span className="popup__input-error">{errors.link}</span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
