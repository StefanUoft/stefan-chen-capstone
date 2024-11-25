import { Link } from "react-router-dom";
import "./NavBar.scss";

function NavBar() {
  return (
    <nav className="nav">
      <Link to="/" className="nav__link">Home</Link>
      <Link to="/category/To Be Applied" className="nav__link">To Be Applied</Link>
      <Link to="/category/Applied" className="nav__link">Applied</Link>
      <Link to="/category/Interview Received" className="nav__link">Interview Received</Link>
      <Link to="/category/Rejected" className="nav__link">Rejected</Link>
    </nav>
  );
}

export default NavBar;
