import passport from "passport";
const FacebookStrategy = require("passport-facebook");

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;
const FACEBOOK_CALLBACK_URL = process.env.FACEBOOK_CALLBACK_URL;
console.log(FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, FACEBOOK_CALLBACK_URL);
passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: FACEBOOK_CALLBACK_URL,
    },
    function (
      request: any,
      accessToken: any,
      refreshToken: any,
      profile: any,
      cb: any
    ) {
      console.log(
        "facebook profile : ",
        profile,
        request,
        accessToken,
        refreshToken
      );
      cb(null, profile);
    }
  )
);

passport.serializeUser(function (user: any, done) {
  done(null, user);
});

passport.deserializeUser(function (user: any, done) {
  done(null, user);
});

export default passport;
