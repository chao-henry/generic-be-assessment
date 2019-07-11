import express from "express";
import playersController from "../controllers/playersController";

const router = express.Router();

router.get("/", playersController.index);
router.post("/", playersController.create_player);
router.delete("/:id", playersController.delete_player);

export default router;
