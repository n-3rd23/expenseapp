import { Router } from "express";
import {
  getUser,
  login,
  register,
  signInWithGoogle,
} from "../../controller/auth";
import { validator } from "../../middleware/validation.middleware";
import { loginValidator } from "../../validator/auth/login.validator";
import { registerValidator } from "../../validator/auth/register.validator";
import googleStrategy from "../../strategy/google.strategy";
import facebookStrategy from "../../strategy/facebook.strategy";
import { authMiddleware } from "../../middleware/auth.middleware";

export const router = Router();

router.route("/register").post(registerValidator, validator, register);

router.route("/login").post(loginValidator, validator, login);

router.route("/google").get(
  googleStrategy.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router
  .route("/google/callback")
  .get(googleStrategy.authenticate("google"), signInWithGoogle);

router.route("/facebook").get(
  facebookStrategy.authenticate("facebook", {
    scope: ["email", "profile"],
  })
);

router.route("/facebook/callback").get(
  facebookStrategy.authenticate("facebook", {
    failureRedirect: "http://localhost:5173/login",
    successRedirect: "http://localhost:5173/",
  })
);

router.route("/user").get(authMiddleware, getUser);

// passport.authenticate("google", {
//   successRedirect: "http://localhost:5173/",
//   failureRedirect: "http://localhost:5173/register",
// })
