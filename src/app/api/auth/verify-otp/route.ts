import { NextRequest, NextResponse } from "next/server";
import { verifyOTP } from "@/lib/twilio";
import { store } from "@/lib/store";
import { getUserIdFromToken } from "../../utility";

export async function POST(request: NextRequest) {
    try {
        const userId = getUserIdFromToken(request)!;
        const { phoneNumber, code } = await request.json();

        if (!phoneNumber || !code) {
            return NextResponse.json(
                { error: "Phone number and code are required" },
                { status: 400 }
            );
        }

        const isVerified = await verifyOTP(phoneNumber, code);

        if (isVerified) {
            
            // Update user's phone verification status
            const user = await store.getUserByID(userId)
            user.phoneNumberVerfied = true

            await store.saveUser(user)

            return NextResponse.json({ verified: true });
        }

        return NextResponse.json({ verified: false });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        return NextResponse.json(
            { error: "Failed to verify OTP" },
            { status: 500 }
        );
    }
} 