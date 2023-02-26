import { useState } from "react";
import Dropzone from "react-dropzone";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/SubmitPost.css";

const FormEdit = ({ post, setPost }) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const [title, setTitle] = useState(post.title);
  const [summary, setSummary] = useState(post.summary);
  const [content, setContent] = useState(post.content);
  const [newImage, setNewImage] = useState("");
  const [filename, setFilename] = useState(post.picturePath);

  const handleImageChange = (files) => {
    setNewImage(files[0]);
    setFilename(files[0].name);
    console.log(newImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("content", content);
    formData.append("picture", newImage);
    formData.append("picturePath", filename);

    const response = await fetch(
      `http://localhost:3002/posts/${post._id}/edit`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      }
    );
    const updatedPost = await response.json();
    setPost(updatedPost);
    console.log("Post edited");
    navigate("/home");
  };

  return (
    <div>
      <form className="container-form" onSubmit={handleSubmit}>
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
          <label htmlFor="">Content</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3 form-item">
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => handleImageChange(acceptedFiles)}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="mb-3">
                <input {...getInputProps()} className="form-control" />
                {filename || "Drag and drop an image here, or click to select"}
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

export default FormEdit;
