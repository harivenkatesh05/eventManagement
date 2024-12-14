import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { TOKEN_COOKIE_NAME } from './app/api/constants'

export function middleware(request: NextRequest) {
	const isAuthenticated = request.cookies.get(TOKEN_COOKIE_NAME) // Or however you store auth
	const isAuthPage = request.nextUrl.pathname.startsWith('/auth/signin') || 
						request.nextUrl.pathname.startsWith('/auth/signup')

	// Protected routes that require authentication
	const protectedPaths = [
		'/createEvent',
		'/createEvent/online',
		'/createEvent/venue'
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

	return NextResponse.next()
}

export const config = {
	matcher: [
		'/createEvent/:path*',
		'/auth/signin',
		'/auth/signup'
	]
} 