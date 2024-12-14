'use client'

import Footer from '@/components/footer';
import Header from '@/components/header';
import { UserProvider } from '@/context/UserContext';
import { usePathname } from 'next/navigation';

export default function ClientRouteHandler({children}: {children:  React.ReactNode}) {
	const pathname = usePathname();
	const isAuthRoute = pathname.startsWith('/auth');

	return (
		<div className={isAuthRoute ? 'auth-layout' : 'main-layout'}>
			{isAuthRoute ? 
				(<>{children}</>) : 
				(<UserProvider>
					<Header />
					{children}
					<Footer />
				</UserProvider>)
			}
		</div>
	);
}