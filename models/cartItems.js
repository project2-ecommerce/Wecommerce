module.exports = function(sequelize, DataTypes) {
  var CartItems = sequelize.define("CartItems", {
    cartID: DataTypes.STRING,
    itemID: DataTypes.STRING,
    itemQuantity: DataTypes.INTEGER,
    itemPrice: DataTypes.INTEGER
  });
  return CartItems;
};
