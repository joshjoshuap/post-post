import { useState } from "react";

const CreatePost = () => {
  const apiBackendUrl = process.env.REACT_APP_BACKEND_URL;

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

  const formSubmitHandler = async () => {
    try {
      const res = await fetch(`${apiBackendUrl}/api/post/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title: inputTitle,
          description: inputDescription,
          creator: "6350f4a6ecd7cd37159df009",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message); // server error message
      }
    } catch (err) {
      setError(true);
      setErrorMessage(err.message);
      console.log("Create Post Failed", err);
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