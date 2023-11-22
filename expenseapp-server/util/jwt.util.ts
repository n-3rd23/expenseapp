import * as jwt from "jsonwebtoken";

export const signToken = (payload: any): string => {
  const privateKey: string = process.env.JWT_SECRET as string;
  const access_token = jwt.sign(payload, privateKey);
  return access_token;
};
