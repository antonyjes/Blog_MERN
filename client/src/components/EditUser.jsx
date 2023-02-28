import "../styles/LoginPage.css";
import Dropzone from "react-dropzone";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "state";

const EditUser = ({ user, setUser }) => {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newImage, setNewImage] = useState("");
  const [filename, setFilename] = useState(user.picturePath);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [location, setLocation] = useState(user.location);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");

  const handleImageChange = (files) => {
    setNewImage(files[0]);
    setFilename(files[0].name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("location", location);
    formData.append("picture", newImage);
    formData.append("picturePath", filename);
    formData.append("email", email);
    formData.append("password", password);

    const response = await fetch(
      `http://localhost:3002/users/${user._id}/edit`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      }
    );
    const updatedUser = await response.json();
    setUser(updatedUser);
    dispatch(
      setLogin({
        user: updatedUser,
        token: token,
      })
    );
    navigate("/home");
  };

  return (
    <form className="form-login" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">First Name</label>
        <input
          type="text"
          className="form-control"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Last Name</label>
        <input
          type="text"
          className="form-control"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Location</label>
        <input
          type="text"
          className="form-control"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="mb-3">
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
      <div className="mb-3">
        <label className="form-label">Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="name@example.com"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <div>
        <button type="submit">SEND</button>
      </div>
    </form>
  );
};

export default EditUser;
