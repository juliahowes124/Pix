import {useContext} from 'react';
import { Route, Switch } from "react-router";
import { AuthForm } from "./AuthForm";
import Home from "./Home";
import ImageDetails from "./ImageDetails";
import UploadForm from "./UploadForm";
import UserContext from "./context/userContext";
import { ProtectedRoute } from './ProtectedRoute';


function Routes() {
  const {login, register} = useContext(UserContext);

  return (
    <Switch>
      <ProtectedRoute exact path="/"><Home/></ProtectedRoute>
      <ProtectedRoute exact path="/upload"><UploadForm/></ProtectedRoute>
      <ProtectedRoute exact path="/images/:id"><ImageDetails/></ProtectedRoute>
      <Route exact path="/login"><AuthForm type="login" authFunc={login}/></Route>
      <Route exact path="/register"><AuthForm type="register" authFunc={register}/></Route>
    </Switch>
  );
}

export default Routes;
