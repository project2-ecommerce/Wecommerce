module.exports = function(sequelize, DataTypes) {
    var Cart = sequelize.define("Cart", {
      sessionID: DataTypes.STRING,
      FBuser_ID: {
        type: DataTypes.STRING,
        allowNull: true
      },
      purchased: DataTypes.BOOLEAN
    });
    return Cart;
}