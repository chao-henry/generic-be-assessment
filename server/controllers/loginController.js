import { User } from "../models/index";
import { logger } from "../config/loggerConfig";

const index = async (req, res) => {
  try {
    const response = await User.authenticate(req.body.email, req.body.password);
    return res.json(response);
  } catch (err) {
    logger.error(err);
    return res.status(400).json({ success: false });
  }
};

export default { index };
