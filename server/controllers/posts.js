import Post from "../models/Post.js";
import User from "../models/User.js";
import fs from "fs-extra";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, title, summary, content } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      title,
      summary,
      content,
      userPicturePath: user.picturePath,
      picturePath: req.file ? req.file.filename : "",
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getFavoritesPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ [`likes.${userId}`]: true });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const commentPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment, userId } = req.body;
    const post = await Post.findById(id);

    const newComment = { comment, userId };
    post.comments.push(newComment);
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { comments: post.comments },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, summary, content, picturePath } = req.body;
    const post = await Post.findById(id);

    let befpicturePath = post.picturePath;

    if (req.file) {
      fs.unlink("./public/assets/posts/" + befpicturePath, function (err) {
        if (err) throw err;
        console.log("File deleted!");
      });

      befpicturePath = req.file.filename;
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, summary, content, picturePath: befpicturePath },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
