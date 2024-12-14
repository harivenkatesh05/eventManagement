'use client'

import { formatDateToIST, getDateObj } from '@/util/date';
import Image from 'next/image';
import Link from 'next/link'
import { notFound, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import EventDetailSkeleton from '@/components/event/skeleton';
import Countdown from '@/components/event/countdown'
import { fetchEvent, fetchEvents } from '@/app/apis';
import Card from '@/components/card/card';

const getBookingStatus = (startDate: string, endDate: string, eventDate: string, remaining: number) => {
	const now = new Date();
	const start = new Date(startDate);
	const end = new Date(endDate);
	const event = new Date(eventDate);
	if (now < start) {
		return { status: 'upcoming', text: 'Opens Soon' };
	} else if (now > end || now > event) {
		return { status: 'ended', text: 'Event Ended' };
	} else if (remaining <= 0) {
		return { status: 'soldout', text: 'Sold Out' };
	} else {
		return { status: 'active', text: 'Book Now' };
	}
};

export default function EventDetail() {
	
	const pathname = usePathname();
	const [event, setEvent] = useState<EventFullDetail | null>(null)
	const [events, setEvents] = useState<EventType[]>([])
	const [loading, setLoading] = useState(true)
	
	useEffect(() => {
		const id = pathname.split('/')[2];
		
		// Add loading state and error handling
		setLoading(true);
		fetchEvent(id)
			.then((event: EventFullDetail) => {
				if (!event) {
					notFound() // Redirect if event not found
					return;
				}
				setEvent(event);
			})
			.catch((error) => {
				console.error('Error fetching event:', error);
				notFound(); // Redirect on error
			})
			.finally(() => {
				setLoading(false);
			});
		
		fetchEvents().then((events: EventType[]) => {
			const remainingEvents = events.filter((event) => event.id !== id)
			setEvents(remainingEvents)
			setLoading(false)

			setTimeout(() => {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				$(".owl-carousel").owlCarousel({
					items: 3, // Number of items to display
					loop: true,
					margin: 10,
					nav: true,
					autoplay: true,
				});
			}, 20)
		})
	}, [pathname])
	
	const handleShare = async (platform: string) => {
		// if (navigator.share) {
		// 	try {
		// 		await navigator.share({
		// 			title: 'Check out this cool link!',
		// 			text: 'This is a description of the content I want to share.',
		// 			url: window.location.href, // or any URL you want to share
		// 		});
		// 		console.log('Successfully shared');
		// 	} catch (error) {
		// 		console.error('Error sharing', error);
		// 	}
		// } else {
			const currentUrl = window.location.href;
			const subject = 'Check out this page!';
			const body = `I found this page interesting: ${window.location.href}`;

			switch (platform) {
				case 'facebook':
					window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
					break;

				case 'facebook':
					window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank');
					break;
				case 'linkedin':
					window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}`, '_blank');
					break;
				case 'email':
					window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
					break;
			}
		// }
	};

	const handleSetRemainder = (product: string) => {
		// Format end time by adding duration hours to start time
		const endTime = new Date(dateTime);
		endTime.setHours(endTime.getHours() + event!.eventDuration);
		
		// Format description by removing line breaks and HTML
		const description = event!.description.replace(/\n/g, ' ').replace(/<[^>]*>/g, '');
		
		// Base calendar event details
		const details = {
			title: event!.name,
			description: description,
			startTime: dateTime.toISOString(),
			endTime: endTime.toISOString(),
			location: event!.type === 'online' ? 'Online Event' : "event!.location",
		};

		switch(product) {
			case "outlook": {
				const url = `https://outlook.office.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(details.title)}&body=${encodeURIComponent(details.description)}&startdt=${details.startTime}&enddt=${details.endTime}&location=${encodeURIComponent(details.location)}&path=/calendar/action/compose`;
				window.open(url, '_blank');
				break;
			}
			case "apple": {
				const url = `data:text/calendar;charset=utf8,BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
URL:${window.location.href}
DTSTART:${details.startTime.replace(/[-:]/g, '').replace(/\.\d{3}/, '')}
DTEND:${details.endTime.replace(/[-:]/g, '').replace(/\.\d{3}/, '')}
SUMMARY:${details.title}
DESCRIPTION:${details.description}
LOCATION:${details.location}
END:VEVENT
END:VCALENDAR`;
				window.open(url, '_blank');
				break;
			}
			case "google": {
				const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(details.title)}&details=${encodeURIComponent(details.description)}&dates=${details.startTime.replace(/[-:]/g, '').replace(/\.\d{3}/, '')}/${details.endTime.replace(/[-:]/g, '').replace(/\.\d{3}/, '')}&location=${encodeURIComponent(details.location)}`;
				window.open(url, '_blank');
				break;
			}
		}
	}

	if (loading || !event) {
		return <EventDetailSkeleton />
	}

	const src = `/images/event-imgs/${event.image}`
	const dateTime = getDateObj(event.eventDate)
	
	return (
		<div className="wrapper">
			<div className="breadcrumb-block">
				<div className="container">
					<div className="row">
						<div className="col-lg-12 col-md-10">
							<div className="barren-breadcrumb">
								<nav aria-label="breadcrumb">
									<ol className="breadcrumb">
										<li className="breadcrumb-item"><Link href="/">Home</Link></li>
										<li className="breadcrumb-item"><Link href="/explore">Explore Events</Link></li>
										<li className="breadcrumb-item active" aria-current="page">{event.type === 'online' ? 'Online' : 'Venue'} Event Detail View</li>
									</ol>
								</nav>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="event-dt-block p-80">
				<div className="container">
					<div className="row">
						<div className="col-xl-12 col-lg-12 col-md-12">
							<div className="event-top-dts">
								<div className="event-top-date">
									<span className="event-month">{dateTime.toLocaleString('default', { month: 'short' })}</span>
									<span className="event-date">{dateTime.getDate()}</span>
								</div>
								<div className="event-top-dt">
									<h3 className="event-main-title">{event.name}</h3>
									<div className="event-top-info-status">
										<span className="event-type-name"><i className="fa-solid fa-video"></i>{event.type === 'online' ? 'Online' : 'Venue'} Event</span>
										<span className="event-type-name details-hr">Starts on <span className="ev-event-date">{formatDateToIST(dateTime)}</span></span>
										<span className="event-type-name details-hr">{event.eventDuration}h</span>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-8 col-lg-7 col-md-12">
							<div className="main-event-dt">
								<div className="event-img">
									<Image src={src} alt={event.name} width={100} height={500} layout="responsive" />		
								</div>
								<div className="share-save-btns dropdown">
									<button className="sv-btn" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa-solid fa-share-nodes me-2"></i>Share</button>
									<ul className="dropdown-menu">
										<li><button className="dropdown-item" onClick={() => {handleShare('facebook')}}><i className="fa-brands fa-facebook me-3"></i>Facebook</button></li>
										<li><button className="dropdown-item" onClick={() => {handleShare('twitter')}}><i className="fa-brands fa-twitter me-3"></i>Twitter</button></li>
										<li><button className="dropdown-item" onClick={() => {handleShare('linkedin')}}><i className="fa-brands fa-linkedin-in me-3"></i>LinkedIn</button></li>
										<li><button className="dropdown-item" onClick={() => {handleShare('email')}}><i className="fa-regular fa-envelope me-3"></i>Email</button></li>
									</ul>
								</div>
								<div className="main-event-content">
									<h4>About This Event</h4>
									{event.description.split('\n').map((text, index) => <p key={index}>{text}</p>)}
								</div>							
							</div>
						</div>
						<div className="col-xl-4 col-lg-5 col-md-12">
							<div className="main-card event-right-dt">
								<div className="bp-title">
									<h4>Event Details</h4>
								</div>
								<div className="time-left">
									<Countdown targetDate={dateTime} />
								</div>
								<div className="event-dt-right-group mt-5">
									<div className="event-dt-right-icon">
										<i className="fa-solid fa-circle-user"></i>
									</div>
									<div className="event-dt-right-content">
										<h4>Organised by</h4>
										<h5>{event.createdByName}</h5>
										<Link href={`/user/${event.createdBy}`}>View Profile</Link>
									</div>
								</div>
								<div className="event-dt-right-group">
									<div className="event-dt-right-icon">
										<i className="fa-solid fa-calendar-day"></i>
									</div>
									<div className="event-dt-right-content">
										<h4>Date and Time</h4>
										<h5>{formatDateToIST(dateTime)}</h5>
										<div className="add-to-calendar">
											<Link href="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
												<i className="fa-regular fa-calendar-days me-3"></i>Add to Calendar
											</Link>
											<ul className="dropdown-menu">
												<li><button className="dropdown-item" onClick={() => {handleSetRemainder('outlook')}}><i className="fa-brands fa-windows me-3"></i>Outlook</button></li>
												<li><button className="dropdown-item" onClick={() => {handleSetRemainder('apple')}}><i className="fa-brands fa-apple me-3"></i>Apple</button></li>
												<li><button className="dropdown-item" onClick={() => {handleSetRemainder('google')}}><i className="fa-brands fa-google me-3"></i>Google</button></li>
											</ul>
										</div>
									</div>
								</div>
								<div className="event-dt-right-group">
									<div className="event-dt-right-icon">
										<i className="fa-solid fa-location-dot"></i>
									</div>
									<div className="event-dt-right-content">
										<h4>Location</h4>
										{event.type === 'online' ? <h5 className="mb-0">Online</h5> : (<>
											<h5 className="mb-0">{event.venue?.location}</h5>
											<a href={`https://www.google.com/maps?q=${event.venue?.latitude},${event.venue?.longitude}`} target="_blank" rel="noopener noreferrer"><i className="fa-solid fa-location-dot me-2"></i>View Map</a>
										</>)}
									</div>
								</div>
								<div className="event-dt-right-group">
									<div className="event-dt-right-icon">
										<i className="fa-solid fa-money-check-dollar"></i>
									</div>
									<div className="event-dt-right-content">
										<h4>{event.locale}</h4>
										<h5 className="mb-0">{event.price.toLocaleString('en-IN')}</h5>
									</div>
								</div>
								<div className="booking-btn">
									{(() => {
										const { status, text } = getBookingStatus(event.startDate, event.endDate, event.eventDate, event.remaining);
										
										if (status === 'active') {
											return <Link href="/checkout" className="main-btn btn-hover w-100">{text}</Link>;
										}
										
										return (
											<div className="main-btn btn-hover w-100">
												{text}
											</div>
										);
									})()}
								</div>
							</div>
						</div>
						<div className="col-xl-12 col-lg-12 col-md-12">
							<div className="more-events">
								<div className="main-title position-relative">
									<h3>More Events</h3>
									<Link href="/explore" className="view-all-link">Browse All<i className="fa-solid fa-right-long ms-2"></i></Link>
								</div>
								<div className="owl-carousel moreEvents-slider owl-theme">
									{events.map((event) => {
										const price = event.isFreeEvent ? "Free" : `${event.locale} ${event.price.toLocaleString('en-IN')}`;
										const inHour = `${Math.floor(event.eventDuration / 60)}h ${event.eventDuration % 60}m`;
										return (<div className='item' key={event.id}>
											<Card title={event.name} dateTime={getDateObj(event.eventDate)} duration={inHour} price={price} image={event.image} remaining={event.remaining} id={event.id} />
										</div>)
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
