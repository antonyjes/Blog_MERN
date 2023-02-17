import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import "../styles/Post.css";

const Post = ({
  postId,
  postUserId,
  name,
  title,
  summary,
  picturePath,
  userPicturePath,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const loggedInUserId = useSelector((state) => state.user._id);
  const friends = useSelector((state) => state.user.friends);
  const isFriend = friends.find((friend) => friend._id === postUserId);

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3002/users/${loggedInUserId}/${postUserId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  return (
    <div className="container-post">
      <div className="container-user">
        <div
          role="button"
          onClick={() => {
            navigate(`/profile/${postUserId}`);
            navigate(0);
          }}
        >
          <div>
            <img
              src={`http://localhost:3002/assets/${userPicturePath}`}
              alt=""
            />
          </div>
          <h4>{name}</h4>
        </div>
        {postUserId !== user._id && (
          <button onClick={() => patchFriend()}>
            {isFriend ? <p>Delete friend</p> : <p>Add friend</p>}
          </button>
        )}
      </div>
      <div
        className="container-content"
        role="button"
        onClick={() => {
          navigate(`/post/${postId}`);
          navigate(0);
        }}
      >
        <div className="content-img">
          <img src={`http://localhost:3002/assets/${picturePath}`} alt="post" />
        </div>
        <div>
          <h3>{title}</h3>
          <h5>{summary}</h5>
        </div>
      </div>
    </div>
  );
};

export default Post;
