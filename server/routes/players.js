import express from "express";
import passport from "passport";
import playersController from "../controllers/playersController";
import userSerializer from "../serializers/userSerializer";

const router = express.Router();
const auth = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    const userData = userSerializer(user);

    req.body.user = userData;
    next();
  })(req, res, next);
};

router.get("/", auth, playersController.index);
router.post("/", auth, playersController.create_player);
router.delete("/:id", auth, playersController.delete_player);

export default router;
