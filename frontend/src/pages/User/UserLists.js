import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserCard from "../../components/UserCard";

const UserList = () => {
  const apiBackendUrl = process.env.REACT_APP_BACKEND_URL;

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
      <Link to="/post/create">Create Post</Link>
      {error && !isLoading && <h1>{errorMessage}</h1>}
      {isLoading &&
        userList.users.map((user) => {
          return (
            <UserCard
              key={user.id}
              id={user.id}
              name={user.name}
              posts={user.posts}
            />
          );
        })}
    </>
  );
};

export default UserList;
