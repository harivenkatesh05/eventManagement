import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from 'mongodb';
import { store } from "@/lib/store";

export async function GET(
	request: NextRequest,
	context: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await context.params;

		// Validate ID format
		if (!ObjectId.isValid(id)) {
			return NextResponse.json(
				{ message: "Invalid event ID" },
				{ status: 400 }
			);
		}

		const event = await store.getEvent(id);
		const user  = await store.getUserByID(event.createdBy)

		if(event.type === 'venue') {
			const venueEvent = await store.getLinkedVenueEvent(event.linkedEvent)
			const tickets = venueEvent.tickets.map((ticket) => {
				return {
					ticketName: ticket.ticketName,
					maxBooking: ticket.maxBookingTickets,
					tax: ticket.tax,
					productFee: ticket.productFee,
					remaining: ticket.remaining
				}
			})
			return NextResponse.json({
				event: {
					id: event._id,
					type: event.type,
					name: event.name,
					image: event.image,
					description: event.description,
					eventDate: event.eventDate,
					eventDuration: event.eventDuration,
					tags: event.tags,
					
					startDate: event.bookingStartDateTime,
					endDate: event.bookingEndDateTime,
					specialInstructions: event.specialInstructions,

					createdBy: event.createdBy,
					createdByName: `${user.firstName} ${user.lastName}`,
					
					venue: {
						location: `${venueEvent.address1}, ${venueEvent.address2}, ${venueEvent.city}, ${venueEvent.state}, ${venueEvent.country}`,
						latitude: venueEvent.latitude,
						longitude: venueEvent.longitude,
	
						tickets
					}
				}
			}, { status: 200 })
		}
		else {
			const onlineEvent = await store.getLinkedOnlineEvent(event.linkedEvent)
			return NextResponse.json({
				event: {
					id: event._id,
					type: event.type,
					name: event.name,
					description: event.description,
					eventDate: event.eventDate,
					eventDuration: event.eventDuration,
					image: event.image,
					tags: event.tags,

					createdBy: event.createdBy,
					createdByName: `${user.firstName} ${user.lastName}`,
					
					startDate: event.bookingStartDateTime,
					endDate: event.bookingEndDateTime,
					specialInstructions: event.specialInstructions,

					online: {
						tax: onlineEvent.tax,
						productFee: onlineEvent.productFee,
						price: onlineEvent.price,
						remaining: onlineEvent.remaining,	
					}
				}
			}, { status: 200 })
		}
	} catch (error) {
		console.error('Error fetching event:', error);
		return NextResponse.json(
			{ message: "Failed to fetch event" },
			{ status: 500 }
		);
	}
} 