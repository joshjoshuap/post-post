import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
//   const apiBackendUrl = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();

  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const emailChangeHandler = (event) => {
    setInputEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setInputPassword(event.target.value);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/user/signup`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: inputEmail,
          password: inputPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message); // server error message
      }

      navigate("/login");
    } catch (err) {
      setError(true);
      setErrorMessage(err.message);
      console.log("Signup Failed", err);
    }
  };

  return (
    <div>
      {error && <h2>{errorMessage}</h2>}
      <form onSubmit={formSubmitHandler}>
        <div>
          <label htmlFor="inputEmail"> Email </label>
          <input
            type="text"
            id="inputEmail"
            name="inputEmail"
            onChange={emailChangeHandler}
            value={inputEmail}
            placeholder="Enter Your Email"
          />
        </div>
        <div>
          <label htmlFor="inputPassword"> Password </label>
          <input
            type="password"
            id="inputPassword"
            name="inputPassword"
            onChange={passwordChangeHandler}
            value={inputPassword}
            placeholder="Enter Your Password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
