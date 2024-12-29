import { NextRequest, NextResponse } from 'next/server';
import { connectDatabase } from '../../../../lib/mongodb';
import Event from '@/models/Event';
import cloudinary from '@/lib/cloudinary';
import { getUserIdFromToken } from '../../utility';
import VenueEvent from '@/models/VenueEvent';
import { storeInRuntime } from '@/lib/runtimeDataStore';
import mongoose from 'mongoose';

export async function POST(req: NextRequest) {
  await connectDatabase();

  const event = await req.json();

  const session = await mongoose.startSession();
  try {
    // await connectDatabase();

    // const event = await req.json();

    const userId = getUserIdFromToken(req);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('venue event create', event);

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
      const uploadResponse = await cloudinary.uploader.upload(event.image, {
        folder: 'events',
        resource_type: 'auto',
      });
      imageUrl = uploadResponse.secure_url;
    }

    session.startTransaction();

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
      ticketType: event.ticketType,
      tickets: event.tickets,
    });

    const savedVenueEvent = await newVenueEvent.save();
    console.log('savedVenueEvent', savedVenueEvent);

    const newEvent = new Event({
      name: event.name,
      tags: event.tags,
      image: imageUrl,
      description: event.description,
      eventDate: event.eventDate,
      eventDuration: event.eventDuration,
      type: 'venue',

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
      status: 'waitingForApproval',

      linkedEvent: savedVenueEvent._id,

      remaining: event.totalTickets,
    });

    const savedEvent = await newEvent.save();
    console.log('savedEvent', savedEvent);

    await session.commitTransaction();

    storeInRuntime('events', savedEvent._id.toString(), savedEvent);
    storeInRuntime(
      'venueEvents',
      savedVenueEvent._id.toString(),
      savedVenueEvent
    );

    return NextResponse.json(
      { message: 'Event created successfully', eventId: savedEvent._id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Server error:', error);
    await session.abortTransaction();

    return NextResponse.json(
      { message: 'Server error', error },
      { status: 500 }
    );
  } finally {
    session.endSession();
  }
}
