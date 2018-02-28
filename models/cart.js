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

      Cart.belongsToMany(models.Products, {
        through: 'cartItems'
      });
    };
    return Cart;
};
