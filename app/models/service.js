"use strict";

module.exports = function(sequelize, DataTypes) {
  var Service = sequelize.define("Service", {
    name: { type: DataTypes.STRING, name: "name" },
    description: { type: DataTypes.STRING, name: "description" },
    order: { type: DataTypes.INTEGER, name: "order"}
  }, {
    classMethods: {
      associate: function(models) {

      }
    }
  });

  return Service;
}
