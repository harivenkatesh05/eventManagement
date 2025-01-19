'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function StyleLoader() {
 	const pathname = usePathname()

 	useEffect(() => {
		// Load CSS files based on route
		const loadStyles = async () => {
			// Create event pages need bootstrap-select
			if (pathname?.includes('/createEvent') || pathname?.includes('/explore')) {
				await import('../../public/vendor/bootstrap-select/dist/css/bootstrap-select.min.css')
			}

			// Pages with carousels need owl carousel
			if (pathname === '/' || pathname?.includes('/event/')) {
				await Promise.all([
					import('../../public/vendor/OwlCarousel/assets/owl.carousel.css'),
					import('../../public/vendor/OwlCarousel/assets/owl.theme.default.min.css')
				])
			}

			// Night mode styles
			await import('../../public/css/night-mode.css')
		}

		loadStyles()
  	}, [pathname])

  	return null
} 