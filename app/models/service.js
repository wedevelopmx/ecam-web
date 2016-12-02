"use strict";

module.exports = function(sequelize, DataTypes) {
  var Service = sequelize.define("Service", {
    name: { type: DataTypes.STRING, name: "name" },
    description: { type: DataTypes.STRING, name: "description" },
    pictureDataURI: { type: DataTypes.STRING, name: 'picture_data_uri'},
    onlyImmigrant: { type: DataTypes.INTEGER, name: 'only_inmmigrant' },
    oneTime: { type: DataTypes.INTEGER, name: 'one_time' },
    storeDataType: { type: DataTypes.INTEGER, name: 'store_data_type' },
    order: { type: DataTypes.INTEGER, name: "order"}
  }, {
    classMethods: {
      associate: function(models) {

      }
    }
  });

  return Service;
}
