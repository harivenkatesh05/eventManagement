'use client';

import { formatDateToIST, getDateObj } from '@/util/date';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import EventDetailSkeleton from '@/components/event/skeleton';
import Countdown from '@/components/event/countdown';
import { fetchEvents, fetchVenueEvent } from '@/app/apis';
import Card from '@/components/card/card';
import { useAuthRedirect } from '@/app/ClientRouteHandler';
import { getBookingStatus, handleSetRemainder, handleShare } from '../../utility';
import VenueEventCheckout from '@/components/venueEventCheckout';

export default function EventDetail() {
	const pathname = usePathname();
	const handleAuthRequired = useAuthRedirect();

	const [venueEvent, setVenueEvent] = useState<VenueEventFullDetail | null>(null);
	const [events, setEvents] = useState<EventType[]>([]);
	const [loading, setLoading] = useState(true);
	const [count, setCount] = useState(1);
	const [checkout, setCheckout] = useState(false);
	const [selectedTicketIndex, setSelectedTicketIndex] = useState(0);

	const handleDecreaseCount = () => {
		setCount(count - 1 < 0 ? 0 : count - 1);
	};

	const handleIncreaseCount = () => {
		const remaining = venueEvent!.tickets[selectedTicketIndex].remaining!
		setCount(count + 1 > remaining ? remaining : count + 1);
	};

	useEffect(() => {
		const id = pathname.split('/')[3];

		// Add loading state and error handling
		setLoading(true);
		fetchVenueEvent(id)
			.then((event: VenueEventFullDetail) => {
				if (!event) {
					notFound(); // Redirect if event not found
					return;
				}
				setVenueEvent(event);
				// Reset selectedTicketIndex when event changes
				setSelectedTicketIndex(0);
			})
			.catch((error) => {
				console.error('Error fetching event:', error);
				notFound(); // Redirect on error
			})
			.finally(() => {
				setLoading(false);
			});

		fetchEvents().then((events: EventType[]) => {
			const remainingEvents = events.filter((event) => event.id !== id);
			setEvents(remainingEvents);
			setLoading(false);

			setTimeout(() => {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				$('.owl-carousel').owlCarousel({
					items: 3, // Number of items to display
					loop: true,
					margin: 10,
					nav: true,
					autoplay: true,
				});
			}, 200);
		});
	}, [pathname]);

	if (loading || !venueEvent) {
		return <EventDetailSkeleton />;
	}

	const src = venueEvent.image ?? '/images/event-imgs/big-1.jpg';
	const dateTime = getDateObj(venueEvent.eventDate);
	const mins = venueEvent.eventDuration % 60;
	const inHour =
		mins > 0
			? `${Math.floor(venueEvent.eventDuration / 60)}h ${mins}m`
			: `${Math.floor(venueEvent.eventDuration / 60)}h`;

	const handleBookNow = () => {
		if (!handleAuthRequired()) {
			return;
		}
		// Existing booking logic...
		setCheckout(true);
	};

	return (
		<div className='wrapper'>
			<div className='breadcrumb-block'>
				<div className='container'>
					<div className='row'>
						<div className='col-lg-12 col-md-10'>
							<div className='barren-breadcrumb'>
								<nav aria-label='breadcrumb'>
									<ol className='breadcrumb'>
										<li className='breadcrumb-item'>
											<Link href='/'>Home</Link>
										</li>
										<li className='breadcrumb-item'>
											<Link href='/explore'>Explore Events</Link>
										</li>
										<li className='breadcrumb-item active' aria-current='page'>
											Venue Event Detail View
										</li>
									</ol>
								</nav>
							</div>
						</div>
					</div>
				</div>
			</div>
			{checkout ? (
				<VenueEventCheckout event={venueEvent} ticketCount={count} selectedTicketIndex={selectedTicketIndex} />
			) : (
				<div className='event-dt-block p-80'>
					<div className='container'>
						<div className='row'>
							<div className='col-xl-12 col-lg-12 col-md-12'>
								<div className='event-top-dts'>
									<div className='event-top-date'>
										<span className='event-month'>
											{dateTime.toLocaleString('default', { month: 'short' })}
										</span>
										<span className='event-date'>{dateTime.getDate()}</span>
									</div>
									<div className='event-top-dt'>
										<h3 className='event-main-title'>{venueEvent.name}</h3>
										<div className='event-top-info-status'>
											<span className='event-type-name'>
												<i className='fa-solid fa-video'></i>
												{venueEvent.type === 'online' ? 'Online' : 'Venue'} Event
											</span>
											<span className='event-type-name details-hr'>
												Starts on{' '}
												<span className='ev-event-date'>
													{formatDateToIST(dateTime)}
												</span>
											</span>
											<span className='event-type-name details-hr'>
												{inHour}
											</span>
										</div>
									</div>
								</div>
							</div>
							<div className='col-xl-8 col-lg-7 col-md-12'>
								<div className='main-event-dt'>
									<div className='event-img'>
										<Image
											src={src}
											alt={venueEvent.name}
											width={100}
											height={500}
											layout='responsive'
										/>
									</div>
									<div className='share-save-btns dropdown'>
										<button
											className='sv-btn'
											data-bs-toggle='dropdown'
											aria-expanded='false'
										>
											<i className='fa-solid fa-share-nodes me-2'></i>Share
										</button>
										<ul className='dropdown-menu'>
											<li>
												<button
													className='dropdown-item'
													onClick={() => {
														handleShare('facebook');
													}}
												>
													<i className='fa-brands fa-facebook me-3'></i>Facebook
												</button>
											</li>
											<li>
												<button
													className='dropdown-item'
													onClick={() => {
														handleShare('twitter');
													}}
												>
													<i className='fa-brands fa-twitter me-3'></i>Twitter
												</button>
											</li>
											<li>
												<button
													className='dropdown-item'
													onClick={() => {
														handleShare('linkedin');
													}}
												>
													<i className='fa-brands fa-linkedin-in me-3'></i>
													LinkedIn
												</button>
											</li>
											<li>
												<button
													className='dropdown-item'
													onClick={() => {
														handleShare('email');
													}}
												>
													<i className='fa-regular fa-envelope me-3'></i>Email
												</button>
											</li>
										</ul>
									</div>
									<div className='main-event-content'>
										<h4>About This Event</h4>
										{venueEvent.description.split('\n').map((text, index) => (
											<p key={index}>{text}</p>
										))}
									</div>
								</div>
							</div>
							<div className='col-xl-4 col-lg-5 col-md-12'>
								<div className='main-card event-right-dt'>
									<div className='bp-title'>
										<h4>Event Details</h4>
									</div>
									<div className='time-left'>
										<Countdown targetDate={dateTime} />
									</div>
									<div className='event-dt-right-group mt-5'>
										<div className='event-dt-right-icon'>
											<i className='fa-solid fa-circle-user'></i>
										</div>
										<div className='event-dt-right-content'>
											<h4>Organised by</h4>
											<h5>{venueEvent.createdByName}</h5>
											{/* <Link href={`/user/${event.createdBy}`}>View Profile</Link> */}
										</div>
									</div>
									<div className='event-dt-right-group'>
										<div className='event-dt-right-icon'>
											<i className='fa-solid fa-calendar-day'></i>
										</div>
										<div className='event-dt-right-content'>
											<h4>Date and Time</h4>
											<h5>{formatDateToIST(dateTime)}</h5>
											<div className='add-to-calendar'>
												<Link
													href=''
													role='button'
													data-bs-toggle='dropdown'
													aria-expanded='false'
												>
													<i className='fa-regular fa-calendar-days me-3'></i>
													Add to Calendar
												</Link>
												<ul className='dropdown-menu'>
													<li>
														<button
															className='dropdown-item'
															onClick={() => {
																handleSetRemainder('outlook', venueEvent);
															}}
														>
															<i className='fa-brands fa-windows me-3'></i>
															Outlook
														</button>
													</li>
													<li>
														<button
															className='dropdown-item'
															onClick={() => {
																handleSetRemainder('apple', venueEvent);
															}}
														>
															<i className='fa-brands fa-apple me-3'></i>Apple
														</button>
													</li>
													<li>
														<button
															className='dropdown-item'
															onClick={() => {
																handleSetRemainder('google', venueEvent);
															}}
														>
															<i className='fa-brands fa-google me-3'></i>Google
														</button>
													</li>
												</ul>
											</div>
										</div>
									</div>
									<div className='event-dt-right-group'>
										<div className='event-dt-right-icon'>
											<i className='fa-solid fa-location-dot'></i>
										</div>
										<div className='event-dt-right-content'>
											<h4>Location</h4>
											<h5 className='mb-0'>{venueEvent.location}</h5>
											<a
												href={`https://www.google.com/maps?q=${venueEvent.latitude},${venueEvent.longitude}`}
												target='_blank'
												rel='noopener noreferrer'
											>
												<i className='fa-solid fa-location-dot me-2'></i>
												View Map
											</a>
										</div>
									</div>
									<div className="select-tickets-block">
										<div className='sl-flex'>
											<h6>Select Ticket Type</h6>
											<select 
												className="form-select h_50"
												onChange={(e) => {
													setSelectedTicketIndex(parseInt(e.target.value))
												}}
												value={selectedTicketIndex}
											>
												{venueEvent.tickets.map((ticket, index) => (
													<option key={ticket.ticketID} value={index}>
														{ticket.ticketName}
													</option>
												))}
											</select>
										</div>	
										<div className='select-ticket-action'>
											<div className='ticket-price'>{`INR ${venueEvent.tickets[selectedTicketIndex].price?.toLocaleString('en-IN')}`}</div>
											<div className='quantity'>
												<div className='counter'>
													<span
														className='down'
														onClick={handleDecreaseCount}
													>
														-
													</span>
													<input type='text' value={count} readOnly />
													<span
														className='up'
														onClick={handleIncreaseCount}
													>
														+
													</span>
												</div>
											</div>
										</div>
										<div className="xtotel-tickets-count">
											<div className="x-title">{count}x Ticket(s)</div>
											<h4>INR <span>{count * venueEvent.tickets[selectedTicketIndex].price}</span></h4>
										</div>
									</div>
									
									<div className='booking-btn'>
										{(() => {
											const { status, text } = getBookingStatus(
												venueEvent.startDate,
												venueEvent.endDate,
												venueEvent.eventDate,
												venueEvent.tickets[selectedTicketIndex].remaining
											);

											if (status === 'active') {
												return (
													<>
														{venueEvent.specialInstructions && (
															<p>{venueEvent.specialInstructions}</p>
														)}
														<button
															className='main-btn btn-hover w-100'
															onClick={handleBookNow}
															disabled={count === 0}
															style={{
																opacity: count === 0 ? '0.5' : '1',
																cursor: count === 0 ? 'not-allowed' : 'pointer',
																transition: 'opacity 0.3s ease',
															}}
														>
															{text}
														</button>
													</>
												);
											}

											return (
												<>
													{venueEvent.specialInstructions && (
														<p>{venueEvent.specialInstructions}</p>
													)}
													<div className='main-btn btn-hover w-100'>{text}</div>
												</>
											);
										})()}
									</div>
								</div>
							</div>
							<div className='col-xl-12 col-lg-12 col-md-12'>
								<div className='more-events'>
									<div className='main-title position-relative'>
										<h3>More Events</h3>
										<Link href='/explore' className='view-all-link'>
											Browse All<i className='fa-solid fa-right-long ms-2'></i>
										</Link>
									</div>
									<div className='owl-carousel moreEvents-slider owl-theme'>
										{events.map((event) => {
											const price = event.price > 0 ? `INR ${event.price.toLocaleString('en-IN')}` : 'Free';
											const inHour = `${Math.floor(
												event.eventDuration / 60
											)}h ${event.eventDuration % 60}m`;
											return (
												<div className='item' key={event.id}>
													<Card
														title={event.name}
														dateTime={getDateObj(event.eventDate)}
														duration={inHour}
														price={price}
														image={event.image}
														remaining={event.remaining}
														id={event.id}
														type={event.type}
													/>
												</div>
											);
										})}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
