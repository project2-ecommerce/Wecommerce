module.exports = function (app) {

    app.get('/api/learnMore', function (req, res) {
        res.render("learnMore");
    });

}
