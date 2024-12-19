import mongoose, { Schema, Document } from 'mongoose';

interface ITicket {
  ticketName: string;
  totalTickets: number;
  maxBookingTickets: number;
  price: number;
}
interface IVenueEvent extends Document {
  venue: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  ticketType: string;
  tickets: Array<ITicket>;
}

const TicketSchema: Schema<ITicket> = new Schema({
  ticketName: { type: String, required: true },
  totalTickets: { type: Number, required: true },
  maxBookingTickets: { type: Number, required: true },
  price: { type: Number, required: true },
});

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
  ticketType: { type: String, required: true },
  tickets: {
    type: [TicketSchema],
    required: true,
    default: undefined,
    // minlength: 1,
    validate: {
      validator: function (value) {
        return Array.isArray(value) && value.length > 0;
      },
      message: 'There must be at least one ticket in the tickets array.',
    },
  },
});

export default mongoose.models.VenueEvent ||
  mongoose.model<IVenueEvent>('VenueEvent', VenueEventSchema);
