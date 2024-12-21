import { connectDatabase } from "@/lib/mongodb";
import Event from "@/models/Event";
import User from "@/models/User";
import VenueEvent from "@/models/VenueEvent";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from 'mongodb';
import { getFromRuntime, storeInRuntime } from "@/lib/runtimeDataStore";

export async function GET(
	request: NextRequest,
	context: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await context.params;
		await connectDatabase();

		// Validate ID format
		if (!ObjectId.isValid(id)) {
			return NextResponse.json(
				{ message: "Invalid event ID" },
				{ status: 400 }
			);
		}

		let event = getFromRuntime('events', id);
		
		if (!event) {
			event = await Event.findById(id) ?? undefined;
			console.log("event from db - event id ", id);
			if (!event) {
				return NextResponse.json(
					{ message: "Event not found" },
					{ status: 404 }
				);
			}
			storeInRuntime('events', id, event);
		}

		let user = getFromRuntime('users', event.createdBy);
		if (!user) {
			user = await User.findById(event.createdBy) ?? undefined;
			console.log("user from db - id ", event.createdBy);
			if (!user) {
				return NextResponse.json(
					{ message: "User not found" },
					{ status: 404 }
				);
			}
			storeInRuntime('users', event.createdBy, user!);
		}

		let venue;
		if(event.type === 'venue') {
			let venueEvent = getFromRuntime('venueEvents', event.linkedEvent);
			if (!venueEvent) {
				venueEvent = await VenueEvent.findById(event.linkedEvent) ?? undefined;
				console.log("venueEvent from db - id ", event.linkedEvent);
				if (!venueEvent) {
					return NextResponse.json(
						{ message: "Venue event not found" },
						{ status: 404 }
					);
				}
				storeInRuntime('venueEvents', event.linkedEvent, venueEvent!);
			}
			venue = {
				location: `${venueEvent.address1}, ${venueEvent.address2}, ${venueEvent.city}, ${venueEvent.state}, ${venueEvent.country}`,
				latitude: venueEvent.latitude,
				longitude: venueEvent.longitude
			};
		}

		return NextResponse.json({
			event: {
				id: event._id,
				type: event.type,
				name: event.name,
				description: event.description,
				eventDate: event.eventDate,
				eventDuration: event.eventDuration,
				tax: event.tax,
				productFee: event.productFee,
				price: event.price,
				locale: event.locale,
				image: event.image,
				tags: event.tags,
				createdBy: event.createdBy,
				createdByName: `${user.firstName} ${user.lastName}`,
				venue: venue,
				remaining: event.remaining,
				isFreeEvent: event.isFreeEvent,
				startDate: event.bookingStartDateTime,
				endDate: event.bookingEndDateTime,
				specialInstructions: event.specialInstructions,
			}
		}, { status: 200 });

	} catch (error) {
		console.error('Error fetching event:', error);
		return NextResponse.json(
			{ message: "Failed to fetch event" },
			{ status: 500 }
		);
	}
} 