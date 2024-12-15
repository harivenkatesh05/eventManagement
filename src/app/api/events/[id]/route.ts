import { connectDatabase } from "@/lib/mongodb";
import Event from "@/models/Event";
import User from "@/models/User";
import VenueEvent from "@/models/VenueEvent";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from 'mongodb';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = await Promise.resolve(context.params);
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

    const user = await User.findById(event.createdBy);
    let venue;
    if(event.type === 'venue') {
      const venueEvent = await VenueEvent.findById(event.linkedEvent);
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
        price: event.price,
        locale: event.locale,
        image: event.image,
        tags: event.tags,
        createdBy: event.createdBy._id,
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