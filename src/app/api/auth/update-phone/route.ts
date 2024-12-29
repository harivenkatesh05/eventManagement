import { NextResponse } from 'next/server';
import User from '@/models/User';
import connectDatabase from '@/lib/mongodb';
import { sendOTP } from '@/lib/twilio';
import { storeInRuntime } from '@/lib/runtimeDataStore';

export async function POST(request: Request) {
	try {
		const { email, phoneNumber } = await request.json();
		
		await connectDatabase();

		const user = await User.findOneAndUpdate(
			{ email },
			{ phoneNumber },
			{ new: true }
		);

		storeInRuntime("users", user._id, user)

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