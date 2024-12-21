import { NextRequest, NextResponse } from "next/server";
import { connectDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { getUserIdFromToken } from "../../utility";
import { storeInRuntime } from "@/lib/runtimeDataStore";
import { getFromRuntime } from "@/lib/runtimeDataStore";

export async function GET(req: NextRequest) {
	try {
		const userId = getUserIdFromToken(req);
		if (!userId) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}
		
		await connectDatabase();
		
		let user = getFromRuntime('users', userId);
		console.log("user from runtime");
		if (!user) {
			user = await User.findById(userId).select('-password');
			console.log("user from db - me");
			if (!user) {
				return NextResponse.json({ error: 'User not found' }, { status: 404 });
			}
			storeInRuntime('users', userId, user);
		}

		return NextResponse.json(user);
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to get user details' + error }, 
			{ status: 500 }
		);
	}
} 