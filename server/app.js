import express from "express";
import passport from "passport";
import winston from "winston";
import expressWinston from "express-winston";

import { strategy } from "./config/passportConfig";
import routes from "./routes";

passport.use(strategy);

const app = express();
const port = process.env.PORT || 3000;
const winstonLoggingOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.json()
};

app.use(passport.initialize()); // Authentication middleware
app.use(express.json()); // JSON parsing middleware

app.use(expressWinston.logger(winstonLoggingOptions)); // Logging middlware
app.use("/api", routes); //Routing middleware
app.use(expressWinston.errorLogger(winstonLoggingOptions)); // Error logging

app.listen(port, () => console.log(`Server running on port ${port}`));

export default app;
