import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { TOKEN_COOKIE_NAME } from "./constants";

export function getUserIdFromToken(req: NextRequest) {
	const authToken = req.cookies.get(TOKEN_COOKIE_NAME);
	if (!authToken) {
		return null;
	}
	const decoded = jwt.verify(authToken.value, process.env.JWT_SECRET!) as { id: string };
	return decoded.id;
}