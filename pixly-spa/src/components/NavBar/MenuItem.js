import { NavLink } from 'react-router-dom';
import { Text } from '@chakra-ui/layout';

export default function MenuItem({ children, isLast, to = "/", ...rest }) {
  return (
    <NavLink to={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </NavLink>
  )
}