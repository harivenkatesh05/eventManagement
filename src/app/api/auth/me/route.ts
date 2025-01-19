import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromToken } from "../../utility";
import { store } from "@/lib/store";

export async function GET(req: NextRequest) {
	try {
		const userId = getUserIdFromToken(req);
		if (!userId) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}
		
		const user = await store.getUserByID(userId);
		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 });
		}

		return NextResponse.json({
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			password: user.password,
			phoneNumber: user.phoneNumber,
			phoneNumberVerfied: user.phoneNumberVerfied
		});
		
	} catch (error) {
		return NextResponse.json(
			{ error: 'Failed to get user details' + error }, 
			{ status: 500 }
		);
	}
} 