import { NextRequest, NextResponse } from "next/server";
import { connectDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { getUserIdFromToken } from "../../utility";

export async function GET(req: NextRequest) {
	try {
		const userId = getUserIdFromToken(req);
		if (!userId) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}
		
		await connectDatabase();
		
		// Get user details excluding password
		const user = await User.findById(userId).select('-password');
		if (!user) {
		return NextResponse.json({ error: 'User not found' }, { status: 404 });
		}

		return NextResponse.json(user);
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to get user details' }, 
			{ status: 500 }
		);
	}
} 