import { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Routes from './Routes';
import UserContext from './context/userContext';
import {useHistory} from 'react-router-dom';
import PixlyApi from './PixlyApi';
import { ChakraProvider } from "@chakra-ui/react"

function App() {
  const [user, setUser] = useState(null);
  const history = useHistory()

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

  return (
    <div>
      <UserContext.Provider value={{user, logout, login, register}}>
        <ChakraProvider>
          <NavBar />
          <Routes />
        </ChakraProvider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
