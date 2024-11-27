import { NavLink } from "react-router-dom";
import "./NavBar.scss";

function NavBar() {
  return (
    <nav className="nav">
      <NavLink 
        to="/" 
        className={({ isActive }) => isActive ? "nav__link nav__link--active" : "nav__link"}
      >
        Home
      </NavLink>
      <NavLink 
        to="/category/To Be Applied" 
        className={({ isActive }) => isActive ? "nav__link nav__link--active" : "nav__link"}
      >
        To Be Applied
      </NavLink>
      <NavLink 
        to="/category/Applied" 
        className={({ isActive }) => isActive ? "nav__link nav__link--active" : "nav__link"}
      >
        Applied
      </NavLink>
      <NavLink 
        to="/category/Interview Received" 
        className={({ isActive }) => isActive ? "nav__link nav__link--active" : "nav__link"}
      >
        Interview Received
      </NavLink>
      <NavLink 
        to="/category/Rejected" 
        className={({ isActive }) => isActive ? "nav__link nav__link--active" : "nav__link"}
      >
        Rejected
      </NavLink>
    </nav>
  );
}

export default NavBar;
