import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <h1>Your navigation starts here — choose any page you want!</h1>
      <ul>
        <li>
          <Link to="/">App</Link>
        </li>

        <li>
          <Link to="/meals">Meals</Link>
        </li>

        <li>
          <Link to="/weather">Weather</Link>
        </li>
        <li>
          <Link to="/search">Search</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
