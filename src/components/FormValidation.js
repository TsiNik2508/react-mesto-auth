import { useState, useCallback, useRef, useEffect } from "react";

// Функция FormValidation предоставляет логику валидации и управления состоянием формы
function FormValidation(initialValues = {}) {
  const [values, setValues] = useState(initialValues); // Состояние для хранения значений полей формы
  const [errors, setErrors] = useState({}); // Состояние для хранения сообщений об ошибках валидации полей формы
  const [isValid, setIsValid] = useState(false); // Состояние для хранения информации о валидности всей формы
  const formRef = useRef(null); // Ссылка на элемент формы в DOM

  // Эффект, который обновляет состояние isValid в зависимости от валидности полей
  useEffect(() => {
    setIsValid(formRef.current.checkValidity());
  }, [values]);

  // Функция обрабатывает изменения в полях формы и обновляет соответствующие значения и ошибки в состоянии
  const handleChange = (e) => {
    const { name, value, validationMessage } = e.target;
    setValues((oldValues) => ({ ...oldValues, [name]: value }));
    setErrors((oldErrors) => ({ ...oldErrors, [name]: validationMessage }));
  };

  // Функция сбрасывает состояние формы к начальным значениям
  const reset = (initialValues = {}) => {
    setValues(initialValues);
    setErrors({});
  };

  // Функция позволяет установить значение конкретного поля формы по его имени
  const setValue = useCallback((name, value) => {
    setValues((oldValues) => ({ ...oldValues, [name]: value }));
  }, []);

  // Возвращаем объект с данными, которые могут быть использованы при работе с формой
  return { values, errors, isValid, handleChange, setValue, reset, formRef };
}

export default FormValidation;
