import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import "./NavBar.css";
import UserContext from './userContext';

function NavBar() {
  const {user, logout} = useContext(UserContext);

  return (
    <nav className="NavBar">
      <Link className="home" to="/">Home</Link>
      {user
        ? <div className="NavBarRight">
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/upload">Upload</NavLink>
          <a onClick={logout}>Logout</a>
        </div>
        : <div className="NavBarRight">
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </div>}
    </nav>
  );
}
export default NavBar;