type Ticket = {
  id: string;
  ticketName: string;
  isTicketLimitEnabled: boolean;
  ticketLimit: number;
  isTicketLimitPerUserEnabled: boolean;
  isTicketEnabled: boolean;
  ticketLimitPerUser: number;
  ticketPrice: number;
  isTicketDiscountEnabled: boolean;
  discountPrice: number;
  discountEndDateTime: string;
  discountType: string;
};

type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  phoneNumberVerfied?: boolean
};

type SignInForm = {
  email: string;
  password: string;
};

type TicketForm = Omit<Ticket, 'id' | 'isTicketEnabled'> & { id?: string };

type EventForm = {
  name: string;
  tags: string[];
  description: string;
  eventDate: string;
  eventDuration: number;
  image: File | null;

  price: number;
  locale: string;
  totalTickets: number;
  isFreeEvent: boolean;
  isDiscount: boolean;
  discount: number;
  discountType: string;
  discountPrice: number;
  discountEndDateTime: string;

  isBookingStartImmediately: boolean;
  bookingStartDateTime: string;
  isBookingContinueTillEventEnd: boolean;
  bookingEndDateTime: string;

  isRefundPolicies: boolean;
  refundBefore: number;
  refundAmount: number;
  refundPrecentage: number;

  isSpecialInstructions: boolean;
  specialInstructions: string;
};

type OnlineEventForm = EventForm & {
  type: number;
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
};

type EventType = Omit<EventForm, 'image'> & {
  id: string;
  type: string;
  image: string;
  remaining: number;
};

type EventFullDetail = EventType & {
  createdBy: User;
  createdByName: string;
  startDate: string;
  endDate: string;
  tax: number;
  productFee: number;
  venue?: {
    location: string;
    latitude: number;
    longitude: number;
  };
};

type PurchaseForm = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  tickets: number;
};

type PurchaseType = {
  id: string;
  eventId: string;
  purchaseDate: string;
  event: {
    name: string;
    image: string;
    locale: string;
    isFreeEvent: boolean;
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

type PaymentData = {
  amount: number;
  currency: string;
  eventId: string;
  tickets: number;
  user: {
    phoneNumber: string;
  };
  customerDetails: {
    name: string;
    phone: string;
    email: string;
  };
};
