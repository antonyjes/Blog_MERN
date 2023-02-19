import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../styles/Comment.css";

const Comment = ({comment, userId}) => {
    const [user, setUser] = useState(null);
    const token = useSelector((state) => state.token);

    const getUser = async () => {
        const response = await fetch(`http://localhost:3002/users/${userId}`, {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`},
        });
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line

    if (!user) return null;

    return(
        <div className="comment-section">
            <h5>{user.firstName} {user.lastName}</h5>
            <h6>{comment}</h6>
        </div>
    )
}

export default Comment;