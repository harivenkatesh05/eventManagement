import { NextRequest, NextResponse } from "next/server";
import { verifyOTP } from "@/lib/twilio";
import { connectDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { storeInRuntime } from "@/lib/runtimeDataStore";

export async function POST(request: NextRequest) {
    try {
        const { phoneNumber, code } = await request.json();

        if (!phoneNumber || !code) {
            return NextResponse.json(
                { error: "Phone number and code are required" },
                { status: 400 }
            );
        }

        const isVerified = await verifyOTP(phoneNumber, code);

        if (isVerified) {
            await connectDatabase();
            
            // Update user's phone verification status
            const user = await User.findOneAndUpdate(
                { phoneNumber },
                { $set: { phoneNumberVerfied: true } }
            );

            storeInRuntime("users", user._id, user)
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