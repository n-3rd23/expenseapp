import * as argon from "argon2";
import { NextFunction, Request, Response } from "express";
import { User, userModel } from "../../db";
import { ErrorResponse } from "../../util/ErrorResponse";
import { signToken } from "../../util/jwt.util";

const AUTH_FAILURE_CALLBACK_URL = process.env
  .AUTH_FAILURE_CALLBACK_URL as string;

const AUTH_SUCCESS_CALLBACK_URL = process.env
  .AUTH_SUCCESS_CALLBACK_URL as string;

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { accessToken, user } = await createUser(req.body, "local");
    if (!user) {
      next(new ErrorResponse("User with the email already exist", 400));
    }
    res
      .status(201)
      .cookie("Authorization", accessToken, {
        httpOnly: true,
      })
      .json({
        data: {
          user: {
            email: user?.email,
            name: user?.name,
            id: user?._id,
          },
          // access_token: accessToken,
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
      id: existingUser._id,
    });
    return res
      .status(200)
      .cookie("Authorization", accessToken, {
        httpOnly: true,
      })
      .json({
        data: {
          user: {
            email: existingUser.email,
            name: existingUser.name,
            id: existingUser._id,
          },
          // access_token: accessToken,
        },
      });
  } catch (err: any) {
    console.log("error on login : ", err);
    next(new ErrorResponse(err, 500));
  }
};

export const signInWithGoogle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { accessToken, user } = await createUser(req.googleData, "google");
    if (!user) {
      return res.redirect(AUTH_FAILURE_CALLBACK_URL);
    }
    return res
      .cookie("Authorization", accessToken, {
        httpOnly: true,
      })
      .redirect(AUTH_SUCCESS_CALLBACK_URL);
  } catch (err: any) {
    console.log("error while sign in with google : ", err);
    next(new ErrorResponse(err, 500));
  }
};

export const signInWithFacebook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { accessToken, user } = await createUser(req.googleData, "facebook");
    if (!user) {
      return res.redirect(AUTH_FAILURE_CALLBACK_URL);
    }
    return res
      .cookie("Authorization", accessToken, {
        httpOnly: true,
      })
      .redirect(AUTH_SUCCESS_CALLBACK_URL);
  } catch (err: any) {
    console.log("error while sign in with google : ", err);
    next(new ErrorResponse(err, 500));
  }
};

export const createUser = async (
  userData: Partial<User>,
  provider: "google" | "local" | "facebook"
): Promise<{
  user: User | null;
  accessToken: string;
}> => {
  try {
    let createdUser: User | null = null;
    const existingUser = await userModel.findOne({
      email: userData.email,
    });

    if (provider === "local") {
      if (existingUser) {
        throw new Error("User exist");
      }
      const hashedPassword = await argon.hash(userData.password as string);
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
        const accessToken = signToken({
          email: existingUser.email,
          name: existingUser.name,
          id: existingUser._id,
        });
        return {
          user: existingUser,
          accessToken,
        };
      }
      const newUser = new userModel({
        email: userData.email,
        name: userData.name,
        provider,
      });
      createdUser = await newUser.save();
    }
    const accessToken = signToken({
      email: createdUser?.email,
      name: createdUser?.name,
      id: createdUser?._id,
    });
    return {
      user: createdUser,
      accessToken,
    };
  } catch (err) {
    console.log("error while creating user", err);
    throw err;
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({
      data: req.user,
    });
  } catch (err: any) {
    console.log("error : ", err);
    next(new ErrorResponse(err, 500));
  }
};
