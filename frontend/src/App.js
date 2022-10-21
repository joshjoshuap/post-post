import { useState, useCallback } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/auth-context";
import Navigation from "./components/Navigation";
import PostList from "./pages/Post/PostLists";
import Login from "./pages/User/Login";
import Signup from "./pages/User/Signup";
import "./App.css";
import CreatePost from "./pages/Post/CreatePost";
import PostItem from "./pages/Post/PostItem";
import EditPost from "./pages/Post/EditPost";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState();

  const login = useCallback((userId) => {
    setIsLoggedIn(true);
    setUserId(userId);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;

  if (isLoggedIn) {
    routes = (
      <>
        <Route path="/" element={<PostList />} />
        <Route path="/post/create" element={<CreatePost />} />
        <Route path="/post/:postId" element={<PostItem />} />
        <Route path="/post/:postId/edit" element={<EditPost />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/" element={<PostList />} />
        <Route path="/post/:postId" element={<PostItem />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: userId,
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
