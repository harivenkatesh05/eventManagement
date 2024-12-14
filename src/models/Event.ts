import mongoose, { Schema, Document } from "mongoose";

interface IEvent extends Document{
	name: string
	tags: string[]
	eventDate: string
	eventDuration: number,
	description: string,
	image: string
	type: string
	
	price: number,
	locale: string,
	totalTickets: number,
	isFreeEvent: boolean,
	isDiscount: boolean,
	discount: number,
	discountType: string,
	discountPrice: number,
	discountEndDateTime: string,
	
	isBookingStartImmediately: boolean,
	bookingStartDateTime: string,
	isBookingContinueTillEventEnd: boolean,
	bookingEndDateTime: string,

	isRefundPolicies: boolean,
	refundBefore: number,
	refundPrecentage: number,

	isSpecialInstructions: boolean,
	specialInstructions: string,

	linkedEvent: string,

	createdBy: string,
	createdAt: Date,
	updatedAt: Date,
	status: string,

	remaining: number
}

const EventSchema: Schema<IEvent> = new Schema({
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

export default mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);