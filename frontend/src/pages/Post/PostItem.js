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
        headers: {
          Authorization: `Bearer ${auth.jsonWebToken}`,
        },
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
      navigate("/");
    }
  };

  return (
    <>
      {isLoading && !error && <h1>Loading</h1>}
      {error && isLoading && <h1>{errorMessage}</h1>}
      {!isLoading && (
        <div className="flex flex-col justify-between mt-10 px-10">
          <div>
            <h1 className="text-4xl font-emibold">{post.title}</h1>
            <h5 className="text-blue-500">Posted By: {post.user.name}</h5>
            <div className="flex gap-2 mb-10">
              {auth.isLoggedIn && userId === post.user.userId && (
                <Link to={`/post/${postId}/edit`}>
                  <div className="bg-green-600 w-fit text-neutral-100 rounded-sm px-5 py-2">
                    Edit
                  </div>
                </Link>
              )}

              {auth.isLoggedIn && userId === post.user.userId && (
                <form onSubmit={formSubmitHandler}>
                  <button
                    type="submit"
                    className="bg-red-600 text-neutral-100 rounded-sm px-5 py-2"
                  >
                    Delete
                  </button>
                </form>
              )}
            </div>
          </div>
          <div>
            <p className="text-lg">{post.description}</p>
          </div>
          <div className="gap-10"></div>
        </div>
      )}
    </>
  );
};

export default PostItem;
