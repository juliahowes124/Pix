import { useState } from 'react';
import './App.css';
import DispatchContext from './dispatchContext';
import ImagesContext from './imagesContext';
import NavBar from './NavBar';
import Routes from './Routes';
import UserContext from './userContext';
import {useHistory} from 'react-router-dom';

function App() {
  const [images, dispatch] = useReducer(rootReducer, []);
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

  return (
    <div>
      <UserContext.Provider value={{user, logout, login}}>
        <DispatchContext.Provider value={dispatch}>
          <ImagesContext.Provider value={images}>
            <NavBar />
            <Routes />
          </ImagesContext.Provider>
        </DispatchContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
