export const defaultEvent: EventForm = {
    name: "",
    description: "",
    tags: [],
    image: null,
    eventDate: "",
    eventDuration: 60,

    isBookingStartImmediately: true,
	bookingStartDateTime: "",
	isBookingContinueTillEventEnd: true,
	bookingEndDateTime: "",

	isSpecialInstructions: true,
	specialInstructions: "",
}

export const defaultOnlineEvent: OnlineEventForm = {
    ...defaultEvent,
    type: 1,
    totalTickets: 0,
    price: 0
}

export const defaultVenueEvent: VenueEventForm = {
    ...defaultEvent,
    venue: "",
    address1: '',
    address2: '',
    country: '',
    state: '',
    city: '',
    zipCode: '',
    latitude: 0,
    longitude: 0,
    tickets: [],
}

export const defaultPurchaseForm: OnlinePurchaseForm = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    tickets: 0,
}

export const defaultTicket: TicketForm = {
    ticketName: "",
    totalTickets: 0,
    // maxBookingTickets: 0,
    price: 0,
}