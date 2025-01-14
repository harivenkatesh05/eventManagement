import { connectDatabase } from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { getUserIdFromToken } from '@/app/api/utility';
import Purchase from '@/models/Purchase';
import { store } from '@/lib/store';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;
		const purchaseForm: VenuePurchaseForm = await request.json();
		console.log('online purchaseform', purchaseForm);

		await connectDatabase();

		const event = await store.getEvent(id);
		const venueEvent = await store.getLinkedVenueEvent(event.linkedEvent)
		const userId = getUserIdFromToken(request);

		if (!event) {
			return NextResponse.json({ message: 'Event not found' }, { status: 404 });
		}
		if(!venueEvent) {
			return NextResponse.json({ message: 'Venue Event not found' }, { status: 404 });
		}
		if (!userId) {
			return NextResponse.json({ message: 'User not found' }, { status: 404 });
		}

		const ticket = venueEvent.tickets.find((ticket) => ticket.id === purchaseForm.ticketID);
		if(!ticket) {
			return NextResponse.json({ message: 'Ticket not found' }, { status: 404 });
		}
		if (ticket.remaining <= 0) {
			return NextResponse.json(
				{ message: 'Not enough tickets available' },
				{ status: 400 }
			);
		}

		const purchase = new Purchase({
			eventId: event._id,
			userId,
			tickets: purchaseForm.tickets,
			totalAmount: 0,
			status: 'confirmed',
			purchaseDate: new Date(),
			firstName: purchaseForm.firstName,
			lastName: purchaseForm.lastName,
			phoneNumber: purchaseForm.phoneNumber,
			ticketID: ticket.id
			// barcode will be auto-generated
		});

		await purchase.save();

		ticket.remaining -= purchaseForm.tickets;
		store.saveVenueEvent(venueEvent)

		// await sendMail({
		// 	firstName: purchaseForm.firstName,
		// 	lastName: purchaseForm.lastName,
		// 	purchaseId: purchase._id,
		// 	toEmail: purchaseForm.email,
		// 	tickets: purchaseForm.tickets,
		// });

		return NextResponse.json({
			message: 'Booking successful',
			purchaseId: purchase._id,
			// barcode: purchase.barcode
		});
	} catch (error) {
		console.error('Error booking event:', error);
		return NextResponse.json(
			{ message: 'Failed to book event' },
			{ status: 500 }
		);
	}
}
