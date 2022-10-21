import { Link } from "react-router-dom";

const Navigation = (props) => {
  return (
    <>
      <nav>
        <h3>
          <Link to="/">Post Post </Link>
        </h3>
        <ul>
        <li>
        <Link to="/post/create">Create</Link>
        </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>
      </nav>
      <main>{props.children}</main>
    </>
  );
};

export default Navigation;
