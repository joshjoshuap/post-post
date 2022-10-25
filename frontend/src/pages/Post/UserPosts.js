import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PostCard from "../../components/PostCard";

const UserPosts = (props) => {
  const apiBackendUrl = process.env.REACT_APP_BACKEND_URL;
  const userId = useParams().userId;

  const [userPosts, setUserPosts] = useState();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await fetch(`${apiBackendUrl}/api/post/user/${userId}`);

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message); // server error message
        }

        setUserPosts(data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(true);
        setError(true);
        setErrorMessage(err.message);
      }
    };

    fetchUserPosts();
  }, [apiBackendUrl, userId]);

  return (
    <>
      <div className="text-center w-1/2 mx-auto mt-10 mb-5">
        <Link
          to="/post/create"
          className="bg-emerald-500 text-neutral-100 px-3 py-2 rounded-sm"
        >
          Create Post
        </Link>
      </div>

      <div className="grid justify-center mt-10">
        {isLoading && !error && <h1>Loading</h1>}
        {error && isLoading && (
          <h1 className="text-5xl font-semibold">{errorMessage}</h1>
        )}
      </div>

      {!isLoading && (
        <div className="px-10 flex flex-wrap gap-5">
          {userPosts.post.map((post) => {
            return (
              <PostCard
                key={post.id}
                id={post.id}
                title={post.title}
                description={post.description}
                user={post.user.name}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default UserPosts;
