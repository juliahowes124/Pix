import { NavLink } from 'react-router-dom';
import { Text } from '@chakra-ui/layout';

export default function MenuItem({ children, isLast, to = "/", ...rest }) {
  return (
    <NavLink to={to}>
      <Text display="block" {...rest}  bg={isLast && ["light", "light", "dark", "dark"]} color={isLast && ["dark", "dark", "light", "light"]} p={3}>
        {children}
      </Text>
    </NavLink>
  )
}