module.exports = function(sequelize, DataTypes) {
    var Cart = sequelize.define("Cart", {
      sessionID: DataTypes.STRING,
      user: {
        type: DataTypes.STRING,
        allowNull: true
      },
      purchased: DataTypes.BOOLEAN
    });
    Cart.associate = function(models) {
      Cart.hasMany(models.CartItems);
    };
    return Cart;
};
