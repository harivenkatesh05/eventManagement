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

		const onlineEvent = await store.getLinkedOnlineEvent(event.linkedEvent)
		const eventFullDetails: OnlineEventFullDetail = {
			id: event._id as string,
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

			tax: onlineEvent.tax,
			productFee: onlineEvent.productFee,
			price: onlineEvent.price,
			remaining: onlineEvent.remaining,	
		} 

		return NextResponse.json({
			event: eventFullDetails
		}, { status: 200 })
	} catch (error) {
		console.error('Error fetching event:', error);
		return NextResponse.json(
			{ message: "Failed to fetch event" },
			{ status: 500 }
		);
	}
} 