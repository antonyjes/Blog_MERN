import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";

const PostPage = () => {
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  const token = useSelector((state) => state.token);

  const getPost = async (e) => {
    const response = await fetch(`http://localhost:3002/posts/${postId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setPost(data);
  };

  useEffect(() => {
    getPost();
  }, []); // eslint-disable-line

  if (!post) return null;

  return (
    <div>
      <NavBar />
      <div>
        <div>
          <img src={`http://localhost:3002/assets/${post.picturePath}`} alt="" />
        </div>
        <div>
          <h3>{post.title}</h3>
          <h5>{post.content}</h5>
        </div>
        <div>
          <h6>Comments: {post.comments.length}</h6>
          <h6>Likes: {post.likes.length}</h6>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
