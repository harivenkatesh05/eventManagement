'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ScriptLoader() {	
	const pathname = usePathname()

	const [isFirstLoad, setIsFirstLoad] = useState(true)
	const [needsDatepicker, setNeedsDatepicker] = useState(pathname?.includes('/createEvent'))
	const [needsDropdown, setNeedsDropdown] = useState(pathname?.includes('/explore') || pathname?.includes('/createEvent'))
	const [needsMixitup, setNeedsMixitup] = useState(pathname === '/explore' || pathname === "/")

	useEffect(() => {
		setNeedsMixitup(pathname === '/explore' || pathname === "/")
	
		// Only load datepicker on pages that need it (create event pages)
		setNeedsDatepicker(pathname?.includes('/createEvent'))
	
		setNeedsDropdown(pathname?.includes('/explore') || pathname?.includes('/createEvent'))
		
		setIsFirstLoad(false)
	}, [pathname])
	// Only load mixitup on pages that need it (explore page)
	
	return (
		<>
		{/* Essential scripts that should load first */}
		<Script src="/js/jquery.min.js" strategy="beforeInteractive" onLoad={() => console.log("jquery loaded")}/>
		<Script src="/vendor/bootstrap/js/bootstrap.bundle.min.js" strategy="beforeInteractive" />
		
		{/* Conditionally loaded scripts */}
		{needsMixitup && (
			<>
				<Script src="/vendor/mixitup/dist/mixitup.min.js" strategy="lazyOnload" onLoad={() => {
					console.log("mixitup loaded")
					setTimeout(() => {
						const containerEl = document.querySelector('[data-ref~="event-filter-content"]');
						if(containerEl) {
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							(globalThis as any).mixitup(containerEl, {
							selectors: {
								target: '[data-ref~="mixitup-target"]'
							}
							});
						}
					}, 10)
				}}/>
			</>
		)}

		{needsDatepicker && (
			<>
				<Script src="/js/datepicker.min.js" strategy={isFirstLoad ? "beforeInteractive" : "afterInteractive"}/>
			</>
		)}

		{needsDropdown && (
			<>
				<Script src="/vendor/bootstrap-select/dist/js/bootstrap-select.min.js" strategy={isFirstLoad ? "beforeInteractive" : "afterInteractive"} onLoad={() => {
					console.log("select loaded")
					$('.selectpicker').selectpicker();
				}} />
			</>
		)}

		{/* Other optional scripts loaded lazily */}
		<Script src="/js/jquery-steps.min.js" strategy="lazyOnload" />
		<Script src="/js/night-mode.js" strategy="lazyOnload" />
		<Script src="/vendor/OwlCarousel/owl.carousel.js" strategy='lazyOnload'/>
		</>
	)
} 