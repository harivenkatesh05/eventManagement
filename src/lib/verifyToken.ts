import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export function verifyToken(req: Request, res: Response, next: () => void) {
	const token = req.headers.get('authorization')?.split(' ')[1]; // Extract token from header

	if (!token) {
		return NextResponse.json({ message: "No token provided" }, { status: 401 });
	}

	try {
		jwt.verify(token, JWT_SECRET);
		// (req as any).user = decoded;
		next();
	} catch {
		return NextResponse.json({ message: "Invalid token" }, { status: 403 });
	}
}
