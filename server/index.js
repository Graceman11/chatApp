import { Express } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import { Path } from "path";
import { fileURLToPath } from "url";
import { Db } from "mongodb";

const port = 3000;
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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, originalname);
  },
});

const upload = multer({ storage });

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/chatApp", {
  useNewUrlParser: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("successfully connected to mongodb using mongoose");
});

app.listen(port, () => {
  console.log("app connected");
});
