import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import { useState } from "react";
import Dropzone from "react-dropzone";
import NavBar from "./NavBar";

const SubmitPost = () => {
    const dispatch = useDispatch();
    const {_id} = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    const [fileValue, setFileValue] = useState("");

    return (
        <div>
            <NavBar />
            <div className="mb-3">
                <label htmlFor="">
                    Title
                </label>
                <input type="text" className="form-control"/>
            </div>
            <div className="mb-3">
                <label htmlFor="">
                    Summary
                </label>
                <input type="text" className="form-control"/>
            </div>
            <div className="mb-3">
                <label htmlFor="">
                    Content
                </label>
                <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>
            <div className="mb-3">
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) => setFileValue(acceptedFiles[0])}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()} className="mb-3">
                    <input {...getInputProps()} className="form-control"/>
                    {fileValue === "" ? (
                      <p>Add Picture Here</p>
                    ) : (
                      <p>{fileValue.name}</p>
                    )}
                  </div>
                )}
              </Dropzone>
            </div>
            <div>
                <button>ADD POST</button>
            </div>
        </div>
    )
}

export default SubmitPost;