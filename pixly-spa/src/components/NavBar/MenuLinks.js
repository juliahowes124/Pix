import MenuItem from './MenuItem';
import { Stack, Box } from "@chakra-ui/react";
import { useContext } from 'react';
import UserContext from '../../context/userContext';

export default function MenuLinks({ isOpen }) {

  const {user, logout} = useContext(UserContext);

  return (
    <Box
        display={{ base: isOpen ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Stack
          spacing={8}
          align="center"
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          {user
          ? <>
              <MenuItem to="/profile">Profile</MenuItem>
              <MenuItem to="/upload">Upload</MenuItem>
              <a onClick={logout}>Logout</a>
            </>
          : <>
            <MenuItem to="/login">Login</MenuItem>
            <MenuItem to="/register">Register</MenuItem>
          </>}
        </Stack>
      </Box>
  )
}