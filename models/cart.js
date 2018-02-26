module.exports = function(sequelize, DataTypes) {
    var Cart = sequelize.define("Cart", {
      sessionID: DataTypes.STRING,
      purchased: DataTypes.BOOLEAN
    });
    return Cart;
}