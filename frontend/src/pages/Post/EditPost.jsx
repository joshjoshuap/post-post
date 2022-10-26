import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

const EditPost = (props) => {
  const apiBackendUrl = import.meta.env.VITE_BACKEND_URL;
  const auth = useContext(AuthContext);
  const postId = useParams().postId;
  const navigate = useNavigate();

  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription, setInputDescription] = useState("");

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${apiBackendUrl}/api/post/${postId}`);

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message); // server error message
        }

        setInputTitle(data.post.title);
        setInputDescription(data.post.description);
      } catch (err) {
        setError(true);
        setErrorMessage(err.message);
        console.error("Fetch Post Failed", err);
      }
    };
    fetchPosts();
  }, [apiBackendUrl, postId]);

  const titleChangeHandler = (event) => {
    setInputTitle(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setInputDescription(event.target.value);
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`${apiBackendUrl}/api/post/${postId}/edit`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${auth.jsonWebToken}`,
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
      setError(true);
      setErrorMessage(err.message);
    }
  };

  return (
    <div>
      {error && <h2>{errorMessage}</h2>}
      <div className="flex justify-center mt-5">
        <form onSubmit={formSubmitHandler}>
          <h2 className="text-indigo-700 text-center text-3xl font-bold">
            Edit Post
          </h2>
          <div className="mb-5 border-b-2 border-neutral-600 py-2">
            <label
              htmlFor="inputTitle"
              className="text-2xl font-semibold mb-2 block"
            >
              Title
            </label>
            <input
              className="text-lg w-full border-2 p-2 border-neutral-600"
              type="text"
              id="inputTitle"
              name="inputTitle"
              onChange={titleChangeHandler}
              value={inputTitle}
              placeholder="Enter Title"
            />
          </div>
          <div className="mb-5 border-b-2 border-neutral-600 py-2">
            <label
              htmlFor="inputDescription"
              className="text-2xl font-semibold mb-2 block"
            >
              Description
            </label>

            <textarea
              className="text-lg w-full border-2 p-2 border-neutral-600"
              type="text"
              id="inputDescription"
              name="inputDescription"
              onChange={descriptionChangeHandler}
              value={inputDescription}
              placeholder="Enter Description"
              rows="10"
              cols="80"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-green-600 text-neutral-100 text-lg rounded-sm w-full px-5 py-2"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
