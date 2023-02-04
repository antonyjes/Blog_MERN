import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const Post = ({
  postId,
  postUserId,
  name,
  title,
  summary,
  content,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

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
    <div>
      <div>
        <h2>{name}</h2>
        <h4>{location}</h4>
      </div>
      <div>
        <h2>{title}</h2>
        <h4>{summary}</h4>
      </div>
    </div>
  );
};

export default Post;
