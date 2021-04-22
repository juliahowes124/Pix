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

  function logout(){
    setUser(null);
    history.push('/')
  }

  function login(data){
    const user = PixlyApi.login(data);
    if(user){
      setUser(user);
    }
  }

  function register(data) {
    console.log('in register...');
  }

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
