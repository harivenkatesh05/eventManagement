import connectDatabase from '@/lib/mongodb';
import { getAllFromRuntime, storeInRuntime } from '@/lib/runtimeDataStore';
import Event from '@/models/Event';
import { NextResponse } from 'next/server';

// Add cache control headers
export const revalidate = 60; // Revalidate every 60 seconds

// A simple GET handler to simulate adding a product reminder
export async function GET() {
	try {
		let events = getAllFromRuntime('events').filter(event => event.status !== 'waitingForApproval');
		if(events.length === 0) {
			await connectDatabase();
			events = await Event.find({ status: { $ne: 'waitingForApproval' } });
			console.log("events from db - events");
			events.forEach(event => {
				if (event && typeof event === 'object' && '_id' in event) {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					storeInRuntime('events', (event._id as any).toString(), event);
				}
			});
		}

		const response = NextResponse.json(
			{
				events: events.map((event) => ({
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
					remaining: event.remaining,
					isFreeEvent: event.isFreeEvent,
				})),
			},
			{ status: 200 }
		);

		// Add cache headers
		response.headers.set(
			'Cache-Control',
			'public, s-maxage=60, stale-while-revalidate=300'
		);

		return response;
	} catch (error) {
		console.error('Error:', error);
		return new Response(JSON.stringify({ error: 'Failed to fetch events' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	}
}
