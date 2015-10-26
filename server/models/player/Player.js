'use strict';

module.exports = {
  createPlayer             : require('./methods/createPlayer'),
  updatePlayer             : require('./methods/updatePlayer'),
  getPlayerByEmail         : require('./methods/getPlayerByEmail'),
  getPlayerByFacebookId    : require('./methods/getPlayerByFacebookId'),
  getPlayerById            : require('./methods/getPlayerById'),
  mapFacebookId            : require('./methods/mapFacebookId'),
  transformFacebookProfile : require('./methods/transformFacebookProfile')
};
