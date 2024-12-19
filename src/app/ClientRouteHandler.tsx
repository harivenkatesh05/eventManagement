'use client';

import Footer from '@/components/footer';
import Header from '@/components/header';
import { UserProvider } from '@/context/UserContext';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

export const useAuthRedirect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUser();

  const handleAuthRequired = () => {
    if (!user) {
      // Store the current path in sessionStorage
      sessionStorage.setItem('redirectAfterLogin', pathname);
      router.push('/auth/signin');
      return false;
    }
    return true;
  };

  return handleAuthRequired;
};

export default function ClientRouteHandler({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith('/auth');
  const isInvoiceRoute = pathname.startsWith('/invoice');

  return (
    <UserProvider>
      <div className={isAuthRoute ? 'auth-layout' : 'main-layout'}>
        {isAuthRoute ? (
          <>{children}</>
        ) : (
          <>
            {isInvoiceRoute ? (
              <>{children}</>
            ) : (
              <>
                <Header />
                {children}
                <Footer />
              </>
            )}
          </>
        )}
      </div>
    </UserProvider>
  );
}
