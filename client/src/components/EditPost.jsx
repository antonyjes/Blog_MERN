import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Dropzone from "react-dropzone";
import NavBar from "./NavBar";
import "../styles/SubmitPost.css";

const EditPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

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
      <form className="container-form">
        <div className="mb-3 form-item">
          <label htmlFor="">Title</label>
          <input
            type="text"
            className="form-control"
            value={post.title}
          />
        </div>
        <div className="mb-3 form-item">
          <label htmlFor="">Summary</label>
          <input
            type="text"
            className="form-control"
            value={post.summary}
          />
        </div>
        <div className="mb-3 form-item">
          <label htmlFor="">Content</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            value={post.content}
          ></textarea>
        </div>
        <div className="mb-3 form-item">
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="mb-3">
                <input {...getInputProps()} className="form-control" />
                {post.picturePath === "" ? (
                  <p>Add Picture Here</p>
                ) : (
                  <p>{post.picturePath}</p>
                )}
              </div>
            )}
          </Dropzone>
        </div>
        <div>
          <button type="submit">SAVE</button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
