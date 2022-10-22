import { useContext, useState } from "react";
import { Navigate,useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

const CreatePost = () => {
  const apiBackendUrl = process.env.REACT_APP_BACKEND_URL;
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription, setInputDescription] = useState("");

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const titleChangeHandler = (event) => {
    setInputTitle(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setInputDescription(event.target.value);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(`${apiBackendUrl}/api/post/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title: inputTitle,
          description: inputDescription,
          creator: auth.userId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message); // server error message
      }

      navigate("/");
    } catch (err) {
      navigate("/");

      setError(true);
      setErrorMessage(err.message);
      console.error("Create Post Failed\n", err);
    }
  };

  return (
    <div>

      {error && <h2>{errorMessage}</h2>}
      <form onSubmit={formSubmitHandler}>
        <div>
          <label htmlFor="inputTitle"> Title </label>
          <input
            type="text"
            id="inputTitle"
            name="inputTitle"
            onChange={titleChangeHandler}
            value={inputTitle}
            placeholder="Enter Title"
          />
        </div>
        <div>
          <label htmlFor="inputDescription"> Description </label>
          <br />
          <textarea
            type="text"
            id="inputDescription"
            name="inputDescription"
            onChange={descriptionChangeHandler}
            value={inputDescription}
            placeholder="Enter Description"
            rows="15"
            cols="80"
          ></textarea>
        </div>
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
