import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { LoginReducer, RegisterReducer } from "../reducers/LoginReducer";
import {
  patientsReducer,
  FormDataReducer,
  UrgencyReducer,
} from "../reducers/patientstReducer";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reducers = combineReducers({
  Login: LoginReducer,
  Register: RegisterReducer,
  Patients: patientsReducer,
  Urgency: UrgencyReducer,
  PatientForm: FormDataReducer,
});

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
