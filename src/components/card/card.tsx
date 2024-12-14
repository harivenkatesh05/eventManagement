'use client'

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'

function Card({ title, dateTime, duration, price, image, remaining, id }: { title: string; dateTime: Date; duration: string; price: string; image: string; remaining: number; id: string }) {
	const date = dateTime.getDate() + ' ' + dateTime.toLocaleString('default', { month: 'short' });
	const time = dateTime.toLocaleDateString('en-US', { weekday: 'short' }) + ', ' + dateTime.toLocaleString('default', { hour: '2-digit', minute: '2-digit', hour12: true });
	// const src = `/images/event-imgs/${image}`

	const [imageSrc, setImageSrc] = useState(`/images/event-imgs/${image}`);

	const handleError = () => {
		setImageSrc(`/images/event-imgs/big-1.jpg`);
	}

  	return (
		<div className="main-card mt-4">
			<div className="event-thumbnail">
				<Link href={`/event/${id}`} className="thumbnail-img">
					<Image src={imageSrc} alt="" onError={handleError} width={100} height={100}/>
				</Link>
				{/* <span className="bookmark-icon" title="Bookmark"></span> */}
			</div>
			<div className="event-content">
				<Link href={`/event/${id}`} className="event-title">{title}</Link>
				<div className="duration-price-remaining">
					<span className="duration-price">{price}*</span>
					{remaining > 0 && <span className="remaining"><i className="fa-solid fa-ticket fa-rotate-90"></i>{remaining} Remaining</span>}
				</div>
			</div>
			<div className="event-footer">
				<div className="event-timing">
					<div className="publish-date">
						<span>
							<i className="fa-solid fa-calendar-day me-2"></i>{date}
						</span>
						<span className="dot">
							<i className="fa-solid fa-circle"></i>
						</span>
						<span>{time}</span>
					</div>
					<span className="publish-time">
						<i className="fa-solid fa-clock me-2"></i>{duration}
					</span>
				</div>
			</div>
		</div>
	);
}

export default React.memo(Card)