import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';
import { getUserIdFromToken } from '../../utility';

export async function POST(request: NextRequest) {
	try {
		const { phoneNumber, firstName, lastName, email} = await request.json();
		const userId = getUserIdFromToken(request)!;

		const user = await store.getUserByID(userId)
		if (!user) {
			return NextResponse.json(
				{ error: 'User not found' },
				{ status: 404 }
			);
		}

		user.phoneNumber = phoneNumber
		user.firstName = firstName
		user.lastName = lastName
		user.email = email

		await store.saveUser(user)

		return NextResponse.json({ user });
	} catch (error) {
		console.error('Update phone error:', error);
		return NextResponse.json(
			{ error: 'Failed to update phone number' },
			{ status: 500 }
		);
	}
}