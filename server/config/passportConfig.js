require("dotenv").config();

import passportJWT from "passport-jwt";
import { User } from "../models";

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY
};

export const strategy = new JwtStrategy(
  jwtOptions,
  async (jwt_payload, next) => {
    try {
      let user = await User.findByPk(jwt_payload.id);
      if (user) {
        next(null, user);
      } else {
        next(null, false);
      }
    } catch (e) {
      next(null, false);
    }
  }
);

export default jwtOptions;
