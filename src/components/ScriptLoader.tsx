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
		<Script src="/js/jquery.min.js" strategy="beforeInteractive" />
		<Script src="/vendor/bootstrap/js/bootstrap.bundle.min.js" strategy="beforeInteractive" />
		
		{/* Conditionally loaded scripts */}
		{needsMixitup && (
			<>
			<Script src="/vendor/mixitup/dist/mixitup.min.js" strategy="lazyOnload" onLoad={() => {
				setTimeout(() => {
					var containerEl = document.querySelector('[data-ref~="event-filter-content"]');
					if(containerEl) {
						var mixer = (window as any).mixitup(containerEl, {
						selectors: {
							target: '[data-ref~="mixitup-target"]'
						}
						});
					}
				}, 1000)
			}}/>
			</>
		)}

		{needsDatepicker && (
			<>
			<Script src="/js/datepicker.min.js" strategy={isFirstLoad ? "beforeInteractive" : "afterInteractive"} onLoad={() => {
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
				})
			}}/>
			</>
		)}

		{needsDropdown && (
			<>
				<Script src="/vendor/bootstrap-select/dist/js/bootstrap-select.min.js" strategy={isFirstLoad ? "beforeInteractive" : "afterInteractive"} onLoad={() => {
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