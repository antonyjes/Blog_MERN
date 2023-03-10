import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import { useState } from "react";
import Dropzone from "react-dropzone";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import "../styles/SubmitPost.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const SubmitPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const [fileValue, setFileValue] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("content", content);
    formData.append("picture", fileValue);
    formData.append("picturePath", fileValue.name);
    e.preventDefault();
    const response = await fetch("http://localhost:3002/posts", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    navigate("/home");
    console.log("Post created");
  };

  return (
    <div>
      <NavBar />
      <form onSubmit={handleSubmit} className="container-form">
        <div className="mb-3 form-item">
          <label htmlFor="">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3 form-item">
          <label htmlFor="">Summary</label>
          <input
            type="text"
            className="form-control"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>
        <div className="mb-3 form-item">
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setFileValue(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="mb-3">
                <input {...getInputProps()} className="form-control" />
                {fileValue === "" ? (
                  <p>Add Picture Here</p>
                ) : (
                  <p>{fileValue.name}</p>
                )}
              </div>
            )}
          </Dropzone>
        </div>
        <div className="mb-3 form-item">
          <label htmlFor="">Content</label>
          <ReactQuill
            defaultValue={content}
            onChange={(value) => setContent(value)}
          />
        </div>        
        <div>
          <button type="submit">ADD POST</button>
        </div>
      </form>
    </div>
  );
};

export default SubmitPost;
