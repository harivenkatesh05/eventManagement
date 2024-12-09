import React from 'react'

function Card({ title, dateTime, duration, price, image, remaining }: { title: string; dateTime: Date; duration: number; price: string; image: string; remaining: number }) {
	const date = dateTime.getDate() + ' ' + dateTime.toLocaleString('default', { month: 'short' });
	const time = dateTime.toLocaleDateString('en-US', { weekday: 'short' }) + ', ' + dateTime.toLocaleString('default', { hour: '2-digit', minute: '2-digit', hour12: true });

  	return (
		<div className="main-card mt-4">
			<div className="event-thumbnail">
				<a href="venue_event_detail_view.html" className="thumbnail-img">
					<img src={`images/event-imgs/${image}`} alt="" />
				</a>
				{/* <span className="bookmark-icon" title="Bookmark"></span> */}
			</div>
			<div className="event-content">
				<a href="venue_event_detail_view.html" className="event-title">{title}</a>
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
						<i className="fa-solid fa-clock me-2"></i>{duration}h
					</span>
				</div>
			</div>
		</div>
	);
}

export default Card