import Sequelize from 'sequelize';

import { Player, ManagementRelationship } from '../models/index';
import playerSerializer from '../serializers/playerSerializer';
import { logger } from '../config/loggerConfig';

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
    logger.error(err);
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
    logger.error(err);
    return res.status(400).json({ success: false });
  }
};

const delete_player = async (req, res) => {
  try {
    const playerUUID = req.params.id;
    const adminUUID = req.body.user.id;
    const Op = Sequelize.Op;

    const managementRecord = await ManagementRelationship.findOne({
      where: {
        adminUUID,
        [Op.and]: {
          playerUUID
        }
      }
    });

    if (managementRecord) {
      const player_records_destroyed = await Player.destroy({
        where: {
          id: req.params.id
        }
      });

      if (player_records_destroyed == 1) {
        const relationship_records_destroyed = await ManagementRelationship.destroy(
          {
            where: {
              playerUUID: req.params.id
            }
          }
        );
      }
    } else {
      throw new Error('Error in record destruction');
    }
    return res.json({ success: true });
  } catch (err) {
    logger.error(err);
    return res.status(400).json({ success: false });
  }
};

export default { index, create_player, delete_player };
