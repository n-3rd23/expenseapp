import { Document, InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  provider: { type: String, default: "local", required: false },
});

userSchema.set("toJSON", {
  virtuals: true,
});
export const userModel = model("User", userSchema);
export type User = InferSchemaType<typeof userSchema> & Document;
