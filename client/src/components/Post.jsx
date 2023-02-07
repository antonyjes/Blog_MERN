import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends, setPost } from "state";
import "../styles/Post.css";

const Post = ({
  postId,
  postUserId,
  name,
  title,
  summary,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
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

  const setLike = async () => {
    const response = await fetch(`http://localhost:3002/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
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

        <button onClick={() => patchFriend()}>
          {isFriend ? <p>Delete friend</p> : <p>Add friend</p>}
        </button>
      </div>
      <div className="container-content">
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
