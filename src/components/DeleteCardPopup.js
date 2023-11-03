import PopupWithForm from "./PopupWithForm.js";

function DeleteCardPopup({
  card,
  isOpen,
  onClose,
  onOverlayClick,
  onCardDelete,
  onTransitionEnd,
  onLoading,
}) {

  // Функция обработки отправки формы, которая вызывает обработчик onCardDelete.
  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete(card);
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="confirm"
      buttonText="Да"
      buttonTextOnLoading="Удаление"
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClick={onOverlayClick}
      onTransitionEnd={onTransitionEnd}
      onSubmit={handleSubmit}
      onLoading={onLoading}
      isValid="true"
    />
  );
}

export default DeleteCardPopup;