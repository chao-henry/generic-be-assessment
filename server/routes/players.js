import express from "express";
import passport from "passport";
import playersController from "../controllers/playersController";

const router = express.Router();
const auth = passport.authenticate("jwt", { session: false });

router.get("/", auth, playersController.index);
router.post("/", auth, playersController.create_player);
router.delete("/:id", auth, playersController.delete_player);

export default router;
