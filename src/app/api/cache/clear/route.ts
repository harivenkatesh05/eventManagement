import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromToken } from "../../utility";
import { store } from "@/lib/store";

export async function POST(request: NextRequest) {
	try {
		const userId = getUserIdFromToken(request);
		if(userId !== "676d9d8a86d9dabaf29972df") {
			return NextResponse.json({ message: 'You are not authorized to clear the runtime store' });
		}

		store.clear();
		return NextResponse.json({ message: 'All runtime stores cleared' });

	} catch (error) {
		console.error('Clear runtime store error:', error);
		return NextResponse.json(
			{ error: 'Failed to clear runtime store' },
			{ status: 500 }
		);
	}
} 