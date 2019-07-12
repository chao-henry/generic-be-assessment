import express from "express";
import passport from "passport";

import { strategy } from "./config/passportConfig";
import routes from "./routes";

passport.use(strategy);

const app = express();
const port = process.env.PORT || 3000;

app.use(passport.initialize()); // Authentication middleware
app.use(express.json()); // JSON parsing middleware
app.use("/api", routes); //Routing middleware

app.listen(port, () => console.log(`Server running on port ${port}`));

export default app;
