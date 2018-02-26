module.exports = function(sequelize, DataTypes) {
    var Products = sequelize.define("Products", {
        name: DataTypes.STRING,
        category: DataTypes.STRING,
        price: DataTypes.INTEGER,
        description: DataTypes.TEXT,
        image: DataTypes.STRING
    });
    return Products;
}
