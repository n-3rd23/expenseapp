import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { ErrorResponse } from "../util/ErrorResponse";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const accessToken = req.cookies.Authorization;
  console.log("Authorization ::: ", req.headers);
  const accessToken = req.headers.authorization || req.cookies.Authorization;
  if (!accessToken) {
    return next(new ErrorResponse("Unauthorized", 401));
  }
  const jwtToken: any = process.env.JWT_SECRET;
  const user: any = jwt.verify(accessToken, jwtToken);
  if (!user) {
    return next(new ErrorResponse("Forbidden", 401));
  }
  req.user = user;
  next();
};
