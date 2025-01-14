import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { TOKEN_COOKIE_NAME } from './app/api/constants'
import type { Request, Response } from 'express'
import compression from 'compression'

// Add compression middleware
const compressMiddleware = compression()

export function middleware(request: NextRequest) {
	const isAuthenticated = request.cookies.get(TOKEN_COOKIE_NAME) // Or however you store auth
	const isAuthPage = request.nextUrl.pathname.startsWith('/auth/signin') || 
						request.nextUrl.pathname.startsWith('/auth/signup')

	// Protected routes that require authentication
	const protectedPaths = [
		'/createEvent',
		'/createEvent/online',
		'/createEvent/venue',
		'/invoice',
		'/auth/me',
		'/auth/send-otp',
		'/auth/update-phone',
		'/auth/verify-otp',
		'/auth/signout',
		'/events/online',
		'/events/venue',
		'/payment/initiate',
		'/payment/status',
		'/purchase',
		'/cache/clear'
	]

	const isProtectedPath = protectedPaths.some(path => 
		request.nextUrl.pathname.startsWith(path)
	)

	if (!isAuthenticated && isProtectedPath) {
		const redirectUrl = new URL('/auth/signin', request.url)
		// redirectUrl.searchParams.set('redirect', request.nextUrl.pathname)
		return NextResponse.redirect(redirectUrl)
	}

	if (isAuthenticated && isAuthPage) {
		return NextResponse.redirect(new URL('/', request.url))
	}

	return new Promise((resolve) => {
		compressMiddleware(request as unknown as Request, 
						  NextResponse as unknown as Response, 
						  () => resolve(NextResponse.next()))
	})
}

export const config = {
	matcher: [
		'/createEvent/:path*',
		'/auth/signin',
		'/auth/signup'
	]
} 