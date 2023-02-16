import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";
import '../styles/FriendList.css';

const FriendList = ({ userId }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3002/users/${userId}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line

  return (
    <div>
      <h4>Friend List</h4>
      <div>
        {friends.map((friend) => (
          <div key={friend._id} className="friend-cont">
            <h5>
              {friend.firstName} {friend.lastName}
            </h5>
            <div className="image-cont">
              <img
                src={`http://localhost:3002/assets/${friend.picturePath}`}
                alt=""
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendList;
