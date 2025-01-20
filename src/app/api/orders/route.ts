import { NextRequest, NextResponse } from 'next/server';
import { getUserIdFromToken } from '../utility';
import Purchase from '@/models/Purchase';
import connectDatabase from '@/lib/mongodb';

// A simple GET handler to simulate adding a product reminder
export async function GET(request: NextRequest) {
	try {
		const userId = getUserIdFromToken(request);
		
		await connectDatabase()
		const purchases = await Purchase.find({userId, status: 'completed'}).populate('eventId');

		const response = NextResponse.json(
			{ order: purchases.map((order) => {
				return {
					id: order._id,
					event: {
						name: order.eventId.name,
						image: order.eventId.image,
						date: order.eventId.eventDate
					},
					totalAmount: order.totalAmount,
					tickets: order.tickets
				}
			}) },
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
