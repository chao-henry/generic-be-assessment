import express from "express";
import passport from "passport";

import routes from "./routes";
import { strategy } from "./config/passportConfig";

passport.use(strategy);

const app = express();
const port = process.env.PORT || 3000;

app.use(passport.initialize()); // Authentication middleware
app.use(express.json()); // JSON parsing middleware
app.use("/api", routes); //Routing middleware

app.listen(port, () => console.log(`Server running on port ${port}`));

export default app;
