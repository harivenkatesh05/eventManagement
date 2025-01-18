import { NextRequest, NextResponse } from 'next/server';
import { sendOTP } from '@/lib/twilio';
import { store } from '@/lib/store';
import { getUserIdFromToken } from '../../utility';

export async function POST(request: NextRequest) {
	try {
		const { phoneNumber } = await request.json();
		const userId = getUserIdFromToken(request)!;

		const user = await store.getUserByID(userId)
		user.phoneNumber = phoneNumber

		await store.saveUser(user)

		if (!user) {
			return NextResponse.json(
				{ error: 'User not found' },
				{ status: 404 }
			);
		}

		if(!user.phoneNumberVerfied) {
			const status = await sendOTP(user.phoneNumber);
			console.log("otp sent", status)
		}

		return NextResponse.json({ user });
	} catch (error) {
		console.error('Update phone error:', error);
		return NextResponse.json(
			{ error: 'Failed to update phone number' },
			{ status: 500 }
		);
	}
}