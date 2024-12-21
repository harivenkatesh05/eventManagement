import { EventDocument } from "@/types/model";
import mongoose, { Schema } from "mongoose";

const EventSchema: Schema<EventDocument> = new Schema({
	name: { type: String, required: true },
	tags: { type: [String], required: true },
	eventDate: { type: String, required: true },
	eventDuration: { type: Number, required: true },
	description: { type: String, default: "" },
	image: { type: String },
	type: { type: String, required: true },
	
	price: { type: Number, required: true },
	locale: { type: String, required: true },
	totalTickets: { type: Number, required: true },
	isFreeEvent: { type: Boolean, required: true },
	isDiscount: { type: Boolean, required: true },
	discount: { type: Number },
	discountType: { type: String },
	discountPrice: { type: Number },
	discountEndDateTime: { type: String },

	tax: { type: Number, default: 0 },
	productFee: { type: Number, default: 0 },

	linkedEvent: { type: String },
	
	isBookingStartImmediately: { type: Boolean, required: true },
	bookingStartDateTime: { type: String },
	isBookingContinueTillEventEnd: { type: Boolean, required: true },
	bookingEndDateTime: { type: String },

	isRefundPolicies: { type: Boolean, required: true },
	refundBefore: { type: Number },
	refundPrecentage: { type: Number },

	isSpecialInstructions: { type: Boolean, required: true },
	specialInstructions: { type: String },

	createdBy: { type: String, required: true },
	createdAt: { type: Date, required: true },
	updatedAt: { type: Date, required: true },
	status: { type: String, required: true },
	remaining: { type: Number, default: 0 }
});

export default mongoose.models.Event || mongoose.model<EventDocument>("Event", EventSchema);