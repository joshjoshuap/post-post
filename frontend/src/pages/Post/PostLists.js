import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostCard from "../../components/PostCard";

const PostList = () => {
  const apiBackendUrl = process.env.REACT_APP_BACKEND_URL;

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
        setIsLoading(true);
        setError(true);
        setErrorMessage(err.message);
      }
    };

    fetchPosts();
  }, [apiBackendUrl]);

  return (
    <>
      {isLoading && !error && <h1>Loading</h1>}
      {error && isLoading && <h1>{errorMessage}</h1>}
      <Link to="/post/create">Create Post</Link>
      {!isLoading &&
        posts.posts.map((post) => {
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

export default PostList;
