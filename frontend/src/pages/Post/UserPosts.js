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
      <Link to="/post/create">Create Post</Link>
      {isLoading && !error && <h1>Loading</h1>}
      {error && isLoading && <h1>{errorMessage}</h1>}
      {!isLoading &&
        userPosts.post.map((post) => {
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
    </>
  );
};

export default UserPosts;
