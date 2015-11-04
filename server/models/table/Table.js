'use strict';

module.exports = {
  createTable          : require('./methods/createTable'),
  deleteTable          : require('./methods/deleteTable'),
  getTableByCode       : require('./methods/getTableByCode'),
  getTableById         : require('./methods/getTableById'),
  getTableByLocationId : require('./methods/getTableByLocationId'),
  updateTable          : require('./methods/updateTable')
};
