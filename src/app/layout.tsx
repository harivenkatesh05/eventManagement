import type { Metadata } from "next";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';

import "../../public/vendor/unicons-2.0.1/css/unicons.css"
import "../../public/css/style.css"
import "../../public/css/night-mode.css"
import "../../public/vendor/fontawesome-free/css/all.min.css"
import "../../public/vendor/OwlCarousel/assets/owl.carousel.css"
import "../../public/vendor/OwlCarousel/assets/owl.theme.default.min.css"
import "../../public/vendor/bootstrap/css/bootstrap.min.css"
import "../../public/vendor/bootstrap-select/dist/css/bootstrap-select.min.css"
import "../../public/css/responsive.css"
import "./global.css"

import Script from "next/script";
import { roboto } from './fonts'
import ClientRouteHandler from "./ClientRouteHandler";

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
				<Script src="/js/jquery.min.js" />
				<Script src="/js/jquery-steps.min.js"></Script>
				<Script src="/js/datepicker.min.js"></Script>
				<Script src="/vendor/bootstrap/js/bootstrap.bundle.min.js" />
				<Script src="/vendor/OwlCarousel/owl.carousel.js" />
				<Script src="/vendor/bootstrap-select/dist/js/bootstrap-select.min.js" />
				<Script src="/vendor/mixitup/dist/mixitup.min.js" />
				<Script src="/js/custom.js" />
				<Script src="/js/night-mode.js" />
				<Script id="mixitup-init">
					{`
						setTimeout(() => {
							var containerEl = document.querySelector('[data-ref~="event-filter-content"]');
							var mixer = mixitup(containerEl, {
								selectors: {
									target: '[data-ref~="mixitup-target"]'
								}
							});
						}, 1000);
					`}
				</Script>
				<Script id="datepicker-init">
					{`
						setTimeout(() => {	
							$.fn.datepicker.language['en'] = {
								days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
								daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
								daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
								months: ['January','February','March','April','May','June', 'July','August','September','October','November','December'],
								monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
								today: 'Today',
								clear: 'Clear',
								dateFormat: 'mm/dd/yyyy',
								timeFormat: 'hh:ii aa',
								firstDay: 0
							};
						});
					`}
				</Script>
				<Toaster position="bottom-left" />
			</body>
		</html>
	);
}
