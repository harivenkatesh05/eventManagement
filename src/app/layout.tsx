import type { Metadata } from "next";

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
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
	title: "Barren - Simple Online Event Ticketing System",
	description: "Event Management System",
	authors: [{ name: "Venkatesh" }],
	icons: {
		icon: 'images/fav.png'
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
				<div className="d-flex flex-column h-100">
					<Header />
					{children}
					<Footer />
				</div>
				
				<Script src="/js/jquery.min.js" />
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
			</body>
		</html>
	);
}
