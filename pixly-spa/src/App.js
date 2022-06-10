import { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Routes from './Routes';
import UserContext from './context/userContext';
import {useHistory} from 'react-router-dom';
import PixlyApi from './PixlyApi';
import { ChakraProvider, Container } from "@chakra-ui/react";
import { myTheme } from './styles/theme';

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
    <UserContext.Provider value={{user, logout, login, register}}>
      <ChakraProvider theme={myTheme}>
        <Container bg="light" maxW="container.xl" minH="100vh" p={0}>
          <NavBar />
          <Routes />
        </Container>
      </ChakraProvider>
    </UserContext.Provider>
  );
}

export default App;
