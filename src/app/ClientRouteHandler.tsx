'use client'

import Footer from '@/components/footer';
import Header from '@/components/header';
import { UserProvider } from '@/context/UserContext';
import { usePathname } from 'next/navigation';

export default function ClientRouteHandler({children}: {children:  React.ReactNode}) {
	const pathname = usePathname();
	const isAuthRoute = pathname.startsWith('/auth');
	const isInvoiceRoute = pathname.startsWith('/invoice');

	return (
		<div className={isAuthRoute ? 'auth-layout' : 'main-layout'}>
			{isAuthRoute ? 
				(<>{children}</>) : 
				(<UserProvider>
					{isInvoiceRoute ? (<>{children}</>) : (
						<>
							<Header />
							{children}
							<Footer />
						</>
					)}
				</UserProvider>)
			}
		</div>
	);
}