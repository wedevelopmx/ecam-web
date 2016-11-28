"use strict";

module.exports = function(sequelize, DataTypes) {
  var Visitor = sequelize.define("Visitor", {
    firstName: { type: DataTypes.STRING, name: "first_name" },
    lastName: { type: DataTypes.STRING, name: "last_name"},
    profilePic: { type: DataTypes.STRING, name: "profile_pic"},
    location: { type: DataTypes.STRING, name: "location"},
    birthDate: {type: DataTypes.DATE, name: "birth_date"},
    createdTime: { type: DataTypes.DATE, name: "created_time" }
  }, {
      classMethods: {
        associate: function(models) {

        }
      }
  });

  return Visitor;
}
