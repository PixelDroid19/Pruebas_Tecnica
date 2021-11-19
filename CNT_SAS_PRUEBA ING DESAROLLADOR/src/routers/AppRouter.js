import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import SignInSide from "../components/Login/SignInSide";
import { DashboardRouter } from "./DashboardRouter";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { useDispatch } from "react-redux";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { loginEmailPassword } from "../Redux/Actions/actionLogin";
import { ListPatients } from "../Redux/Actions/actionPatients";
import { useSelector } from "react-redux";

export default function AppRouter() {
  const { Patients } = useSelector((store) => store.Patients);
  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        dispatch(loginEmailPassword(user.uid, user.displayName));
        dispatch(ListPatients("Patients"));
        dispatch(ListPatients("urgency"));
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn]);

  if (checking) {
    return (
      <div className="text-center position-absolute top-50 start-50 translate-middle">
        <div className="spinner-border row" role="status">
          <span className="visually-hidden"></span>
        </div>
        <div className="row">
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            exact
            path="/login"
            component={SignInSide}
            isAuthenticated={isLoggedIn}
          />

          <PrivateRoute
            path="/"
            component={DashboardRouter}
            isAuthenticated={isLoggedIn}
          />
        </Switch>
      </div>
    </Router>
  );
}
