module.exports = function(sequelize, DataTypes) {
  var CartItems = sequelize.define("CartItems", {
    quantity: DataTypes.INTEGER
  });
  CartItems.associate = function(models) {
    CartItems.belongsTo(models.Products);
    CartItems.belongsTo(models.Cart);
  };
  return CartItems;
};
