import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

const Signup = () => {
  const apiBackendUrl = process.env.REACT_APP_BACKEND_URL;
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputConfirmPassword, setInputConfirmPassword] = useState("");

  //   const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const nameChangeHandler = (event) => {
    setInputName(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setInputEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setInputPassword(event.target.value);
  };

  const confirmPasswordChangeHandler = (event) => {
    setInputConfirmPassword(event.target.value);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault(); // prevent reload web
    // setIsLoading(true);
    try {
      // fetch - send data to url api
      const res = await fetch(`${apiBackendUrl}/api/user/signup`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: inputName,
          email: inputEmail,
          password: inputPassword,
          confirmPassword: inputConfirmPassword,
        }),
      });

      const data = await res.json(); // get response

      if (!res.ok) {
        throw new Error(data.message); // server error message
      }

      navigate("/");
      auth.login(data.userId, data.name, data.token);
    } catch (err) {
      setError(true);
      setErrorMessage(err.message);
    }
  };

  return (
    <div>
      {/* {isLoading && <h2>Signing up your account...</h2>} */}
      {error && <h2>{errorMessage}</h2>}
      <form onSubmit={formSubmitHandler}>
        <div>
          <label htmlFor="inputName"> Name </label>
          <input
            type="text"
            id="inputName"
            name="inputName"
            onChange={nameChangeHandler}
            value={inputName}
            placeholder="Enter Your Name"
          />
        </div>
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
        <div>
          <label htmlFor="inputConfirmPassword"> Confirm Password </label>
          <input
            type="password"
            id="inputConfirmPassword"
            name="inputConfirmPassword"
            onChange={confirmPasswordChangeHandler}
            value={inputConfirmPassword}
            placeholder="Confirm your Password"
          />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
