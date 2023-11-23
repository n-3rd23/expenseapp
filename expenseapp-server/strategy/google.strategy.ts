import passport from "passport";
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async function (
      request: any,
      accessToken: any,
      refreshToken: any,
      profile: any,
      done: any
    ) {
      const userData = {
        name: profile?.displayName,
        email: profile?.email,
      };
      console.log("user data : ", userData);
      try {
        request.googleData = userData;
        done(null, profile);
      } catch (err) {
        done(err, profile);
      }
    }
  )
);

passport.serializeUser(function (user: any, done) {
  done(null, user);
});

passport.deserializeUser(function (user: any, done) {
  done(null, user);
});

// const FacebookStrategy = require("passport-facebook").Strategy;
// const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
// const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;
// const FACEBOOK_CALLBACK_URL = process.env.FACEBOOK_CALLBACK_URL;
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: FACEBOOK_APP_ID,
//       clientSecret: FACEBOOK_APP_SECRET,
//       callbackURL: FACEBOOK_CALLBACK_URL,
//     },
//     function (request, accessToken, refreshToken, profile, cb) {
//       console.log("facebook profile : ", profile);
//       cb(null, profile);
//     }
//   )
// );

export default passport;
