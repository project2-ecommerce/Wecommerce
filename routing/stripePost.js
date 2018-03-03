var db = require('../models'); 
var stripe = require("stripe")("sk_test_OH63QANsfLtddjDsbkWH122t");
module.exports = function (app, passport) {
    app.post('/stripe-post', function (req, res) {
        var token = req.body.stripeToken;
        stripe.charges.create({
            amount: 901,
            currency: 'usd',
            description: "",
            source: token,
        }, function (err, charge) {
            if (charge) {
            db.Cart.update({
                purchased: true},{
                where: {
                sessionID: req.sessionID
                }
            });
            }
            res.redirect('/profile');
        });
    })
};
