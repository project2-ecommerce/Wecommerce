var db = require("../models");
module.exports = function (app,passport) {
    app.get('/api/products', function(req, res){
        db.Products.findAll({}).then(function(result){
            res.json(result);
        });
    });
};
