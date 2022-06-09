import { useEffect, useState } from 'react';
import NavBar from './components/NavBar/NavBar';
import Routes from './Routes';
import UserContext from './context/userContext';
import {useHistory} from 'react-router-dom';
import PixlyApi from './PixlyApi';
import { ChakraProvider, Container } from "@chakra-ui/react";
import { myTheme } from './styles/theme';

function App() {
  const [user, setUser] = useState(null);
  const [userDataLoaded, setUserDataLoaded] = useState(false);
  const history = useHistory()

  //On load, check for user in localStorage
  useEffect(() => {
    if(localStorage.getItem('user')) {
      setUser(localStorage.getItem('user'))
    }
    setUserDataLoaded(true)
  }, [])

  function logout(){
    setUser(null);
    history.push('/');
    localStorage.removeItem('user')
  }

  async function login(data){
    const userAndToken = await PixlyApi.login(data);
    if(userAndToken){
      setUser(userAndToken);
      history.push('/');
      localStorage.setItem('user', userAndToken)
    } 
    setUserDataLoaded(true)
  }

  async function register(data) {
    const userAndToken = await PixlyApi.register(data);
    if (userAndToken) {
      setUser(userAndToken);
      history.push('/');
      localStorage.setItem('user', userAndToken)
    }
    setUserDataLoaded(true)
  }

  return (
    <UserContext.Provider value={{user, userDataLoaded, logout, login, register}}>
      <ChakraProvider theme={myTheme}>
        <Container bg="light" maxW="container.xxl" minH="100vh" p={0}>
          <NavBar />
          <Routes />
        </Container>
      </ChakraProvider>
    </UserContext.Provider>
  );
}

export default App;
