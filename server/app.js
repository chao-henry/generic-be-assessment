import express from "express";
import passport from "passport";

import routes from "./routes";
import { strategy } from "./config/passportConfig";

passport.use(strategy);

const app = express();
const port = process.env.PORT || 3000;

app.use(passport.initialize());
app.use("/api", routes);
app.listen(port, () => console.log(`Server running on port ${port}`));

export default app;
