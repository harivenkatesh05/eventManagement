import { NextRequest, NextResponse } from "next/server";
import { sendOTP } from "@/lib/twilio";

export async function POST(request: NextRequest) {
    try {
        const { phoneNumber } = await request.json();

        if (!phoneNumber) {
            return NextResponse.json(
                { error: "Phone number is required" },
                { status: 400 }
            );
        }

        const status = await sendOTP(phoneNumber);

        return NextResponse.json({ status });
    } catch (error) {
        console.error("Error sending OTP:", error);
        return NextResponse.json(
            { error: "Failed to send OTP" },
            { status: 500 }
        );
    }
} 