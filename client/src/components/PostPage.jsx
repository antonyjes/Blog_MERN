import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Comment from "./Comment";
import NavBar from "./NavBar";
import "../styles/PostPage.css";

const PostPage = () => {
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const [showComments, setShowComments] = useState(false);
  const [addComment, setAddComment] = useState(false);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

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

  const handleComment = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:3002/posts/${postId}/comment`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment: comment, userId: loggedInUserId }),
      }
    );
    const updatedPost = await response.json();
    setPost(updatedPost);
  };

  const handleDelete = async (e) => {
    const response = await fetch(`http://localhost:3002/posts/${postId}/delete`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    console.log("Post deleted");
    navigate("/home");
  };

  return (
    <div>
      <NavBar />
      <div className="post-container">
        <div>
          <img
            src={`http://localhost:3002/assets/posts/${post.picturePath}`}
            alt=""
          />
        </div>
        <div className="content">
          <h3>{post.title}</h3>
          <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
        </div>
        {loggedInUserId === post.userId ? (
          <div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate(`/editpost/${postId}`)}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        ) : null}
        <div className="comments-likes">
          <div onClick={() => setShowComments(!showComments)} role="button">
            <h6>Comments: {post.comments.length}</h6>
          </div>
          <div className="likes">
            <button onClick={patchLike}>
              {isLiked ? <h6>Dislike</h6> : <h6>Like</h6>}
            </button>
            <h6>Likes: {likeCount}</h6>
          </div>
        </div>
      </div>
      {showComments ? (
        <div className="comments">
          <button
            onClick={() => setAddComment(!addComment)}
            className="add-comment"
          >
            {addComment ? "Hide" : "Add comment"}
          </button>
          {addComment ? (
            <div className="input-comment">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button onClick={handleComment}>Send</button>
            </div>
          ) : null}
          <div className="comments-text">
            {post.comments.map(({ comment, userId }) => (
              <Comment comment={comment} userId={userId} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PostPage;
