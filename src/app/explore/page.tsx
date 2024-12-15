"use client"

import Card from '@/components/card/card'
import CardSkeletons from '@/components/card/skeletonCollection'
import { getDateObj, isDateSatisfies } from '@/util/date'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { fetchEvents } from '../apis'
import EventSkeleton from '@/components/skeleton/EventSkeleton'


export default function Explore() {
	return (
		<Suspense fallback={<EventSkeleton />}>
			<ExploreComponent />
		</Suspense>
	)
}

function ExploreComponent() {

	const searchParams = useSearchParams()
		
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [filteredEvents, setFilteredEvents] = useState<EventType[]>([])
	const [events, setEvents] = useState<EventType[]>([])
	const [eventType, setEventType] = useState('browse_all')
	const [eventTag, setEventTag] = useState('all')
	const [isLoading, setIsLoading] = useState(true)
	const dateType = searchParams.get('date') || 'all';
		
	const filter = useCallback((events: EventType[]) => {
		return events.filter((event) => {
			return (eventTag === 'all' || event.tags.includes(eventTag)) && 
				   (eventType === 'browse_all' || event.type === eventType) && 
				   (dateType === 'all' || isDateSatisfies(event.eventDate, dateType))
		})
	}, [eventTag, eventType, dateType])

	useEffect(() => {
		setTimeout(() => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			$('.selectpicker').selectpicker();
		}, 20)

		fetchEvents().then((events: EventType[]) => {
			setEvents(events)
			setFilteredEvents(filter(events))
			setIsLoading(false)
		});
	}, [filter]);

	const eventCards = filteredEvents.map((event) => {
		const price = event.isFreeEvent ? "Free" : `${event.locale} ${event.price.toLocaleString('en-IN')}`;
		const mins = event.eventDuration % 60;
		const inHour = mins > 0 ? `${Math.floor(event.eventDuration / 60)}h ${mins}m` : `${Math.floor(event.eventDuration / 60)}h`
		return (
			<div key={event.id} className={"col-xl-3 col-lg-4 col-md-6 col-sm-12 mix " + event.tags.join(" ")} data-ref="mixitup-target">
				<Card title={event.name} dateTime={getDateObj(event.eventDate)} duration={inHour} price={price} image={event.image} remaining={event.remaining} id={event.id} />
			</div>
		)
	})

	const handleFindEventClick = () => {
		setFilteredEvents(filter(events))
	}

	const handleFilterEventTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setEventType(e.target.value)
	}

	const handleFilterEventTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setEventTag(e.target.value)
	}

	return (
		<div className="wrapper">
			<div className="hero-banner">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-xl-8 col-lg-8 col-md-10">
							<div className="hero-banner-content">
								<h2>Discover Events For All The Things You Love</h2>
								<div className="search-form main-form">
									<div className="row g-3">
										<div className="col-lg-5 col-md-12">
											<div className="form-group search-category">
												<select className="selectpicker" data-width="100%" data-size="5" defaultValue={eventType} onChange={handleFilterEventTypeChange}>
													<option value="browse_all" data-icon="fa-solid fa-tower-broadcast">Browse All</option>
													<option value="online" data-icon="fa-solid fa-video">Online Events</option>
													<option value="offline" data-icon="fa-solid fa-location-dot">Venue Events</option>
												</select>
											</div>
										</div>
										<div className="col-lg-5 col-md-12">
											<div className="form-group">
												<select className="selectpicker" data-width="100%" data-size="5" data-live-search="true" defaultValue={eventTag} onChange={handleFilterEventTagChange}>
													<option value="all">All</option>
													<option value="arts">Arts</option>
													<option value="concert">Concert</option>
													<option value="business">Business</option>
													<option value="workshops">Workshops</option>
													<option value="sports">Sports and Fitness</option>
													<option value="volunteer">Volunteer</option>
													<option value="coaching_consulting">Coaching and Consulting</option>
													<option value="community_culture">Community and Culture</option>
													<option value="education_training">Education and Training</option>
													<option value="family_friends">Family and Friends</option>
													<option value="fashion_beauty">Fashion and Beauty</option>
													<option value="film_entertainment">Film and Entertainment</option>
													<option value="food_drink">Food and Drink</option>
													<option value="free">Free</option>
													<option value="health_wellness">Health and Wellbeing</option>
													<option value="hobbies_interest">Hobbies and Interest</option>
													<option value="music_theater">Music and Theater</option>
													<option value="religion_spirituality">Religion and Spirituality</option>
													<option value="science_technology">Science and Technology</option>
													<option value="travel">Travel and Outdoor</option>
													<option value="visual_arts">Visual Arts</option>
												</select>
											</div>
										</div>
										<div className="col-lg-2 col-md-12">
											<button className="main-btn btn-hover w-100" onClick={handleFindEventClick}>Find</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="explore-events p-80">
				<div className="container">
					<div className="row">
						<div className="col-xl-12 col-lg-12 col-md-12">
							<div className="event-filter-items">
								<div className="featured-controls">
									<div className="filter-tag">
										<Link href="/explore" className={dateType === 'all' ? 'active' : ''}>All</Link>
										<Link href="/explore?date=today" className={dateType === 'today' ? 'active' : ''}>Today</Link>
										<Link href="/explore?date=tomorrow" className={dateType === 'tomorrow' ? 'active' : ''}>Tomorrow</Link>
										<Link href="/explore?date=this_week" className={dateType === 'this_week' ? 'active' : ''}>This Week</Link>
										<Link href="/explore?date=this_weekend" className={dateType === 'this_weekend' ? 'active' : ''}>This Weekend</Link>
										<Link href="/explore?date=next_week" className={dateType === 'next_week' ? 'active' : ''}>Next Week</Link>
										<Link href="/explore?date=next_weekend" className={dateType === 'next_weekend' ? 'active' : ''}>Next Weekend</Link>
										<Link href="/explore?date=this_month" className={dateType === 'this_month' ? 'active' : ''}>This Month</Link>
										<Link href="/explore?date=next_month" className={dateType === 'next_month' ? 'active' : ''}>Next Month</Link>
										<Link href="/explore?date=this_year" className={dateType === 'this_year' ? 'active' : ''}>This Year</Link>
										<Link href="/explore?date=next_year" className={dateType === 'next_year' ? 'active' : ''}>Next Year</Link>
									</div>
									{/* <div className="controls">
										<button type="button" className="control" data-filter="all">All</button>
										<button type="button" className="control" data-filter=".arts">Arts</button>
										<button type="button" className="control" data-filter=".business">Business</button>
										<button type="button" className="control" data-filter=".concert">Concert</button>
										<button type="button" className="control" data-filter=".workshops">Workshops</button>
										<button type="button" className="control" data-filter=".coaching_consulting">Coaching and Consulting</button>
										<button type="button" className="control" data-filter=".health_Wellness">Health and Wellbeing</button>									
										<button type="button" className="control" data-filter=".volunteer">Volunteer</button>
										<button type="button" className="control" data-filter=".sports">Sports</button>
										<button type="button" className="control" data-filter=".free">Free</button>	
									</div> */}
									<div className="row" data-ref="event-filter-content">
										{isLoading ? (<>
											<CardSkeletons count={3} />
										</>) : eventCards.length > 0 ? eventCards : <p>No events found</p> }
									</div>
									
									{/* <div className="browse-btn">
										<a href="#" className="main-btn btn-hover ">See More</a>
									</div> */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}