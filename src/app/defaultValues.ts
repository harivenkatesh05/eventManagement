export const defaultEvent: EventForm = {
    name: "",
    description: "",
    tags: [],
    image: null,
    eventDate: "",
    eventDuration: 60,

    price: 0,
    locale: "INR",
    totalTickets: 0,
    isFreeEvent: false,
    isDiscount: false,
    discount: 0,
    discountType: "Percentage",
    discountPrice: 0,
    discountEndDateTime: "",

    isBookingStartImmediately: true,
	bookingStartDateTime: "",
	isBookingContinueTillEventEnd: true,
	bookingEndDateTime: "",

	isRefundPolicies: false,
	refundBefore: 0,
	refundAmount: 0,
	refundPrecentage: 0,

	isSpecialInstructions: true,
	specialInstructions: "",
}

export const defaultOnlineEvent: OnlineEventForm = {
    ...defaultEvent,
    type: 1,
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
}