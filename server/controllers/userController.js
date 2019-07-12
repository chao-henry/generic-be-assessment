import bcrypt from 'bcrypt';
import { User } from '../models/index';
import { logger } from '../config/loggerConfig';

const index = async (req, res) => {
  try {
    if (req.body.password != req.body.confirm_password) {
      return res.status(400).send('Unmatched passwords');
    }

    const userData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
    };
    const user = await User.create(userData);
    const response = await user.authorize();
    return res.json(response);
  } catch (err) {
    logger.error(err);
    return res.status(400).send({ success: false });
  }
};

export default { index };
