import User from "../models/User.js";
import bcrypt from 'bcrypt';

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, location, picturePath }) => {
        return { _id, firstName, lastName, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, location, picturePath }) => {
        return { _id, firstName, lastName, location, picturePath };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, location, email, password } = req.body;
    const user = await User.findById(id);

    let befpicturePath = user.picturePath;

    if (req.file) {
      fs.unlink("./public/assets/users/" + befpicturePath, function (err) {
        if (err) throw err;
        console.log("File deleted!");
      });

      befpicturePath = req.file.filename;
    }

    if (password === ''){
        const updatedUser = await User.findByIdAndUpdate(id, {firstName, lastName, location, picturePath: befpicturePath ,email}, {new: true});
        res.status(200).json(updatedUser);
    } else{
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const updatedUser = await User.findByIdAndUpdate(id, {firstName, lastName, location, picturePath: befpicturePath, email, password: passwordHash}, {new: true});
        res.status(200).json(updatedUser);
    }    
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
