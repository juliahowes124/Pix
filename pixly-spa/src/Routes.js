import {useContext} from 'react';
import { Route, Switch } from "react-router";
import AuthForm from "./AuthForm";
import Home from "./Home";
import ImageDetails from "./ImageDetails";
import UploadForm from "./UploadForm";
import Profile from './Profile';
import UserContext from "./context/userContext";


function Routes() {
  const {login, register} = useContext(UserContext);

  return (
    <Switch>
      <Route exact path="/"><Home/></Route>
      <Route exact path="/profile"><Profile /></Route>
      <Route exact path="/login"><AuthForm type="login" authFunc={login}/></Route>
      <Route exact path="/register"><AuthForm type="register" authFunc={register}/></Route>
      <Route exact path="/upload"><UploadForm/></Route>
      <Route exact path="/images/:id"><ImageDetails/></Route>
    </Switch>
  );
}

export default Routes;
