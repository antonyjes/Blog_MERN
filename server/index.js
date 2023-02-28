import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { verifyToken } from "./middleware/auth.js";
import { createPost, editPost } from "./controllers/posts.js";
import { v4 as uuidv4 } from 'uuid';
import { editUser } from "./controllers/users.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
mongoose.set("strictQuery", true);

/* FILE STORAGE */
const postStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets/posts");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" +uuidv4();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const userStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets/users");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" +uuidv4();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const postUpload = multer({ storage: postStorage });
const userUpload = multer({ storage: userStorage})

/* ROUTES WITH FILES */
app.post("/auth/register", userUpload.single("picture"), register);
app.patch("/users/:id/edit", verifyToken, userUpload.single("picture"), editUser);
app.post("/posts", verifyToken, postUpload.single("picture"), createPost);
app.patch("/posts/:id/edit", verifyToken, postUpload.single("picture"), editPost);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server port: ${PORT}`));
  })
  .catch((error) => console.log(error));
