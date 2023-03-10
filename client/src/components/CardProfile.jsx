import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/CardProfile.css";

const CardProfile = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  const friendsLength = useSelector((state) => state.user.friends);
  const [totalLikes, setTotalLikes] = useState(0)

  const getUser = async () => {
    const response = await fetch(`http://localhost:3002/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  const getImpressions = async () => {
    const response = await fetch(`http://localhost:3002/posts/${userId}/impressions`, {
      method: "GET",
      headers: {Authorization: `Bearer ${token}`},
    });
    const impressions = await response.json();
    setTotalLikes(impressions.totalLikes);
  }

  useEffect(() => {
    getUser();
    getImpressions();
  }, []); //eslint-disable-line

  if (!user) {
    return null;
  }

  const { firstName, lastName, location } = user;

  return (
    <div className="card">
      <div onClick={() => navigate(`/profile/${userId}`)} role="button" className="card-image">
        <div className="user-image">
          <img src={`http://localhost:3002/assets/users/${picturePath}`} alt="user" />
        </div>
        <div>
          <h2>
            {firstName} {lastName}
          </h2>
        </div>
      </div>

      <ul className="list-group list-group-flush">
        <li className="list-group-item">Location: {location}</li>
        <li className="list-group-item">Impressions: {totalLikes}</li>
        <li className="list-group-item">Friends: {friendsLength.length}</li>
      </ul>
    </div>
  );
};

export default CardProfile;
