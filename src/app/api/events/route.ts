import { store } from '@/lib/store';
import { NextResponse } from 'next/server';
import { isOnlineEvent } from '../utility';

// A simple GET handler to simulate adding a product reminder
export async function GET() {
	try {
		const promiseEvents = (await store.getEvents()).map(async (event) => {
			const linkedEvent = await store.getLinkedEvent(event.linkedEvent, event.type)

			let price, remaining;
			if(isOnlineEvent(linkedEvent)) {
				price = linkedEvent.price
				remaining = linkedEvent.remaining
			}
			else {
				price = Math.min(...linkedEvent.tickets.map((ticket) => ticket.price))
				remaining = linkedEvent.tickets.reduce((sum, ticket) => sum + ticket.remaining, 0)
			}
			return {
				id: event._id,
				type: event.type,
				name: event.name,
				description: event.description,
				eventDate: event.eventDate,
				eventDuration: event.eventDuration,
				image: event.image,
				tags: event.tags,
				
				price,
				remaining
			}
		})

		const events = await Promise.all(promiseEvents)

		const response = NextResponse.json(
			{ events },
			{ status: 200 }
		)

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
