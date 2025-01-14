import { NextRequest, NextResponse } from 'next/server';
import Event from '@/models/Event';
import cloudinary from '@/lib/cloudinary';
import { getUserIdFromToken } from '../../utility';
import VenueEvent from '@/models/VenueEvent';
import { store } from '@/lib/store';

export async function POST(req: NextRequest) {
	try {
		const event: VenueEventForm = await req.json();	
		const userId = getUserIdFromToken(req);

		if (
			!event.name ||
			event.tags.length <= 0 ||
			!event.eventDate ||
			!event.eventDuration ||
			!event.venue ||
			!event.address1 ||
			!event.country ||
			!event.state ||
			!event.city ||
			!event.zipCode
		) {
			return NextResponse.json(
				{ message: 'Required fields are missing' },
				{ status: 400 }
			);
		}

		let imageUrl = '';
		if (event.image) {
			const uploadResponse = await cloudinary.uploader.upload(event.image as unknown as string, {
				folder: 'events',
				resource_type: 'auto',
			});
			imageUrl = uploadResponse.secure_url;
		}
		
		const newVenueEvent = new VenueEvent({
			venue: event.venue,
			address1: event.address1,
			address2: event.address2,
			country: event.country,
			state: event.state,
			city: event.city,
			zipCode: event.zipCode,
			latitude: event.latitude,
			longitude: event.longitude,
			tickets: event.tickets.map((ticket) => {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const {id, ...remainingTicket} = ticket
				return {
					...remainingTicket,
					tax: 0,
					productFee: 0,
					remaining: remainingTicket.totalTickets
				}
			}),
		});

		const venueEventID = await store.createVenueEvent(newVenueEvent)

		const newEvent = new Event({
			name: event.name,
			tags: event.tags,
			image: imageUrl,
			description: event.description,
			eventDate: event.eventDate,
			eventDuration: event.eventDuration,
			type: 'venue',

			isBookingStartImmediately: event.isBookingStartImmediately,
			bookingStartDateTime: event.bookingStartDateTime,
			isBookingContinueTillEventEnd: event.isBookingContinueTillEventEnd,
			bookingEndDateTime: event.bookingEndDateTime,

			isSpecialInstructions: event.isSpecialInstructions,
			specialInstructions: event.specialInstructions,

			createdBy: userId,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			status: 'waitingForApproval',

			linkedEvent: venueEventID
		});
		
		const eventID = await store.createEvent(newEvent);
		
		return NextResponse.json(
			{ message: 'Event created successfully', eventId: eventID },
			{ status: 201 }
		);
	} catch (error) {
		console.error('Server error:', error);

		return NextResponse.json(
			{ message: 'Server error', error },
			{ status: 500 }
		);
	}
}
