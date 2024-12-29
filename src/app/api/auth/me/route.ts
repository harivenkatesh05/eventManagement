import { NextRequest, NextResponse } from "next/server";
import { connectDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { getUserIdFromToken } from "../../utility";
import { storeInRuntime } from "@/lib/runtimeDataStore";
import { getFromRuntime } from "@/lib/runtimeDataStore";
import { sendOTP } from "@/lib/twilio";

export async function GET(req: NextRequest) {
	try {
		const userId = getUserIdFromToken(req);
		if (!userId) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}
		
		let user = getFromRuntime('users', userId);
		if (!user) {
			await connectDatabase();
			user = await User.findById(userId).select('-password');
			console.log("user from db - me");
			if (!user) {
				return NextResponse.json({ error: 'User not found' }, { status: 404 });
			}
			storeInRuntime('users', userId, user);
		}

		if(!user.phoneNumberVerfied && user.phoneNumber) {
			await sendOTP(user.phoneNumber)
		}

		return NextResponse.json(user);
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to get user details' + error }, 
			{ status: 500 }
		);
	}
} 