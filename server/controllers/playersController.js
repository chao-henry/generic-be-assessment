import { Player, ManagementRelationship } from "../models/index";
import playerSerializer from "../serializers/playerSerializer";

const index = async (req, res) => {
  try {
    const adminUUID = req.body.user.id;
    const adminRelationships = await ManagementRelationship.findAll({
      where: {
        adminUUID
      }
    });

    let playersArray = [];
    for (var rel in adminRelationships) {
      const playerUUID = adminRelationships[rel].playerUUID;
      const player = await Player.findByPk(playerUUID);
      const playerData = playerSerializer(player);
      playersArray.push(playerData);
    }

    return res.json({
      success: true,
      players: playersArray
    });
  } catch (err) {
    return res.status(400).json({ success: false });
  }
};

const create_player = async (req, res) => {
  try {
    const playerData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      rating: req.body.rating,
      handedness: req.body.handedness
    };

    const player = await Player.create(playerData);
    const relationship = await ManagementRelationship.create({
      adminUUID: req.body.user.id,
      playerUUID: player.id
    });
    const playerCreated = playerSerializer(player);

    return res.json({
      success: true,
      player: playerCreated
    });
  } catch (err) {
    return res.status(400).json({ success: false });
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
