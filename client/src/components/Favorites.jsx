import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setPosts } from "state";
import NavBar from "./NavBar";
import Post from "./Post";

const Favorites = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const posts = useSelector((state) => state.posts);

  const getFavoritesPosts = async () => {
    const response = await fetch(
      `http://localhost:3002/posts/${userId}/favorites`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    getFavoritesPosts();
  }, []); // eslint-disable-line

  return (
    <div>
      <NavBar />
      <div style={{padding: "3rem"}}>
        {posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            title,
            summary,
            picturePath,
            userPicturePath,
            likes,
            comments,
          }) => (
            <Post
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              title={title}
              summary={summary}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Favorites;
