import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserCard from "../../components/UserCard";

const UserList = () => {
  const apiBackendUrl = import.meta.env.VITE_BACKEND_URL;

  const [userList, setUserList] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await fetch(`${apiBackendUrl}/api/user`);

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message); // server error message
        }

        setUserList(data);
        setIsLoading(true);
      } catch (err) {
        setIsLoading(false);
        setError(true);
        setErrorMessage(err.message);
        console.log("Create Post Failed", err);
      }
    };

    fetchUserPosts();
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
        {error && isLoading && (
          <h1 className="text-5xl font-semibold">{errorMessage}</h1>
        )}
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 gap-5 px-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {userList.users.map((user) => {
            return (
              <UserCard
                key={user.id}
                id={user.id}
                name={user.name}
                posts={user.posts}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default UserList;
