import { NavLink } from 'react-router-dom';
import { Text } from '@chakra-ui/layout';

export default function MenuItem({ children, isLast, to = "/", ...rest }) {
  return (
    <NavLink to={to}>
      <Text display="block" {...rest}  bg={isLast && ["brand.light", "brand.light", "brand.dark", "brand.dark"]} color={isLast && ["brand.dark", "brand.dark", "brand.light", "brand.light"]} p={3}>
        {children}
      </Text>
    </NavLink>
  )
}