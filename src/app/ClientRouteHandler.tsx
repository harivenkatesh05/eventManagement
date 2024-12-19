'use client';

import Footer from '@/components/footer';
import Header from '@/components/header';
import { UserProvider } from '@/context/UserContext';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

export const useAuthRedirect = () => {
  const router = useRouter();
  const pathname = usePathname();
  console.log('pathname', pathname);

  const { user } = useUser();
  console.log('UseUser', useUser());

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
    <div className={isAuthRoute ? 'auth-layout' : 'main-layout'}>
      {/* {isAuthRoute ? (
        <>{children}</>
      ) : (
        <UserProvider>
          {isInvoiceRoute ? (
            <>{children}</>
          ) : (
            <>
              <Header />
              {children}
              <Footer />
            </>
          )}
        </UserProvider>
      )} */}
      <UserProvider>
        {isAuthRoute || isInvoiceRoute ? (
          <>{children}</>
        ) : (
          <>
            <Header />
            {children}
            <Footer />
          </>
        )}
      </UserProvider>
    </div>
  );
}
