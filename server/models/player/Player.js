'use strict';

module.exports = {
  createPlayer               : require('./methods/createPlayer'),
  getPlayerByEmail           : require('./methods/getPlayerByEmail'),
  getPlayerByFacebookId      : require('./methods/getPlayerByFacebookId'),
  getPlayerById              : require('./methods/getPlayerById'),
  getPlayersByTableShortCode : require('./methods/getPlayersByTableShortCode'),
  mapFacebookId              : require('./methods/mapFacebookId'),
  transformFacebookProfile   : require('./methods/transformFacebookProfile'),
  updatePlayer               : require('./methods/updatePlayer')
};
