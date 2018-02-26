module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    facebook_id: DataTypes.STRING,
    token: DataTypes.STRING,
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    admin: DataTypes.BOOLEAN
  });
  return User;
};
