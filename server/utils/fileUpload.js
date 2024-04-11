import { v4 as uuidv4 } from "uuid";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("in destination")
    cb(null, "./public/");
  },
  filename: function (req, file, cb) {
    console.log("in filename")
    cb(null, uuidv4() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

export default upload;
