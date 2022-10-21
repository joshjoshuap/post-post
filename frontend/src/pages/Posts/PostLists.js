import { useEffect, useState } from "react";
import PostItem from "./PostItem";

const PostList = () => {
  const apiBackendUrl = process.env.REACT_APP_BACKEND_URL;

  const [posts, setPosts] = useState();

  const [isLoading, setIsLoading] = useState(false);
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
        // setError(true);
        // setErrorMessage(err.message);
        console.log("Create Post Failed", err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <>
      {!isLoading && <h1> Loading ... </h1>}
      {isLoading &&
        posts.posts.map((post) => {
          return (
            <PostItem
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
