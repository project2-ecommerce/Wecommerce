module.exports = function(sequelize, DataTypes) {
    var Products = sequelize.define("products", {
        name: DataTypes.STRING,
        category: DataTypes.STRING,
        price: DataTypes.INTEGER,
        description: DataTypes.TEXT,
        image: DataTypes.STRING
    });
    return Products;
}