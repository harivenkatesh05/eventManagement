import { connectDatabase } from "@/lib/mongodb";
import Purchase from "@/models/Purchase";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from 'mongodb';
import { getUserIdFromToken } from "@/app/api/utility";
import { store } from "@/lib/store";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await Promise.resolve(params);
		await connectDatabase();

		// Validate ID format
		if (!ObjectId.isValid(id)) {
			return NextResponse.json(
				{ message: "Invalid purchase ID" },
				{ status: 400 }
			);
		}

		// Get current user
		const userId = getUserIdFromToken(request);
		if (!userId) {
			return NextResponse.json(
				{ message: "Unauthorized" },
				{ status: 401 }
			);
		}

		// Find purchase and populate event details
		const purchase = await Purchase.findById(id)
		if (!purchase) {
			return NextResponse.json(
				{ message: "Purchase not found" },
				{ status: 404 }
			);
		}

		// Check if purchase belongs to current user
		if (purchase.userId.toString() !== userId.toString()) {
			return NextResponse.json(
				{ message: "Unauthorized access to purchase" },
				{ status: 403 }
			);
		}

		const event = await store.getEvent(purchase.eventId)
		return NextResponse.json({
			id: purchase._id,
			event: {
				name: event.name,
				image: event.image,
				type: event.type,
				date: event.eventDate
			},
			eventId: purchase.eventId._id,
			tickets: purchase.tickets,
			totalAmount: purchase.totalAmount,
			purchaseDate: purchase.purchaseDate,
			barcode: purchase.barcode,
			
			firstName: purchase.firstName,
			lastName: purchase.lastName,
			email: purchase.email,
			phone: purchase.phone,
			address: purchase.address,
			city: purchase.city,
			state: purchase.state,
			zip: purchase.zip,
			country: purchase.country
		});

	} catch (error) {
		console.error('Error fetching purchase:', error);
		return NextResponse.json(
			{ message: "Failed to fetch purchase" },
			{ status: 500 }
		);
	}
} 