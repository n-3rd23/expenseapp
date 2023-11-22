import dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import { router as authRouter } from "./routes/auth";
import { router as expenseRouter } from "./routes/expenses";
import { errorHandlerMiddleware } from "./middleware/errors.middleware";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import passport from "passport";
const session = require("express-session");
const PORT = process.env.PORT || 5000;
const app: Express = express();
app.use(session({ secret: "supersecret" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    allowedHeaders: [
      "Authorization",
      "X-PINGOTHER",
      "Content-Type",
      "Accept",
      "X-Requested-With",
      "Origin",
    ],
    credentials: true,
  })
);
mongoose
  .connect(process.env.DATABASE_URL as string, {
    dbName: "expense_db",
  })
  .then(() => {
    console.log("mongodb connection success");
  })
  .catch((err) => {
    console.log("mongodb connection failed : ", err);
  });
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use("/auth", authRouter);
app.use("/expenses", expenseRouter);

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT} 🚀 `);
});
