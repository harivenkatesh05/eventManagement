type EventTypeName = 'online' | 'venue'

type HightLightedEventType = {
	id: string;
	name: string;
	type: string
	image: string;
}

type EventType = {
	id: string;
	name: string;
	description: string,
	tags: string[];
	type: EventTypeName;
	image: string;
	eventDuration: number
	eventDate: string

	price: number;
	remaining: number;
	isHighlighted: boolean
};

type Ticket = {
	id: string;
	ticketName: string;
	totalTickets: number;
	// maxBookingTickets: number;
	price: number;
};

type User = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	phoneNumber: string;
	phoneNumberVerfied?: boolean
};

type UserProfile = Omit<User, 'password'>

type SignInForm = {
	email: string;
	password: string;
};

type TicketForm = Omit<Ticket, 'id'> & { id?: string };

type EventForm = {
	name: string;
	tags: string[];
	description: string;
	eventDate: string;
	eventDuration: number;
	image: File | null;

	isBookingStartImmediately: boolean;
	bookingStartDateTime: string;
	isBookingContinueTillEventEnd: boolean;
	bookingEndDateTime: string;

	isSpecialInstructions: boolean;
	specialInstructions: string;
};

type OnlineEventForm = EventForm & {
	type: number;
	isFreeEvent: boolean;

	price: number;
	totalTickets: number;
};

// type VenueTicket = {
//   ticketType: '';
// };

type VenueEventForm = EventForm & {
	venue: string;
	address1: string;
	address2: string;
	country: string;
	state: string;
	city: string;
	zipCode: string;
	latitude: number;
	longitude: number;

	tickets: Ticket[];
};


type EventFullDetail = {
	id: string;
	type: "online" | "venue";
	name: string;
	description: string,
	tags: string[];
	image: string;
	eventDuration: number
	eventDate: string

	createdBy: string;
	createdByName: string;

	startDate: string;
	endDate: string;
	specialInstructions: string,
};

type OnlineEventFullDetail = EventFullDetail & {
	price: number,
	tax: number;
	productFee: number; 
	remaining: number; 
};

type VenueEventFullDetail = EventFullDetail & {
	location: string;
	latitude: number;
	longitude: number;

	tickets: {
		ticketID: string
		ticketName: string,
		// maxBooking: number
		tax: number;
		productFee: number;
		remaining: number;
		price: number
	}[];
}

type OnlinePurchaseForm = {
	firstName: string;
	lastName: string;
	phoneNumber: string;
	tickets: number;
};

type VenuePurchaseForm = {
	firstName: string;
	lastName: string;
	phoneNumber: string;

	ticketID: string,
	tickets: number
}

type PurchaseType = {
	id: string;
	eventId: string;
	purchaseDate: string;
	event: {
		name: string;
		image: string;
		type: string;
		date: string;
	};
	totalAmount: number;
	tickets: number;
	barcode: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	address: string;
	city: string;
	state: string;
	zip: number;
	country: string;
};

type PurchaseInfoType = {
	id: string;
	event: {
		name: string;
		image: string;
		date: string;
	};
	totalAmount: number;
	tickets: number;
};

type PaymentData = {
	amount: number;
	eventId: string;
	tickets: number;
	customerDetails: {
		firstName: string,
		lastName: string,
		phone: string;
		email: string;
	};
};
