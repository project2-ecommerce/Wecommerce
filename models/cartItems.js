module.exports = function(sequelize, DataTypes) {
  var CartItems = sequelize.define("CartItems", {
    cartID: DataTypes.STRING,
    FBuser_ID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    itemID: DataTypes.STRING,
    itemQuantity: DataTypes.INTEGER,
    itemPrice: DataTypes.INTEGER
  });
  return CartItems;
};
