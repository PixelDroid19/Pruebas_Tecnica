import React from "react";
import ReactDOM from "react-dom";
import "./styles/style.css";
import { RegistroApp } from "./RegistroApp";
import { Provider } from "react-redux";
import { store } from "./Redux/store/store";
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap"

ReactDOM.render(
  <Provider store={store}>
    <RegistroApp />
  </Provider>,
  document.getElementById("root")
);
