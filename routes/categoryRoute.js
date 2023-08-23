import express from "express";
import { createCategory } from "../controllers/categoryController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();


router.post("/create", auth, createCategory);


export default router;
