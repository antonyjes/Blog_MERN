import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async(req, res) => {
    try {
        const { firstName, lastName, email, password, picturePath, friends, location} = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = new User({
            firstName, lastName, email, password: passwordHash, picturePath, friends, location, impressions: 0
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

/* LOGIN */
export const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email: email});
        if (!user) return res.status(400).json({msg: "User doesn't exist."});

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({msg: "Invalid credentials."});

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({user, token});
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}