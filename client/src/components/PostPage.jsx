import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";

const PostPage = () => {
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const [showComments, setShowComments] = useState(false);

  const getPost = async (e) => {
    const response = await fetch(`http://localhost:3002/posts/${postId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setPost(data);
  };

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3002/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    setPost(updatedPost);
  };

  useEffect(() => {
    getPost();
  }, []); // eslint-disable-line

  if (!post) return null;

  const likes = post.likes;
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  return (
    <div>
      <NavBar />
      <div>
        <div>
          <img
            src={`http://localhost:3002/assets/${post.picturePath}`}
            alt=""
          />
        </div>
        <div>
          <h3>{post.title}</h3>
          <h5>{post.content}</h5>
        </div>
        <div>
          <div onClick={() => setShowComments(!showComments)}>
            <h6>Comments: {post.comments.length}</h6>
          </div>
          <div>
            <button onClick={patchLike}>
              {isLiked ? <h6>Dislike</h6> : <h6>Like</h6>}
            </button>
            <h6>Likes: {likeCount}</h6>
          </div>
        </div>
        {showComments ? (
          <div>
            <p>Buen post</p>
            <p>Cameo</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PostPage;
