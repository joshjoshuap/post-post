import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

const Signup = () => {
  const apiBackendUrl = import.meta.env.VITE_BACKEND_URL;
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
    <div className="grid justify-center mt-5">
      {error && (
        <p className="bg-red-500 text-neutral-100 p-2 mb-3 text-lg">
          {errorMessage}
        </p>
      )}
      <form onSubmit={formSubmitHandler} className="rounded-sm p-5">
        <h2 className="text-indigo-700 text-center text-3xl font-bold mb-5">
          Sign up your account now!
        </h2>
        <div className="mb-3 border-b-2 border-neutral-600 py-2">
          <label htmlFor="inputName" className="text-2xl mb-2 block">
            Name
          </label>
          <input
            className="text-lg w-full border-2 p-2 border-neutral-600"
            type="text"
            id="inputName"
            name="inputName"
            onChange={nameChangeHandler}
            value={inputName}
            placeholder="Enter Your Name"
          />
        </div>
        <div className="mb-3 border-b-2 border-neutral-600 py-2">
          <label htmlFor="inputEmail" className="text-2xl mb-2 block">
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
        <div className="mb-3 border-b-2 border-neutral-600 py-2">
          <label htmlFor="inputPassword" className="text-2xl mb-2 block">
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
        <div className="mb-3 border-b-2 border-neutral-600 py-2">
          <label htmlFor="inputConfirmPassword" className="text-2xl mb-2 block">
            Confirm Password
          </label>
          <input
            className="text-lg w-full border-2 p-2 border-neutral-600"
            type="password"
            id="inputConfirmPassword"
            name="inputConfirmPassword"
            onChange={confirmPasswordChangeHandler}
            value={inputConfirmPassword}
            placeholder="Confirm your Password"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-neutral-100 text-lg rounded-sm w-full px-5 py-2 hover:bg-blue-700"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
