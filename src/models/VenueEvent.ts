import { TicketDocument, VenueDocument } from '@/types/model';
import mongoose, { Schema } from 'mongoose';

const TicketSchema: Schema<TicketDocument> = new Schema({
	ticketName: { type: String, required: true },
	totalTickets: { type: Number, required: true },
	maxBookingTickets: { type: Number, required: true },
	price: { type: Number, required: true, default: 0 },
	tax: { type: Number, default: 0 },
	productFee: { type: Number, default: 0 },
	remaining: {type: Number, default: 0}
});

const VenueEventSchema: Schema<VenueDocument> = new Schema({
	venue: { type: String, required: true },
	address1: { type: String, required: true },
	address2: { type: String },
	country: { type: String, required: true },
	state: { type: String, required: true },
	city: { type: String, required: true },
	zipCode: { type: String, required: true },
	latitude: { type: Number, required: true },
	longitude: { type: Number, required: true },
	tickets: {
		type: [TicketSchema],
		required: true,
		minlength: 1,
		validate: {
			validator: function (value) {
				return Array.isArray(value) && value.length > 0;
			},
			message: 'There must be at least one ticket in the tickets array.',
		},
	},
});

export default mongoose.models.VenueEvent || mongoose.model<VenueDocument>('VenueEvent', VenueEventSchema);
