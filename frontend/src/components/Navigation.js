import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

const Navigation = (props) => {
  const auth = useContext(AuthContext);
  const userId = auth.userId;
  return (
    <>
      <nav>
        <h3>
          <Link to="/"> Post Post </Link>
        </h3>

        <ul>
          <li>
            <Link to="/"> Posts </Link>
          </li>

          <li>
            <Link to="/users"> User List </Link>
          </li>

          {auth.isLoggedIn && (
            <li>
              <Link to={`/post/user/${userId}`}> MyPost </Link>
            </li>
          )}

          {!auth.isLoggedIn && (
            <li>
              <Link to="/login"> Login </Link>
            </li>
          )}

          {!auth.isLoggedIn && (
            <li>
              <Link to="/signup"> Signup </Link>
            </li>
          )}
          {auth.isLoggedIn && (
            <li>
              <button onClick={auth.logout}> Logout </button>
            </li>
          )}
        </ul>
      </nav>
      <main>{props.children}</main>
    </>
  );
};

export default Navigation;
