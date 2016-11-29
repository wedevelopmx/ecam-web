"use strict";

module.exports = function(sequelize, DataTypes) {
  var Visitor = sequelize.define("Visitor", {
    firstName: { type: DataTypes.STRING, name: "first_name" },
    lastName: { type: DataTypes.STRING, name: "last_name"},
    profilePic: { type: DataTypes.STRING, name: "profile_pic"},
    pictureDataURI: { type: DataTypes.STRING, name: "picture_data_uri"},
    country: { type: DataTypes.STRING, name: "country"},
    state: { type: DataTypes.STRING, name: "state"},
    status: { type: DataTypes.INTEGER, name: "status"},
    birthdate: {type: DataTypes.DATE, name: "birth_date"}
  }, {
      classMethods: {
        associate: function(models) {

        }
      }
  });

  return Visitor;
}
