// /app/api/auth/signout/route.ts
import { NextResponse } from 'next/server';
import { TOKEN_COOKIE_NAME } from '../../constants';

export async function POST() {
	const response = NextResponse.json({ message: 'Signed out successfully' });

	// Clear the auth-token cookie by setting it to expire in the past
	response.cookies.set(TOKEN_COOKIE_NAME, '', {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		expires: new Date(0), // Set expiration to a past date
		path: '/',
	});

	return response;
}
