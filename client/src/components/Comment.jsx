import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
        <div>
            <p>{user.firstName} {user.lastName}</p>
            <p>{comment}</p>
        </div>
    )
}

export default Comment;