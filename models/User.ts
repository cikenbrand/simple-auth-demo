import mongoose, { Schema, Document, Model } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  username: string; // Add this line
}

const UserSchema: Schema<IUser> = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true }, // Add this field
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
