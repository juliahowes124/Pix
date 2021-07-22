import { useState } from 'react';
import Logo from './Logo';
import MenuToggle from './MenuToggle';
import MenuLinks from './MenuLinks';
import NavBarContainer from './NavBarContainer';

function NavBar(props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NavBarContainer {...props}>
      <Logo
        w="100px"
        color={["light", "light", "dark", "dark"]}
      />
      <MenuToggle isOpen={isOpen} toggle={() => setIsOpen(o => !o)}/>
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  );
}
export default NavBar;