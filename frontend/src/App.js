import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import PostList from "./pages/Posts/PostLists";
import Login from "./pages/User/Login";
import Signup from "./pages/User/Signup";
import "./App.css";
import CreatePost from "./pages/Posts/CreatePost";

function App() {
  return (
    <BrowserRouter>
      <Navigation>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/post/create" element={<CreatePost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Navigation>
    </BrowserRouter>
  );
}

export default App;
