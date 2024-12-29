import { Document } from 'mongoose';

interface EventDocument extends Document {
  name: string;
  tags: string[];
  eventDate: string;
  eventDuration: number;
  description: string;
  image: string;
  type: string;

  price: number;
  locale: string;
  totalTickets: number;
  isFreeEvent: boolean;
  isDiscount: boolean;
  discount: number;
  discountType: string;
  discountPrice: number;
  discountEndDateTime: string;

  tax: number;
  productFee: number;

  isBookingStartImmediately: boolean;
  bookingStartDateTime: string;
  isBookingContinueTillEventEnd: boolean;
  bookingEndDateTime: string;

  isRefundPolicies: boolean;
  refundBefore: number;
  refundPrecentage: number;

  isSpecialInstructions: boolean;
  specialInstructions: string;

  linkedEvent: string;

  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;

  remaining: number;
}

interface UserDocument extends Document {
  googleId?: string;
  picture?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  phoneNumberVerfied: boolean;
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
  ticketType: string;
  tickets: Array<TicketDocument>;
}

interface TicketDocument extends Document {
  ticketName: string;
  totalTickets: number;
  maxBookingTickets: number;
  price: number;
}
