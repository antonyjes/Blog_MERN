import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import { useSelector } from "react-redux";
import SubmitPost from "components/SubmitPost";
import Profile from "components/Profile";
import PostPage from "components/PostPage";
import Favorites from "components/Favorites";
import EditPost from "components/EditPost";
import EditProfile from "components/EditProfile";

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/home"
            element={isAuth ? <HomePage /> : <Navigate to="/" />}
          />
          <Route
            path="/createPost"
            element={isAuth ? <SubmitPost /> : <Navigate to="/" />}
          />
          <Route
            path="/profile/:userId"
            element={isAuth ? <Profile /> : <Navigate to="/" />}
          />
          <Route
            path="/post/:postId"
            element={isAuth ? <PostPage /> : <Navigate to="/" />} 
          />
          <Route 
            path="/favorites/:userId"
            element={isAuth ? <Favorites /> : <Navigate to="/" />}
          />
          <Route
            path="/editpost/:postId"
            element={isAuth ? <EditPost /> : <Navigate to="/" />}
          />
          <Route
            path="/edituser/:userId"
            element={isAuth ? <EditProfile /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
