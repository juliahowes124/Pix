import { useState } from 'react';
import './App.css';
import ImagesContext from './context/imagesContext';
import NavBar from './NavBar';
import Routes from './Routes';
import UserContext from './context/userContext';
import {useHistory} from 'react-router-dom';
import PixlyApi from './PixlyApi';

function App() {
  const [images, setImages] = useState([]);
  const [user, setUser] = useState(null);
  const history = useHistory()

  //WHERE DO WE PUT THESE FUNCTIONS? -- ok to have some funcs in app
  //move images out of app?
  function logout(){
    setUser(null);
    history.push('/');
  }

  async function login(data){
    const userAndToken = await PixlyApi.login(data);
    if(userAndToken){
      setUser(userAndToken);
      history.push('/');
    } 
  }

  async function register(data) {
    const userAndToken = await PixlyApi.register(data);
    if (userAndToken) {
      setUser(userAndToken);
      history.push('/');
    }
  }

  //SHOULD IMAGES BE CONTEXT??
  return (
    <div>
      <UserContext.Provider value={{user, logout, login, register}}>
        <ImagesContext.Provider value={{images, setImages}}>
          <NavBar />
          <Routes />
        </ImagesContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
