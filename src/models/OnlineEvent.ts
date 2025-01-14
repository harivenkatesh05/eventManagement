import { OnlineDocument } from "@/types/model";
import mongoose, { Schema } from "mongoose";

const OnlineEventSchema: Schema<OnlineDocument> = new Schema({
	type: { type: Number, required: true },
	price: { type: Number, required: true, default: 0 },
	totalTickets: { type: Number, required: true },
	remaining: { type: Number, default: 0 },
	tax: { type: Number, default: 0 },
	productFee: { type: Number, default: 0 }
});

export default mongoose.models.OnlineEvent || mongoose.model<OnlineDocument>("OnlineEvent", OnlineEventSchema);
