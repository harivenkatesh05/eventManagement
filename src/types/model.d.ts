import { Document } from "mongoose"

interface EventDocument extends Document {
    name: string
	tags: string[]
	eventDate: string
	eventDuration: number,
	description: string,
	image: string
	type: "online" | "venue",
	
	isBookingStartImmediately: boolean,
	bookingStartDateTime: string,
	isBookingContinueTillEventEnd: boolean,
	bookingEndDateTime: string,

	isSpecialInstructions: boolean,
	specialInstructions: string,

	linkedEvent: string,

	createdBy: string,
	createdAt: Date,
	updatedAt: Date,
	status: string
}


interface UserDocument extends Document {
    googleId?: string;
    picture?: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	password: string;
	phoneNumberVerfied: boolean
}

interface VenueDocument extends Document {
    venue: string;
    address1: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    zipCode: string;
	latitude: number;
	longitude: number;
  	tickets: Array<TicketDocument>;
}

interface OnlineDocument extends Document {
	type: number,
	price: number,
	totalTickets: number,
	tax: number,
	productFee: number,
	remaining: number
}

interface TicketDocument extends Document {
	ticketName: string;
	totalTickets: number;
	maxBookingTickets: number;
	price: number;
	tax: number;
	productFee: number
	remaining: number
}

