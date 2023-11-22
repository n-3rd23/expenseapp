import { Router } from "express";
import { login, register } from "../../controller/auth";
import { validator } from "../../middleware/validation.middleware";
import { loginValidator } from "../../validator/auth/login.validator";
import { registerValidator } from "../../validator/auth/register.validator";
import passport from "../../strategy/google.strategy";

export const router = Router();

router.route("/register").post(registerValidator, validator, register);

router.route("/login").post(loginValidator, validator, login);

router.route("/google").get(
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.route("/google/callback").get(
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/",
    failureRedirect: "http://localhost:5173/register",
  })
);
