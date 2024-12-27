import { UserDocument } from "@/types/model";
import mongoose, { Schema } from "mongoose";

const UserSchema: Schema<UserDocument> = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String },
    picture: { type: String },
    phoneNumber: { type: String },
    phoneNumberVerfied: {type: Boolean}
});

export default mongoose.models.User || mongoose.model<UserDocument>("User", UserSchema);