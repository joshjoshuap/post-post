import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

const PostItem = (props) => {
  const apiBackendUrl = process.env.REACT_APP_BACKEND_URL;
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const userId = auth.userId;
  const postId = useParams().postId;

  const [post, setPost] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${apiBackendUrl}/api/post/${postId}`);

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message); // server error message
        }

        setPost(data.post);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(true);
        setErrorMessage(err.message);
        console.error("Fetch Post Failed", err);
      }
    };

    fetchPost();
  }, [apiBackendUrl, postId]);

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`${apiBackendUrl}/api/post/${postId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      // if response is not ok or fetch failed
      if (!res.ok) {
        throw new Error(data.message);
      }

      navigate("/");
    } catch (err) {
      setError(true);
      setErrorMessage(err.message);
    }
  };

  return (
    <>
      {isLoading && !error && <h1>Loading</h1>}
      {error && isLoading && <h1>{errorMessage}</h1>}
      {!isLoading && (
        <div>
          <h1>{post.title}</h1>
          <p>{post.description}</p>

          <h4>Posted By: {post.user.name}</h4>

          {auth.isLoggedIn && userId === post.user.userId && (
            <div>
              <Link to={`/post/${postId}/edit`}>Edit</Link>
            </div>
          )}

          {auth.isLoggedIn && userId === post.user.userId && (
            <form onSubmit={formSubmitHandler}>
              <button type="submit">Delete</button>
            </form>
          )}
        </div>
      )}
    </>
  );
};

export default PostItem;
