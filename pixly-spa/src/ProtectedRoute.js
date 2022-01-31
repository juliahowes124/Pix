import React, {useContext} from "react";
import {Redirect, Route} from "react-router-dom";
import UserContext from "./context/userContext";

export function ProtectedRoute({ children, path }) {
  const {user, userDataLoaded} = useContext(UserContext);

  if(!userDataLoaded) {
    return null
  }

  return (
    user ? <Route exact path={path}>{children}</Route> : <Redirect to="/login"/>
  )
}