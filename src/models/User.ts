import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document, User{
}

const UserSchema: Schema<IUser> = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);