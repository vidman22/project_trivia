// Trivia models
// The scores table has a username attribute of type DataTypes.String
// and a score attribute that is 0 by default
module.exports = function(sequelize, DataTypes) {

  var Trivia = sequelize.define("Trivia", {
    username: DataTypes.STRING,
    score: {
      type: DataTypes.INT,
      defaultValue: null
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Trivia;
};