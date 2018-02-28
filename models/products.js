module.exports = function(sequelize, DataTypes) {
    var Products = sequelize.define("Products", {
        name: DataTypes.STRING,
        category: DataTypes.STRING,
        price: DataTypes.INTEGER,
        description: DataTypes.TEXT,
        discounted: DataTypes.BOOLEAN,
        image: DataTypes.STRING
    });
    Products.associate = function(models) {

        Products.belongsToMany(models.Cart, {
          through: 'cartItems'
        });
      };
    return Products;
}
