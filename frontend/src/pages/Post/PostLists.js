import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostCard from "../../components/PostCard";

const PostList = () => {
  const apiBackendUrl = process.env.REACT_APP_BACKEND_URL;

  const [posts, setPosts] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${apiBackendUrl}/api/post/`);

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message); // server error message
        }

        setPosts(data);
        setIsLoading(true);
      } catch (err) {
        setIsLoading(false);
        setError(true);
        setErrorMessage(err.message);
        console.log("Create Post Failed", err);
      }
    };

    fetchPosts();
  }, [apiBackendUrl]);

  return (
    <>
      <Link to="/post/create">Create Post</Link>
      {error && !isLoading && <h1>{errorMessage}</h1>}
      {isLoading &&
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
