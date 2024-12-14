import mongoose, { Schema, Document } from "mongoose";

interface IOnlineEvent extends Document{
	type: number
}

const OnlineEventSchema: Schema<IOnlineEvent> = new Schema({
	type: { type: Number, required: true }
});

export default mongoose.models.OnlineEvent || mongoose.model<IOnlineEvent>("OnlineEvent", OnlineEventSchema);
