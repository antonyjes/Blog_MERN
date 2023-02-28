import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CardProfile from "./CardProfile";
import NavBar from "./NavBar";
import Posts from "./Posts";
import "../styles/HomePage.css";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);

  const getUser = async (e) => {
    const response = await fetch(`http://localhost:3002/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line

  if (!user) return null;

  return (
    <div>
      <NavBar />
      <div className="container-home">
        <div className="container-card">
          <CardProfile userId={userId} picturePath={user.picturePath} />
          <button className="btn btn-primary" onClick={() => navigate(`/edituser/${userId}`)}>Edit Profile</button>
        </div>
        <div className="container-posts">
          <Posts userId={userId} isProfile />
        </div>
      </div>
    </div>
  );
};

export default Profile;
