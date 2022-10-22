import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import PostCard from "../../components/PostCard";

const PostList = () => {
  const apiBackendUrl = process.env.REACT_APP_BACKEND_URL;
  const auth = useContext(AuthContext);
  const navigate = useNavigate;

  const [posts, setPosts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${apiBackendUrl}/api/post/`);

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message);
        }

        setPosts(data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(true);
        setErrorMessage(err.message);
        console.error("Fetch Post Failed\n", err);
      }
    };

    fetchPosts();
  }, [apiBackendUrl]);

  return (
    <>
      {isLoading && <h1>Loading</h1>}
      {error && <h1>{errorMessage}</h1>}
      {!isLoading &&
        posts.posts.map((post) => {
          return (
            <PostCard
              key={post.id}
              id={post.id}
              title={post.title}
              description={post.description}
              creator={post.creator}
            />
          );
        })}
    </>
  );
};

export default PostList;
