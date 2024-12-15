import { connectDatabase } from "@/lib/mongodb";
import Event from "@/models/Event";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from 'mongodb';
import { getUserIdFromToken } from "@/app/api/utility";
import Purchase from "@/models/Purchase";

export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;
		const { tickets } = await request.json();
		await connectDatabase();

		// Validate ID format
		if (!ObjectId.isValid(id)) {
			return NextResponse.json(
				{ message: "Invalid event ID" },
				{ status: 400 }
			);
		}

		const event = await Event.findById(id);
		
		if (!event) {
			return NextResponse.json(
				{ message: "Event not found" },
				{ status: 404 }
			);
		}

		const userId = await getUserIdFromToken(request);
		if(!userId) {
			return NextResponse.json(
				{ message: "User not found" },
				{ status: 404 }
			);
		}

		if(event.remaining <= 0) {
			return NextResponse.json(
				{ message: "Event is full" },
				{ status: 400 }
			);
		}

		if(event.remaining < tickets) {
			return NextResponse.json(
				{ message: "Not enough tickets available" },
				{ status: 400 }
			);
		}

		const purchase = new Purchase({
			eventId: event._id,
			userId,
			tickets,
			totalAmount: event.price * tickets,
			status: 'confirmed',
			purchaseDate: new Date(),
			// barcode will be auto-generated
		});

		
		await purchase.save();

		event.remaining -= tickets;
		await event.save();

		return NextResponse.json({ 
			message: 'Booking successful',
			purchaseId: purchase._id,
			// barcode: purchase.barcode 
		});
	} catch (error) {
		console.error('Error booking event:', error);
		return NextResponse.json(
			{ message: "Failed to book event" },
			{ status: 500 }
		);
	}
} 