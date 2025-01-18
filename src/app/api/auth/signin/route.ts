import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDatabase } from "../../../../lib/mongodb";
import { NextResponse } from "next/server";
import { TOKEN_COOKIE_NAME } from "../../constants";
import { sendOTP } from "@/lib/twilio";
import { store } from "@/lib/store";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: Request) {
	try {
		await connectDatabase();

		const { email, password } = await req.json();

		if (!email || !password) {
			return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
		}

		const user = await store.getUserByEmail(email);
		if (!user) {
			return NextResponse.json({ message: "User not found" }, { status: 404 });
		}
		
		const isPasswordValid = await bcrypt.compare(password, user.password!);

		if (!isPasswordValid) {
			return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
		}

		const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET!, {
			expiresIn: process.env.JWT_EXPIRATION,
		});

		
		if(!user.phoneNumberVerfied) {
			const status = await sendOTP(user.phoneNumber);
			console.log("otp sent", status)
		}

		const response = NextResponse.json({ message: "Login successful", token, user }, { status: 200 });
		response.cookies.set(TOKEN_COOKIE_NAME, token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			path: '/',
			maxAge: 60 * 60 * Number(process.env.JWT_EXPIRATION?.split('h')[0] ?? 24),
		});
		return response;
	} catch (error) {
		return NextResponse.json({ message: "Server error", error }, { status: 500 });
	}
}
