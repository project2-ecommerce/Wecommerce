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
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Products.belongsToMany(models.Cart, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    return Products;
}
