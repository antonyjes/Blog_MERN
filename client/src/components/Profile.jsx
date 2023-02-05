import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CardProfile from "./CardProfile";
import NavBar from "./NavBar";
import Posts from "./Posts";

const Profile = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
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
      <div>
        <CardProfile userId={userId} picturePath={user.picturePath} />
        <Posts userId={userId} isProfile />
      </div>
    </div>
  );
};

export default Profile;
