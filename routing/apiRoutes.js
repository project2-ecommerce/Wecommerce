module.exports = function(app) {

    app.get('/api/tents', function (req, res) {
      res.render("tents", {title: "Tents - Wecommerce", css: "products.css", javascript: "index.js"});
    });
    app.get('/api/sleepingBags', function (req, res) {

    });
    app.get('/api/backpacks', function (req, res) {

    });


};
