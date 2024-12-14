import mongoose, { Schema, Document } from "mongoose";

interface IVenueEvent extends Document{
	venue: string,
	address1: string,
	address2: string,
	country: string,
	state: string,
	city: string,
	zipCode: string,
	latitude: number,
	longitude: number,
}

const VenueEventSchema: Schema<IVenueEvent> = new Schema({
	venue: { type: String, required: true },
	address1: { type: String, required: true },
	address2: { type: String },
	country: { type: String, required: true },
	state: { type: String, required: true },
	city: { type: String, required: true },
	zipCode: { type: String, required: true },
	latitude: { type: Number, required: true },
	longitude: { type: Number, required: true },
});

export default mongoose.models.VenueEvent || mongoose.model<IVenueEvent>("VenueEvent", VenueEventSchema);