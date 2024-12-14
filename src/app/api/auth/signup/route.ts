import { NextResponse } from "next/server";
import { connectDatabase } from "../../../../lib/mongodb";
import User from "../../../../models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
	try {
		await connectDatabase();

		const { firstName, lastName, email, password } = await req.json();

		if (!firstName || !lastName || !email || !password) {
			return NextResponse.json({ message: "All fields are required" }, { status: 400 });
		}
		
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return NextResponse.json({ message: "Email already in use" }, { status: 400 });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = new User({ firstName, lastName, email, password: hashedPassword });
		await newUser.save();

		return NextResponse.json({ message: "User created successfully" }, { status: 201 });
	} catch (error) {
		return NextResponse.json({ message: "Server error", error }, { status: 500 });
	}
}