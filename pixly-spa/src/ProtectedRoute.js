import React, {useContext} from "react";
import {Redirect, Route} from "react-router-dom";
import UserContext from "./context/userContext";

export function ProtectedRoute({ children, path }) {
  const {user} = useContext(UserContext);

  return (
    user ? <Route exact path={path}>{children}</Route> : <Redirect to="/login"/>
  )
}