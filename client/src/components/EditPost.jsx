import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import FormEdit from "./FormEdit";

const EditPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
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
      <FormEdit post={post} setPost={setPost} />      
    </div>
  );
};

export default EditPost;
