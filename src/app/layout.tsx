import type { Metadata } from "next";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';
import { roboto } from './fonts'
import ClientRouteHandler from "./ClientRouteHandler";
import ScriptLoader from "@/components/ScriptLoader";
import StyleLoader from "@/components/StyleLoader";

// import "../../public/vendor/unicons-2.0.1/css/unicons.css"
import "../../public/css/style.css"
import "../../public/css/responsive.css"
import "./global.css"
import "../../public/vendor/fontawesome-free/css/all.min.css"
import "../../public/vendor/bootstrap/css/bootstrap.min.css"

export const metadata: Metadata = {
	title: "Bukit - Simple Online Event Ticketing System",
	description: "Event Management System",
	authors: [{ name: "Venkatesh" }],
	icons: {
		icon: 'images/icons/logo.png'
	}
};

export const viewport = 'width=device-width, shrink-to-fit=9';

// export function head() {
// 	return (
// 		<>
// 			<meta charSet="utf-8" />
// 			<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
			
// 			<link rel="preconnect" href="https://fonts.googleapis.com" />
// 			<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
// 			<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
// 		</>
// 	);
// }

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={roboto.className}>
			<body>
				<GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
					<div className="d-flex flex-column h-100">
						<ClientRouteHandler>
							{children}
						</ClientRouteHandler>
					</div>
				</GoogleOAuthProvider>
				<StyleLoader />
				<ScriptLoader />
				<Toaster position="bottom-left" />
			</body>
		</html>
	);
}
