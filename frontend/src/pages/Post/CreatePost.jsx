import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

const textAreaNoResize = { resize: "none" };

const CreatePost = () => {
  const apiBackendUrl = import.meta.env.VITE_BACKEND_URL;
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
          Authorization: `Bearer ${auth.jsonWebToken}`,
        },
        body: JSON.stringify({
          title: inputTitle,
          description: inputDescription,
          userName: auth.userName,
          userId: auth.userId,
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
    }
  };

  return (
    <div>
      {error && <h2>{errorMessage}</h2>}
      <div className="flex justify-center mt-5">
        <form onSubmit={formSubmitHandler}>
          <div className="mb-5">
            <label
              htmlFor="inputTitle"
              className="text-2xl font-semibold mb-2 block"
            >
              Title
            </label>
            <input
              className="text-lg w-full border-2 p-2 border-neutral-900"
              type="text"
              id="inputTitle"
              name="inputTitle"
              onChange={titleChangeHandler}
              value={inputTitle}
              placeholder="Enter Title"
            />
          </div>
          <div className="my-5">
            <label
              htmlFor="inputDescription"
              className="text-2xl font-semibold mb-2 block"
            >
              Description
            </label>

            <textarea
              className="text-lg w-full border-2 p-2 border-neutral-900"
              type="text"
              id="inputDescription"
              name="inputDescription"
              onChange={descriptionChangeHandler}
              value={inputDescription}
              placeholder="Enter Description"
              rows="10"
              cols="80"
              style={textAreaNoResize}
            ></textarea>
          </div>
          <button type="submit" className="bg-blue-600 text-neutral-100 text-lg rounded-sm px-5 py-2" >Post</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
