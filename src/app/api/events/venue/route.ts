import { NextRequest, NextResponse } from "next/server";
import { connectDatabase } from "../../../../lib/mongodb";
import Event from "@/models/Event";
import cloudinary from "@/lib/cloudinary";
import { getUserIdFromToken } from "../../utility";
import VenueEvent from "@/models/VenueEvent";

export async function POST(req: NextRequest) {
	try {
		const userId = getUserIdFromToken(req);
		if (!userId) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}
		
		await connectDatabase();
		
		const event = await req.json();
		
		if (!event.name || event.tags.length <= 0 || !event.eventDate || !event.eventDuration || !event.venue || !event.address1 || !event.country || !event.state || !event.city || !event.zipCode) {
			return NextResponse.json({ message: "Required fields are missing" }, { status: 400 });
		}
		
		let imageUrl = "";
		if (event.image) {
			const uploadResponse = await cloudinary.uploader.upload(event.image, {
				folder: 'events',
				resource_type: 'auto'
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
		});

		const savedEvent = await newVenueEvent.save();
		const newEvent = new Event({
			name: event.name,
			tags: event.tags,
			file: imageUrl,
			description: event.description,
			eventDate: event.eventDate,
			eventDuration: event.eventDuration,
			type: "venue",
			linkedEvent: savedEvent._id,

			price: event.price,
			locale: event.locale,
			totalTickets: event.totalTickets,
			isFreeEvent: event.isFreeEvent,
			isDiscount: event.isDiscount,
			discount: event.discount,
			discountType: event.discountType,
			discountPrice: event.discountPrice,
			discountEndDateTime: event.discountEndDateTime,

			isBookingStartImmediately: event.isBookingStartImmediately,
			bookingStartDateTime: event.bookingStartDateTime,
			isBookingContinueTillEventEnd: event.isBookingContinueTillEventEnd,
			bookingEndDateTime: event.bookingEndDateTime,

			isSpecialInstructions: event.isSpecialInstructions,
			specialInstructions: event.specialInstructions,

			isRefundPolicies: event.isRefundPolicies,
			refundBefore: event.refundBefore,
			refundPrecentage: event.refundPrecentage,

			createdBy: userId,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			status: "waitingForApproval"
		});
		
		await newEvent.save();
		console.log("savedEvent", savedEvent);
		console.log("newEvent", newEvent);

		return NextResponse.json({ message: "Event created successfully", eventId: newEvent._id }, { status: 201 });
	} catch (error) {
		console.error('Server error:', error);
		return NextResponse.json({ message: "Server error", error }, { status: 500 });
	}
}