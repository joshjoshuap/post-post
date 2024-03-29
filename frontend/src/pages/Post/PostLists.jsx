import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostCard from "../../components/PostCard";
import { CircularProgress } from "@nextui-org/react";

const PostList = () => {
  const apiBackendUrl = import.meta.env.VITE_BACKEND_URL;

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
      <div className="w-1/2 mx-auto mt-10 mb-5 text-center">
        <Link
          to="/post/create"
          className="px-5 py-3 text-xl transition-all duration-300 bg-blue-700 rounded-sm text-neutral-100 hover:bg-blue-600"
        >
          Create Post
        </Link>
      </div>

      <div className="grid justify-center mt-10">
        {isLoading && !error && (
          <CircularProgress
            color="primary"
            label="Loading..."
          />
        )}
        {error && isLoading && (
          <h1 className="text-5xl font-semibold">{errorMessage}</h1>
        )}
      </div>

      {!isLoading && (
        <div className="grid grid-cols-1 gap-5 px-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 ">
          {posts.posts.map((post) => {
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

export default PostList;
