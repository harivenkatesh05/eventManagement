import {Swiper, SwiperSlide} from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

// import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { JSX } from 'react';

export default function Swipper({slides}: {slides: JSX.Element[]}) {
	return <Swiper 
		slidesPerView={3}
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
		navigation={true}
		modules={[Autoplay, Pagination, Navigation]}
		className="mySwiper"
	>
		{slides.map((slide: JSX.Element, index: number) => {
			return <SwiperSlide key={index}>{slide}</SwiperSlide>
		})}
	</Swiper>
}