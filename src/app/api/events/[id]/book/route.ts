import { connectDatabase } from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getUserIdFromToken } from '@/app/api/utility';
import Purchase from '@/models/Purchase';
import { sendMail } from './sendMail';
import { getFromRuntime } from '@/lib/runtimeDataStore';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const purchaseForm = await request.json();
    await connectDatabase();

    // Validate ID format
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: 'Invalid event ID' },
        { status: 400 }
      );
    }

    const event = getFromRuntime('events', id);

    if (!event) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }

    const userId = await getUserIdFromToken(request);
    if (!userId) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    if (event.remaining <= 0) {
      return NextResponse.json({ message: 'Event is full' }, { status: 400 });
    }

    if (event.remaining < purchaseForm.tickets) {
      return NextResponse.json(
        { message: 'Not enough tickets available' },
        { status: 400 }
      );
    }

    const purchase = new Purchase({
      eventId: event._id,
      userId,
      tickets: purchaseForm.tickets,
      totalAmount: event.price * purchaseForm.tickets,
      status: 'confirmed',
      purchaseDate: new Date(),
      firstName: purchaseForm.firstName,
      lastName: purchaseForm.lastName,
      phoneNumber: purchaseForm.phoneNumber,
      address: purchaseForm.address,
      city: purchaseForm.city,
      state: purchaseForm.state,
      zip: purchaseForm.zip,
      country: purchaseForm.country,
      // barcode will be auto-generated
    });

    await purchase.save();

    event.remaining -= purchaseForm.tickets;
    await event.save();
    await sendMail({
      firstName: purchaseForm.firstName,
      lastName: purchaseForm.lastName,
      purchaseId: purchase._id,
    });

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
