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
    <div className="grid justify-center mt-5 align-middle">
      {error && (
        <p className="p-2 mb-3 text-lg bg-red-500 text-neutral-100">
          {errorMessage}
        </p>
      )}
      <form
        onSubmit={formSubmitHandler}
        className="p-5 rounded-sm"
      >
        <h2 className="mb-5 text-3xl font-bold text-center text-indigo-700">
          Sign in to your account
        </h2>
        <div className="py-2 mb-5 border-b-2 border-neutral-900">
          <label
            htmlFor="inputEmail"
            className="block mb-2 text-2xl"
          >
            Email
          </label>
          <input
            className="w-full p-2 text-lg border-2 rounded border-neutral-500"
            type="text"
            id="inputEmail"
            name="inputEmail"
            onChange={emailChangeHandler}
            value={inputEmail}
            placeholder="Enter Your Email"
          />
        </div>
        <div className="py-2 mb-5 border-b-2 border-neutral-800">
          <label
            htmlFor="inputPassword"
            className="block mb-2 text-2xl"
          >
            Password
          </label>
          <input
            className="w-full p-2 text-lg border-2 rounded border-neutral-500"
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
          className="w-full px-5 py-2 text-lg bg-blue-600 rounded-sm text-neutral-100 hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
