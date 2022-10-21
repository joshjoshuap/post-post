import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import PostList from "./pages/Post/PostLists";
import Login from "./pages/User/Login";
import Signup from "./pages/User/Signup";
import "./App.css";
import CreatePost from "./pages/Post/CreatePost";
import EditPost from "./pages/Post/EditPost";

function App() {
  return (
    <BrowserRouter>
      <Navigation>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/post/create" element={<CreatePost />} />
          <Route path="/post/:postId" element={<EditPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Navigation>
    </BrowserRouter>
  );
}

export default App;
