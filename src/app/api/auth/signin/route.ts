import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDatabase } from "../../../../lib/mongodb";
import User from "../../../../models/User";
import { NextResponse } from "next/server";
import { TOKEN_COOKIE_NAME } from "../../constants";
import { getFromRuntimeByKey, storeInRuntime } from "@/lib/runtimeDataStore";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: Request) {
	try {
		await connectDatabase();

		const { email, password } = await req.json();

		if (!email || !password) {
			return NextResponse.json({ message: "Email and password are required" }, { status: 400 });
		}

		let user = getFromRuntimeByKey('users', 'email', email);

		if (!user) {
			user = await User.findOne({ email }) ?? undefined;
			console.log("user from db - signin");
			if (!user) {
				return NextResponse.json({ message: "User not found" }, { status: 404 });
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			storeInRuntime('users', (user!._id as any).toString(), user!);
		}

		const isPasswordValid = await bcrypt.compare(password, user.password!);

		if (!isPasswordValid) {
			return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
		}

		const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET!, {
			expiresIn: process.env.JWT_EXPIRATION,
		});

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
