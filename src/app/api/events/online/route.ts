import { NextRequest, NextResponse } from "next/server";
import OnlineEvent from "@/models/OnlineEvent";
import Event from "@/models/Event";
import cloudinary from "@/lib/cloudinary";
import { getUserIdFromToken } from "../../utility";
import { store } from "@/lib/store";

export async function POST(req: NextRequest) {
	try {
		const userId = getUserIdFromToken(req);
		const event: OnlineEventForm = await req.json();
		
		if (!event.name || event.tags.length <= 0 || !event.eventDate || !event.eventDuration || !event.type || !event.totalTickets) {
			return NextResponse.json({ message: "Required fields are missing" }, { status: 400 });
		}
		
		let imageUrl = "";
		if (event.image) {
			const uploadResponse = await cloudinary.uploader.upload(event.image as unknown as string, {
				folder: 'events',
				resource_type: 'auto'
			});
			imageUrl = uploadResponse.secure_url;
		}

		const newOnlineEvent = new OnlineEvent({
			type: event.type,
			price: event.price,
			totalTickets: event.totalTickets,
			remaining: event.totalTickets,
			tax: 0,
			productFee: 0
		});

		const id = await store.createOnlineEvent(newOnlineEvent)
		
		const newEvent = new Event({
			name: event.name,
			tags: event.tags,
			image: imageUrl,
			description: event.description,
			eventDate: event.eventDate,
			eventDuration: event.eventDuration,
			type: "online",
			linkedEvent: id,

			isBookingStartImmediately: event.isBookingStartImmediately,
			bookingStartDateTime: event.bookingStartDateTime,
			isBookingContinueTillEventEnd: event.isBookingContinueTillEventEnd,
			bookingEndDateTime: event.bookingEndDateTime,

			isSpecialInstructions: event.isSpecialInstructions,
			specialInstructions: event.specialInstructions,

			createdBy: userId,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			status: "waitingForApproval",
		});
		
		const eventID = store.createEvent(newEvent)
		return NextResponse.json({ message: "Event created successfully", eventId: eventID }, { status: 201 });
	} catch (error) {
		console.error('Server error:', error);
		return NextResponse.json({ message: "Server error", error }, { status: 500 });
	}
}