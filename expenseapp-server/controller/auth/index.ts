import * as argon from "argon2";
import { NextFunction, Request, Response } from "express";
import { User, userModel } from "../../db";
import { ErrorResponse } from "../../util/ErrorResponse";
import { signToken } from "../../util/jwt.util";
import { Document } from "mongoose";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const createdUser = (await createUser(req.body, "local")) as User;
    if (!createUser) {
      next(new ErrorResponse("User with the email already exist", 400));
    }
    const accessToken = signToken({
      email: createdUser.email,
      name: createdUser.name,
      id: createdUser._id,
    });
    res
      .status(201)
      .cookie("Authorization", accessToken, {
        httpOnly: true,
      })
      .json({
        success: true,
        data: {
          message: "user created",
          access_token: accessToken,
        },
      });
  } catch (err: any) {
    console.log(err);
    next(new ErrorResponse(err, 500));
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const existingUser = await userModel.findOne({
      email,
    });
    if (!existingUser) {
      return next(new ErrorResponse("Unauthorized", 401));
    }
    const isValidPassword = await argon.verify(
      existingUser.password as string,
      password
    );
    if (!isValidPassword) {
      return next(new ErrorResponse("Unauthorized", 401));
    }
    const accessToken = signToken({
      email: existingUser.email,
      name: existingUser.name,
    });
    return res
      .status(200)
      .cookie("Authorization", accessToken, {
        httpOnly: true,
      })
      .json({
        data: {
          message: "login success",
        },
      });
  } catch (err: any) {
    console.log("error on login : ", err);
    next(new ErrorResponse(err, 500));
  }
};

export const createUser = async (
  userData: User,
  provider: "google" | "local" | "facebook"
): Promise<User> => {
  try {
    let createdUser: User;
    const existingUser = await userModel.findOne({
      email: userData.email,
    });

    if (provider === "local") {
      if (existingUser) {
        throw new Error("User exist");
      }
      const hashedPassword = await argon.hash(userData?.password as string);
      const newUser = new userModel({
        email: userData.email,
        name: userData.name,
        password: hashedPassword,
        provider,
      });
      createdUser = await newUser.save();
    }
    if (provider === "google" || provider === "facebook") {
      if (existingUser) {
        return existingUser;
      }
      const newUser = new userModel({
        email: userData.email,
        name: userData.name,
        provider,
      });
      createdUser = await newUser.save();
    }
    return createdUser;
  } catch (err) {
    console.log("error while creating user", err);
    throw err;
  }
};
