type Ticket = {
	id: string
	ticketName: string
	isTicketLimitEnabled: boolean
	ticketLimit: number
	isTicketLimitPerUserEnabled: boolean
	isTicketEnabled: boolean
	ticketLimitPerUser: number
	ticketPrice: number
	isTicketDiscountEnabled: boolean
	discountPrice: number
	discountEndDateTime: string
	discountType: string
}

type User = {
	firstName: string
	lastName: string
	email: string
	password: string
}

type SignInForm = {
	email: string
	password: string
}

type TicketForm = Omit<Ticket, 'id' | 'isTicketEnabled'> & {id?: string}

type EventForm = {
	name: string
	tags: string[]
	description: string,
	eventDate: string,
	eventDuration: number,
	image: File | null,

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
	refundAmount: number,
	refundPrecentage: number,

	isSpecialInstructions: boolean,
	specialInstructions: string,
}

type OnlineEventForm = EventForm & {
	type: number,
} 

type VenueEventForm = EventForm & {
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


type EventType = Omit<EventForm, 'image'> & {
	id: string;
	type: string;
	image: string;
	remaining: number;
}

type EventFullDetail = EventType & {
	createdBy: User;
	createdByName: string;
	startDate: string;
	endDate: string;
	venue?: {
		location: string;
		latitude: number;
		longitude: number;
	}
}