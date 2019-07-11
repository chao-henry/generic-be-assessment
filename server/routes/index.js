import express from "express";

const router = express.Router();

// Establish a health check route
router.get("/ping", (req, res) => res.send("pong"));

/*
router.use("/user", userController);
router.use("/login", loginController);
router.use("/players", playersController);
*/

export default router;
