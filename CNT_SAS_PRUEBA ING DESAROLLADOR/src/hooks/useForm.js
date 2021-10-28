import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const reset = () => {
    setValues(initialState);
  };

  const handleInputChange = ({ target }) => {
    setValues({
      ...values,
      [target.name]: target.value,
    });
  };

  return [values, handleInputChange, reset];
};

export const useInput = (initialState = {}) => {
  const [value, setValues] = useState(initialState);

  //handleInputSetValue
  const handleInputSetValue = (name, value) => {
    setValues({
      ...value,
      [name]: value,
    });
  };

  return [value, handleInputSetValue];
};
