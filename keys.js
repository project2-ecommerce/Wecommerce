exports.facebook = {
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
  profileURL: process.env.PROFILE_URL,
  profileFields: process.env.PROFILE_FIELDS
};

exports.stripe = process.env.STRIPE_ID;

exports.session = {
    secret: process.env.SESSION_SECRET
};
