import {Swiper, SwiperSlide} from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

// import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { JSX, useState, useEffect } from 'react';

export default function Swipper({slides}: {slides: JSX.Element[]}) {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 400);
		};

		handleResize(); // Set initial value
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
  
	return <Swiper 
		slidesPerView={isMobile ? 1 : 3}
		centeredSlides={true}
		spaceBetween={30}
		effect="fade"
		fadeEffect={{
			crossFade: true
		}}
		autoplay={{
			delay: 2500,
			disableOnInteraction: false,
		}}
		pagination={{
			clickable: true,
		}}
		loop={true}
		navigation={!isMobile}
		modules={[Autoplay, Pagination, Navigation]}
		className="mySwiper"
	>
		{slides.map((slide: JSX.Element, index: number) => {
			return <SwiperSlide key={index}>{slide}</SwiperSlide>
		})}
	</Swiper>
}