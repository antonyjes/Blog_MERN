import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EditUser from "./EditUser";
import NavBar from "./NavBar";

const EditProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
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
      <EditUser user={user} setUser={setUser} />     
    </div>
  );
};

export default EditProfile;