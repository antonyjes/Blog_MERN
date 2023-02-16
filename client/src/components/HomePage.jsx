import { useSelector } from "react-redux";
import CardProfile from "./CardProfile";
import NavBar from "./NavBar";
import Posts from "./Posts";
import "../styles/HomePage.css";
import FriendList from "./FriendList";

const HomePage = () => {
  const { _id, picturePath } = useSelector((state) => state.user);
  return (
    <div>
      <NavBar />
      <div className="container-home">
        <div className="container-card">
          <CardProfile userId={_id} picturePath={picturePath} />
          <FriendList userId={_id} />
        </div>
        <div className="container-posts">
          <Posts />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
