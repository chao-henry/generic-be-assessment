import bcrypt from "bcrypt";
import uuid from "uuid/v4";
import jwt from "jsonwebtoken";
import jwtOptions from "../config/passportConfig";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: "First name cannot be blank" }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: "Last name cannot be blank" }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email is already taken"
      },
      validate: {
        notNull: { args: true, msg: "Email cannot be blank" }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: "Password cannot be blank" }
      }
    }
  });

  User.beforeCreate((user, _) => {
    return (user.id = uuid());
  });

  User.authenticate = async function(email, password) {
    const user = await User.findOne({
      where: { email }
    });
    if (user && bcrypt.compareSync(password, user.password)) {
      return user.authorize();
    }

    throw new Error("Invalid credentials.");
  };

  User.prototype.authorize = async function() {
    const user = this;
    const token = jwt.sign({ id: user.id }, jwtOptions.secretOrKey);
    return {
      success: true,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
      },
      token
    };
  };

  return User;
};
