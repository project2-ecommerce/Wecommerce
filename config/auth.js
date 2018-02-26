// expose our config directly to our application using module.exports
module.exports = {
  facebookAuth: {
    clientID: "2026790834245277", // your App ID
    clientSecret: "fb78a381aed60c344130cd3505161050", // your App Secret
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileURL:
      "https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email",
    profileFields: ["id", "email", "name"] // For requesting permissions from Facebook API
  }
};
