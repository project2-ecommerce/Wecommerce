module.exports = function(sequelize, DataTypes) {
  var Products = sequelize.define(
    "Products",
    {
      name: DataTypes.STRING,
      category: DataTypes.STRING,
      price: DataTypes.FLOAT,
      description: DataTypes.TEXT,
      discounted: DataTypes.BOOLEAN,
      image: DataTypes.STRING
    },
    {
      timestamps: false
    }
  );
  Products.associate = function(models) {
    Products.hasMany(models.CartItems);
  };
  return Products;
};
