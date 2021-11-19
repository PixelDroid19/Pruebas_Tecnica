import { typesPatients } from "../types/types";

const initialState = {
  Patients: [],
  urgency: [],
};

export const patientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case typesPatients.Register:
      return {
        Patients: [action.payload],
      };
    case typesPatients.List:
      return {
        Patients: [...action.payload],
      };

    case typesPatients.Delete:
      return {
        Patients: state.Patients.filter((est) => est.correo !== action.payload),
      };

    default:
      return state;
  }
};

export const UrgencyReducer = (state = initialState.urgency, action) => {
  switch (action.type) {
    case typesPatients.Urgency:
      return {
        urgency: [...action.payload],
      };

    default:
      return state;
  }
};

export const FormDataReducer = (state = {}, action) => {
  switch (action.type) {
    case typesPatients.FormData:
      return {
        FormData: action.payload.formData,
      };
    default:
      return state;
  }
};
