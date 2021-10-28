import { types } from "../types/types";

export const LoginReducer = (state = {}, action) => {
  switch (action.type) {
    case types.login:
      return {
        id: action.payload.id,
        name: action.payload.displayname,
      };

    case types.logout:
      return {};

    default:
      return state;
  }
};

export const RegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case types.register:
      return {
        email: action.payload.email,
        password: action.payload.password,
        name: action.payload.name,
      };

    default:
      return state;
  }
};
