import express from "express";
import userController from "../controllers/userController";

const router = express.Router();

router.post("/", userController.index);

export default router;
