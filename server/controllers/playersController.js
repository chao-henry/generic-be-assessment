import { Player, ManagementRelationship } from "../models/index";

const index = async (req, res) => {
  try {
    const adminUUID = req.body.user.id;
    const adminRelationships = await ManagementRelationship.findAll({
      where: {
        adminUUID
      }
    });
    console.log(adminRelationships);
  } catch (err) {
    return res.status(400).json({ success: false });
  }
};

const create_player = async (req, res) => {
  try {
    // Connect to the DB
  } catch (err) {
    return res.status(400);
  }
};

const delete_player = async (req, res) => {
  try {
    // Connect to the DB
  } catch (err) {
    return res.status(400);
  }
};

export default { index, create_player, delete_player };
