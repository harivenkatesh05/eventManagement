import { EventDocument } from "@/types/model";
import mongoose, { Schema } from "mongoose";

const EventSchema: Schema<EventDocument> = new Schema({
	name: { type: String, required: true },
	tags: { type: [String], required: true },
	eventDate: { type: String, required: true },
	eventDuration: { type: Number, required: true },
	description: { type: String, default: "" },
	image: { type: String },
	type: { type: String, enum: ['online', 'venue'], required: true },
	
	linkedEvent: { type: String },
	
	isBookingStartImmediately: { type: Boolean, required: true },
	bookingStartDateTime: { type: String },
	isBookingContinueTillEventEnd: { type: Boolean, required: true },
	bookingEndDateTime: { type: String },

	isSpecialInstructions: { type: Boolean, required: true },
	specialInstructions: { type: String },

	createdBy: { type: String, required: true },
	createdAt: { type: Date, required: true },
	updatedAt: { type: Date, required: true },
	status: { type: String, required: true },

	isHighlighted: { type: Boolean, default: false }
});

export default mongoose.models.Event || mongoose.model<EventDocument>("Event", EventSchema);