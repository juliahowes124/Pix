import { NavLink } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

export default function MenuItem({ children, isLast, to = "/", ...rest }) {
  return (
    <NavLink to={to}>
      <Button display="block" {...rest}>
        {children}
      </Button>
    </NavLink>
  )
}