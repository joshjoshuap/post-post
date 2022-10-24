import { useState, useCallback } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/auth-context";
import Navigation from "./components/Navigation";
import PostList from "./pages/Post/PostLists";
import Login from "./pages/User/Login";
import Signup from "./pages/User/Signup";
import "./index.css";
import CreatePost from "./pages/Post/CreatePost";
import PostItem from "./pages/Post/PostItem";
import EditPost from "./pages/Post/EditPost";
import UserPosts from "./pages/Post/UserPosts";
import UserList from "./pages/User/UserLists";

function App() {
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();
  const [jsonWebToken, setJsonWebToken] = useState();

  const login = useCallback((userId, userName, token) => {
    setJsonWebToken(token);
    setUserId(userId);
    setUserName(userName);
  }, []);

  const logout = useCallback(() => {
    setJsonWebToken(null);
    setUserId(null);
    setUserName(null);
  }, []);

  let routes;

  if (jsonWebToken) {
    routes = (
      <>
        <Route path="/" element={<PostList />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/post/create" element={<CreatePost />} />
        <Route path="/post/:postId" element={<PostItem />} />
        <Route path="/post/:postId/edit" element={<EditPost />} />
        <Route path="/post/user/:userId" element={<UserPosts />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/" element={<PostList />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/post/create" element={<Navigate to="/login" replace />} />
        <Route path="/post/:postId" element={<PostItem />} />
        <Route path="/post/user/:userId" element={<UserPosts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!jsonWebToken,
        jsonWebToken: jsonWebToken,
        userId: userId,
        userName: userName,
        login: login,
        logout: logout,
      }}
    >
      <BrowserRouter>
        <Navigation>
          <Routes>{routes}</Routes>
        </Navigation>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
