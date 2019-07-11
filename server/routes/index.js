import express from "express";
import users from "./users";
import login from "./login";

const router = express.Router();

// Establish a health check route
router.get("/ping", (req, res) => res.send("pong"));

router.use("/user", users);
router.use("/login", login);

/*
router.use("/players", playersController);
*/

export default router;
