import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document, User{
    googleId?: string;
    picture?: string;
}

const UserSchema: Schema<IUser> = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String },
    picture: { type: String },
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);