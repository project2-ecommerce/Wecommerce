module.exports = function(sequelize, DataTypes) {
    var Cart = sequelize.define("Cart", {
      cartID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true // Automatically gets converted to SERIAL for postgres
      },
      sessionID: DataTypes.STRING,
      FBuser_ID: {
        type: DataTypes.STRING,
        allowNull: true
      },
      purchased: DataTypes.BOOLEAN
    });
    Cart.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      Cart.belongsToMany(models.Products, {
        foreignKey: {
          allowNull: false
        }
      });
    };
    return Cart;
}