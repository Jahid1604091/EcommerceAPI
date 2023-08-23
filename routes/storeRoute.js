import express from "express";
import multer from "multer";
import path from "path";
import { auth } from "../middleware/auth.js";
import { createStore } from "../controllers/storeController.js";

const router = express.Router();

router.use(express.static("public"));
const __dirname = path.resolve();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      path.join(__dirname, "./public/storeImages"),
      function (err, succ) {
        if (err) throw err;
      }
    );
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name, function (err1, succ1) {
      if (err1) throw err1;
    });
  },
});

const upload = multer({ storage });

router.post("/create",auth, upload.single("logo"), createStore);

export default router;
