import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/CardProfile.css";

const CardProfile = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  const getUser = async () => {
    const response = await fetch(`http://localhost:3002/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); //eslint-disable-line

  if (!user) {
    return null;
  }

  const { firstName, lastName, location, impressions, friends } = user;

  return (
    <div className="card">
      <div onClick={() => navigate(`/profile/${userId}`)} role="button">
        <div className="user-image">
          <img src={`http://localhost:3002/assets/${picturePath}`} alt="user" />
        </div>
        <div>
          <p>
            {firstName} {lastName}
          </p>
        </div>
      </div>

      <ul className="list-group list-group-flush">
        <li className="list-group-item">Location: {location}</li>
        <li className="list-group-item">Impressions: {impressions}</li>
        <li className="list-group-item">Friends: {friends.length}</li>
      </ul>
    </div>
  );
};

export default CardProfile;
