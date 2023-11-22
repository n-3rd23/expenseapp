import passport from "passport";
import { createUser } from "../controller/auth";
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
      // console.log("request : ", request);
      // console.log("access token : ", accessToken);
      // console.log("refresh token : ", refreshToken);
      // console.log("profile :: ", profile);
      const userData = {
        name: profile?.displayName,
        email: profile?.email,
      };
      console.log("user data : ", userData);
      try {
        await createUser(userData, "google");
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

export default passport;
