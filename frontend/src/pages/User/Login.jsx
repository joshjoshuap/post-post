import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

const Login = () => {
  const apiBackendUrl = import.meta.env.VITE_BACKEND_URL;
  const auth = useContext(AuthContext);
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
      // fetch - send data to url api
      const res = await fetch(`${apiBackendUrl}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: inputEmail,
          password: inputPassword,
        }),
      });

      const data = await res.json(); // get response

      // check reponse status
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
    <div className="grid justify-center align-middle mt-5">
      {error && (
        <p className="bg-red-500 text-neutral-100 p-2 mb-3 text-lg">
          {errorMessage}
        </p>
      )}
      <form onSubmit={formSubmitHandler} className="rounded-sm p-5">
        <h2 className="text-indigo-700 text-center text-3xl font-bold mb-5">
          Sign in to your account
        </h2>
        <div className="mb-5 border-b-2 border-neutral-600  py-2">
          <label
            htmlFor="inputEmail"
            className="text-2xl mb-2 block"
          >
            Email
          </label>
          <input
           className="text-lg w-full border-2 p-2 border-neutral-600"
            type="text"
            id="inputEmail"
            name="inputEmail"
            onChange={emailChangeHandler}
            value={inputEmail}
            placeholder="Enter Your Email"
          />
        </div>
        <div className="mb-5 border-b-2 border-neutral-600 py-2">
          <label htmlFor="inputPassword" className="block text-2xl mb-2">
            Password
          </label>
          <input
          className="text-lg w-full border-2 p-2 border-neutral-600"
            type="password"
            id="inputPassword"
            name="inputPassword"
            onChange={passwordChangeHandler}
            value={inputPassword}
            placeholder="Enter Your Password"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-neutral-100 text-lg w-full rounded-sm px-5 py-2 hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
