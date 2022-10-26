import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

const PostItem = (props) => {
  const apiBackendUrl = import.meta.env.VITE_BACKEND_URL;
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
        <div className="bg-neutral-50 mx-auto w-11/12 md:w-8/12 lg:w-6/12 mt-10 border-2 border-neutral-600 py-3 px-5">
          <div className="mb-10 text-center">
            <h1 className=" text-4xl font-emibold mb-3">{post.title}</h1>
            <h5 className="text-blue-500">Posted By: {post.user.name}</h5>
            <div className="flex w-1/2 mx-auto gap-2 my-3">
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

          <p className="text-lg wrap break-all">
            {post.description}
            aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          </p>
        </div>
      )}
    </>
  );
};

export default PostItem;
