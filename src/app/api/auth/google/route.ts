import { NextRequest, NextResponse } from "next/server";
import { connectDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import { TOKEN_COOKIE_NAME } from "../../constants";
import { getFromRuntimeByKey, storeInRuntime } from "@/lib/runtimeDataStore";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function POST(req: NextRequest) {
	try {
		const { credential } = await req.json();
		
		const ticket = await client.verifyIdToken({
			idToken: credential,
			audience: process.env.GOOGLE_CLIENT_ID
		});

		const payload = ticket.getPayload();
		if (!payload) {
			return NextResponse.json({ error: "Invalid token" }, { status: 400 });
		}
		await connectDatabase();

		// Check if user exists
		let user = getFromRuntimeByKey('users', 'email', payload.email!);

		if (!user) {
			user = await User.findOne({ email: payload.email }) ?? undefined;
			if (!user) {
				// Create new user if doesn't exist
				user = await User.create({
					email: payload.email,
					firstName: payload.given_name,
					lastName: payload.family_name,
					password: "", // No password for Google auth
					googleId: payload.sub,
					picture: payload.picture,
					phoneNumber: null
				});
			}

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			storeInRuntime('users', (user!._id as any).toString(), user!);
		}

		// Generate JWT
		const token = jwt.sign(
			{ id: user!._id, email: user!.email },
			process.env.JWT_SECRET!,
			{ expiresIn: process.env.JWT_EXPIRATION }
		);

		const response = NextResponse.json(
			{ message: "Login successful", token, user },
			{ status: 200 }
		);

		// Set cookie
		response.cookies.set(TOKEN_COOKIE_NAME, token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: 60 * 60 * Number(process.env.JWT_EXPIRATION?.split("h")[0] ?? 24)
		});

		return response;

	} catch (error) {
		console.error("Google auth error:", error);
		return NextResponse.json(
			{ error: "Authentication failed" },
			{ status: 500 }
		);
	}
} 