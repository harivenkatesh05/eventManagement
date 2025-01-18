'use client'

import Card from "@/components/card/card";
import CardSkeletons from "@/components/card/skeletonCollection";
import { getDateObj } from "@/util/date";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchEvents } from "./apis";
import Image from "next/image";
import Swipper from "@/components/slider/Swiper";

export default function Home() {
	const [highlightedEvents, setHighlightedEvents] = useState([])
	const [events, setEvents] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	
	useEffect(() => {
		fetchEvents().then((events) => {
			setEvents(events)
			setHighlightedEvents(events.filter((event: EventType) => event.isHighlighted).slice(-4)) //slice last four highlighted events
			setIsLoading(false)
		})
	}, [])

	const renderContent = () => {
		try {
			if (!events.length) {
				return (
					<div className="text-center p-4">
						<h3>No events found</h3>
						<p>Check back later for upcoming events</p>
					</div>
				)
			}
	
			return events.map((event: EventType) => {
				const price = event.price > 0 ? `INR ${event.price.toLocaleString('en-IN')}` : "Free" ;
				const mins = event.eventDuration % 60;
				const inHour = mins > 0 ? `${Math.floor(event.eventDuration / 60)}h ${mins}m` : `${Math.floor(event.eventDuration / 60)}h`

				return (
					<div key={event.id} className={"col-xl-3 col-lg-4 col-md-6 col-sm-12 mix " + event.tags.join(" ")} data-ref="mixitup-target">
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
				)
			})
		} catch(error) {
			console.error(error)
			return <div className="alert alert-danger">Failed to load events</div>
		}
	}

	const highlightedEventsFC = highlightedEvents.map((event: HightLightedEventType) => {
		return (
			<Link key={event.id} href={`/event/${event.type}/${event.id}`}>
				<Image src={event.image} alt={event.name} layout="fill" objectFit="cover"></Image>
			</Link>
		)
	})

	return (
		<div className="wrapper">
			{highlightedEventsFC.length > 0 && <div className="hero-banner hero-swipper">
				{/* <Image src={"/images/banners/purple_tinted_banner.jpg"} alt="" layout="fill" objectFit="cover" loading="eager"/> */}
				{/* <div className="container">
					<div className="row justify-content-center">
						<div className="col-xl-7 col-lg-9 col-md-10">
							<div className="hero-banner-content">
								<h2>The Easiest and Most Powerful Online Event Booking and Ticketing System</h2>
								<p>Bukit is an all-in-one event ticketing platform for event organisers, promoters, and managers. Easily create, promote and manage your events of any type and size.</p>
								<Link href="/explore" className="main-btn btn-hover">Book Events<i className="fa-solid fa-arrow-right ms-3"></i></Link>
							</div>
						</div>
					</div>
				</div> */}

				<Swipper slides={highlightedEventsFC}></Swipper>
			</div> }
			<div className="explore-events p-80">
				<div className="container">
					<div className="row">
						<div className="col-xl-12 col-lg-12 col-md-12">
							<div className="main-title">
								<h3>Explore Events</h3>
							</div>
						</div>
						<div className="col-xl-12 col-lg-12 col-md-12">
							<div className="event-filter-items">
								<div className="featured-controls">
									<div className="filter-tag">
										<Link href="/explore" className="active">All</Link>
										<Link href="/explore?date=today">Today</Link>
										<Link href="/explore?date=tomorrow">Tomorrow</Link>
										<Link href="/explore?date=this-week">This Week</Link>
										<Link href="/explore?date=this-weekend">This Weekend</Link>
										<Link href="/explore?date=next-week">Next Week</Link>
										<Link href="/explore?date=next-weekend">Next Weekend</Link>
										<Link href="/explore?date=this-month">This Month</Link>
										<Link href="/explore?date=next-month">Next Month</Link>
										<Link href="/explore?date=this-year">This Year</Link>
										<Link href="/explore?date=next-year">Next Year</Link>
									</div>
									<div className="controls">
										<button type="button" className="control" data-filter="all">All</button>
										<button type="button" className="control" data-filter=".newyearparties">New year parties</button>
										<button type="button" className="control" data-filter=".music">Music</button>
										<button type="button" className="control" data-filter=".theatre ">Theatre </button>
									</div>
									<div className="row" data-ref="event-filter-content">
										{isLoading ? <CardSkeletons count={8}/> : renderContent()}
									</div>
									<div className="browse-btn">
										<Link href="/explore" className="main-btn btn-hover ">Browse All</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <div className="host-engaging-event-block p-80">
				<div className="container">
					<div className="row">
						<div className="col-lg-10">
							<div className="main-title">
								<h3>Host Engaging Online and Venue Events with Bukit</h3>
								<p>Organise venue events and host online events with unlimited possibilities using our built-in virtual event platform. Build a unique event experience for you and your attendees.</p>
							</div>
						</div>
						<div className="col-lg-12">
							<div className="engaging-block">
								<div className="owl-carousel engaging-slider owl-theme">
									<div className="item">
										<div className="main-card">
											<div className="host-item">
												<div className="host-img">
													<img src="/images/icons/venue-events.png" alt="" />
												</div>
												<h4>Venue Events</h4>
												<p>Create outstanding event page for your venue events, attract attendees and sell more tickets.</p>
											</div>
										</div>
									</div>
									<div className="item">
										<div className="main-card">
											<div className="host-item">
												<div className="host-img">
													<img src="/images/icons/webinar.png" alt="" />
												</div>
												<h4>Webinar</h4>
												<p>Webinars tend to be one-way events. Bukit helps to make them more engaging.</p>
											</div>
										</div>
									</div>
									<div className="item">
										<div className="main-card">
											<div className="host-item">
												<div className="host-img">
													<img src="/images/icons/training-workshop.png" alt="" />
												</div>
												<h4>Training & Workshop </h4>
												<p>Create and host profitable workshops and training sessions online, sell tickets and earn money.</p>
											</div>
										</div>
									</div>
									<div className="item">
										<div className="main-card">
											<div className="host-item">
												<div className="host-img">
													<img src="/images/icons/online-class.png" alt="" />
												</div>
												<h4>Online Class</h4>
												<p>Try our e-learning template to create a fantastic e-learning event page and drive engagement. </p>
											</div>
										</div>
									</div>
									<div className="item">
										<div className="main-card">
											<div className="host-item">
												<div className="host-img">
													<img src="/images/icons/talk-show.png" alt="" />
												</div>
												<h4>Talk Show</h4>
												<p>Use our intuitive built-in event template to create and host an engaging Talk Show.</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div> */}
			{/* <div className="feature-block p-80">
				<div className="container">
					<div className="row">
						<div className="col-lg-10">
							<div className="main-title">
								<h3>No Feature Overload, Get Exactly What You Need</h3>
								<p>As well as being the most affordable online-based event registration tool and one of the best online event ticketing systems in Australia, Bukit is super easy-to-use and built with a simplistic layout which is totally convenient for the organisers to operate.</p>
							</div>
						</div>
						<div className="col-lg-12">
							<div className="feature-group-list">
								<div className="row">
									<div className="col-xl-3 col-lg-4 col-md-6">
										<div className="feature-item mt-46">
											<div className="feature-icon">
												<img src="/images/icons/feature-icon-1.png" alt="" />
											</div>
											<h4>Online Events</h4>
											<p>Built-in video conferencing platform to save you time and cost.</p>
										</div>
									</div>
									<div className="col-xl-3 col-lg-4 col-md-6">
										<div className="feature-item mt-46">
											<div className="feature-icon">
												<img src="/images/icons/feature-icon-2.png" alt="" />
											</div>
											<h4>Venue Event</h4>
											<p>Easy-to-use features to create and manage your venue events.</p>
										</div>
									</div>
									<div className="col-xl-3 col-lg-4 col-md-6">
										<div className="feature-item mt-46">
											<div className="feature-icon">
												<img src="/images/icons/feature-icon-3.png" alt="" />
											</div>
											<h4>Engaging Event Page</h4>
											<p>Create engaging event pages with your logo and our hero image collage gallery.</p>
										</div>
									</div>
									<div className="col-xl-3 col-lg-4 col-md-6">
										<div className="feature-item mt-46">
											<div className="feature-icon">
												<img src="/images/icons/feature-icon-4.png" alt="" />
											</div>
											<h4>Marketing Automation</h4>
											<p>Use our marketing automation tools to promote your events on social media and email.</p>
										</div>
									</div>
									<div className="col-xl-3 col-lg-4 col-md-6">
										<div className="feature-item mt-46">
											<div className="feature-icon">
												<img src="/images/icons/feature-icon-5.png" alt="" />
											</div>
											<h4>Sell Tickets</h4>
											<p>Start monetising your online and venue events, sell unlimited* tickets.</p>
										</div>
									</div>
									<div className="col-xl-3 col-lg-4 col-md-6">
										<div className="feature-item mt-46">
											<div className="feature-icon">
												<img src="/images/icons/feature-icon-6.png" alt="" />
											</div>
											<h4>Networking</h4>
											<p>Engage your attendees with the speakers using our interactive tools and build your own network.</p>
										</div>
									</div>
									<div className="col-xl-3 col-lg-4 col-md-6">
										<div className="feature-item mt-46">
											<div className="feature-icon">
												<img src="/images/icons/feature-icon-7.png" alt="" />
											</div>
											<h4>Recording</h4>
											<p>Securely record your online events and save on the cloud of your choice*.</p>
										</div>
									</div>
									<div className="col-xl-3 col-lg-4 col-md-6">
										<div className="feature-item mt-46">
											<div className="feature-icon">
												<img src="/images/icons/feature-icon-8.png" alt="" />
											</div>
											<h4>Live Streaming</h4>
											<p>Livestream your online events on Facebook, YouTube and other social networks.</p>
										</div>
									</div>
									<div className="col-xl-3 col-lg-4 col-md-6">
										<div className="feature-item mt-46">
											<div className="feature-icon">
												<img src="/images/icons/feature-icon-9.png" alt="" />
											</div>
											<h4>Engagement Metrics</h4>
											<p>Track your event engagement metrics like visitors, ticket sales, etc. from your dashboard.</p>
										</div>
									</div>
									<div className="col-xl-3 col-lg-4 col-md-6">
										<div className="feature-item mt-46">
											<div className="feature-icon">
												<img src="/images/icons/feature-icon-10.png" alt="" />
											</div>
											<h4>Security & Support</h4>
											<p>Secure data and payment processing backed by a team eager to see you succeed.</p>
										</div>
									</div>
									<div className="col-xl-3 col-lg-4 col-md-6">
										<div className="feature-item mt-46">
											<div className="feature-icon">
												<img src="/images/icons/feature-icon-11.png" alt="" />
											</div>
											<h4>Reports & Analytics</h4>
											<p>Get useful reports and insights to boost your sales and marketing activities.</p>
										</div>
									</div>
									<div className="col-xl-3 col-lg-4 col-md-6">
										<div className="feature-item mt-46">
											<div className="feature-icon">
												<img src="/images/icons/feature-icon-12.png" alt="" />
											</div>
											<h4>Mobile & Desktop App</h4>
											<p>Stay on top of things, manage and monitor your events using the organiser app.</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="host-step-block p-80">
				<div className="container">
					<div className="row">
						<div className="col-lg-10">
							<div className="main-title">
								<h3>Be a Star Event Host in 4 Easy Steps</h3>
								<p>Use early-bird discounts, coupons and group ticketing to double your ticket sale. Get paid quickly and securely.</p>
							</div>
						</div>
						<div className="col-lg-12">
							<div className="easy-steps-tab">
								<div className="nav step-tabs" role="tablist">
									<button className="step-link active" data-bs-toggle="tab" data-bs-target="#step-01" type="button" role="tab" aria-controls="step-01" aria-selected="true">Step 01<span>Create Your Event</span></button>
									<button className="step-link" data-bs-toggle="tab" data-bs-target="#step-02" type="button" role="tab" aria-controls="step-02" aria-selected="false">Step 02<span>Sell Tickets and  Get Paid</span></button>
									<button className="step-link" data-bs-toggle="tab" data-bs-target="#step-03" type="button" role="tab" aria-controls="step-03" aria-selected="false">Step 03<span>Finally, Host Your  Event</span></button>
									<button className="step-link" data-bs-toggle="tab" data-bs-target="#step-04" type="button" role="tab" aria-controls="step-04" aria-selected="false">Step 04<span>Repeat and Grow</span></button>
								</div>
								<div className="tab-content">
									<div className="tab-pane fade show active" id="step-01" role="tabpanel">
										<div className="row">
											<div className="col-lg-12 col-md-12">
												<div className="step-text">Sign up for free and create your event easily in minutes.</div>
											</div>
											<div className="col-lg-4 col-md-6">
												<div className="step-item">
													<div className="step-icon">
														<img src="/images/icons/step-icon-1.png" alt="" />
													</div>
													<h4>Sign up for free</h4>
													<p>Sign up easily using your Google or Facebook account or email and create your events in minutes.</p>
												</div>
											</div>
											<div className="col-lg-4 col-md-6">
												<div className="step-item">
													<div className="step-icon">
														<img src="/images/icons/step-icon-2.png" alt="" />
													</div>
													<h4>Use built-in event page template</h4>
													<p>Choose from our customised page templates specially designed to attract attendees.</p>
												</div>
											</div>
											<div className="col-lg-4 col-md-6">
												<div className="step-item">
													<div className="step-icon">
														<img src="/images/icons/step-icon-3.png" alt="" />
													</div>
													<h4>Customise your event page as you like</h4>
													<p>Add logo, collage hero images, and add details to create an outstanding event page.</p>
												</div>
											</div>
										</div>
									</div>
									<div className="tab-pane fade" id="step-02" role="tabpanel">
										<div className="row">
											<div className="col-lg-12 col-md-12">
												<div className="step-text">Use our multiple ticketing features & marketing automation tools to boost ticket sales.</div>
											</div>
											<div className="col-lg-4 col-md-6">
												<div className="step-item">
													<div className="step-icon">
														<img src="/images/icons/step-icon-4.png" alt="" />
													</div>
													<h4>Promote your events on social media & email</h4>
													<p>Use our intuitive event promotion tools to reach your target audience and sell tickets.</p>
												</div>
											</div>
											<div className="col-lg-4 col-md-6">
												<div className="step-item">
													<div className="step-icon">
														<img src="/images/icons/step-icon-5.png" alt="" />
													</div>
													<h4>Use early-bird discounts, coupons & group ticketing</h4>
													<p>Double your ticket sales using our built-in discounts, coupons and group ticketing features.</p>
												</div>
											</div>
											<div className="col-lg-4 col-md-6">
												<div className="step-item">
													<div className="step-icon">
														<img src="/images/icons/step-icon-6.png" alt="" />
													</div>
													<h4>Get paid quickly & securely</h4>
													<p>Use our PCI compliant payment gateways to collect your payment securely.</p>
												</div>
											</div>
										</div>
									</div>
									<div className="tab-pane fade" id="step-03" role="tabpanel">
										<div className="row">
											<div className="col-lg-12 col-md-12">
												<div className="step-text">Use Bukit to host any types of online events for free.</div>
											</div>
											<div className="col-lg-4 col-md-6">
												<div className="step-item">
													<div className="step-icon">
														<img src="/images/icons/step-icon-7.png" alt="" />
													</div>
													<h4>Free event hosting</h4>
													<p>Use Eventbookings to host any types of online events for free.</p>
												</div>
											</div>
											<div className="col-lg-4 col-md-6">
												<div className="step-item">
													<div className="step-icon">
														<img src="/images/icons/step-icon-8.png" alt="" />
													</div>
													<h4>Built-in video conferencing platform</h4>
													<p>No need to integrate with ZOOM or other 3rd party apps, use our built-in video conferencing platform for your events.</p>
												</div>
											</div>
											<div className="col-lg-4 col-md-6">
												<div className="step-item">
													<div className="step-icon">
														<img src="/images/icons/step-icon-9.png" alt="" />
													</div>
													<h4>Connect your attendees with your event</h4>
													<p>Use our live engagement tools to connect with attendees during the event.</p>
												</div>
											</div>
										</div>
									</div>
									<div className="tab-pane fade" id="step-04" role="tabpanel">
										<div className="row">
											<div className="col-lg-12 col-md-12">
												<div className="step-text">Create more events and earn more money.</div>
											</div>
											<div className="col-lg-4 col-md-6">
												<div className="step-item">
													<div className="step-icon">
														<img src="/images/icons/step-icon-10.png" alt="" />
													</div>
													<h4>Create multiple sessions & earn more</h4>
													<p>Use our event scheduling features to create multiple sessions for your events & earn more money.</p>
												</div>
											</div>
											<div className="col-lg-4 col-md-6">
												<div className="step-item">
													<div className="step-icon">
														<img src="/images/icons/step-icon-11.png" alt="" />
													</div>
													<h4>Clone past event to create similar events</h4>
													<p>Use our event cloning feature to clone past event and create a new one easily within a few clicks.</p>
												</div>
											</div>
											<div className="col-lg-4 col-md-6">
												<div className="step-item">
													<div className="step-icon">
														<img src="/images/icons/step-icon-12.png" alt="" />
													</div>
													<h4>Get support like nowhere else</h4>
													<p>Our dedicated on-boarding coach will assist you in becoming an expert in no time.</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="testimonial-block p-80">
				<div className="container">
					<div className="row">
						<div className="col-lg-10">
							<div className="main-title">
								<h3>Transforming Thousands of Event Hosts Just Like You</h3>
								<p>Be part of a winning team. We are continuously thriving to bring the best to our customers. Be that a new product feature, help in setting up your events or even supporting your customers so that they can easily buy tickets and participate your in events. Here is what some of the clients have to say,</p>
							</div>
						</div>
						<div className="col-lg-12">
							<div className="testimonial-slider-area">
								<div className="owl-carousel testimonial-slider owl-theme">
									<div className="item">
										<div className="main-card">
											<div className="testimonial-content">
												<div className="testimonial-text">
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus maximus arcu et ligula maximus vehicula. Phasellus at luctus lacus, quis eleifend nibh. Nam vitae convallis nisi, vitae tempus risus.</p>
												</div>
												<div className="testimonial-user-dt">
													<h5>Madeline S.</h5>
													<span>Events Co-ordinator</span>
													<ul>
														<li>
															<i className="fa-solid fa-star"></i>
														</li>
														<li>
															<i className="fa-solid fa-star"></i>
														</li>
														<li>
															<i className="fa-solid fa-star"></i>
														</li>
														<li>
															<i className="fa-solid fa-star"></i>
														</li>
														<li>
															<i className="fa-solid fa-star"></i>
														</li>
													</ul>
												</div>
												<span className="quote-icon">
													<i className="fa-solid fa-quote-right"></i>
												</span>
											</div>
										</div>
									</div>
									<div className="item">
										<div className="main-card">
											<div className="testimonial-content">
												<div className="testimonial-text">
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus maximus arcu et ligula maximus vehicula. Phasellus at luctus lacus, quis eleifend nibh. Nam vitae convallis nisi, vitae tempus risus.</p>
												</div>
												<div className="testimonial-user-dt">
													<h5>Gabrielle B.</h5>
													<span>Administration</span>
													<ul>
														<li>
															<i className="fa-solid fa-star"></i>
														</li>
														<li>
															<i className="fa-solid fa-star"></i>
														</li>
														<li>
															<i className="fa-solid fa-star"></i>
														</li>
														<li>
															<i className="fa-solid fa-star"></i>
														</li>
														<li>
															<i className="fa-solid fa-star"></i>
														</li>
													</ul>
												</div>
												<span className="quote-icon">
													<i className="fa-solid fa-quote-right"></i>
												</span>
											</div>
										</div>
									</div>
									<div className="item">
										<div className="main-card">
											<div className="testimonial-content">
												<div className="testimonial-text">
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus maximus arcu et ligula maximus vehicula. Phasellus at luctus lacus, quis eleifend nibh. Nam vitae convallis nisi, vitae tempus risus.</p>
												</div>
												<div className="testimonial-user-dt">
													<h5>Piyush G.</h5>
													<span>Application Developer</span>
													<ul>
														<li>
															<i className="fa-solid fa-star"></i>
														</li>
														<li>
															<i className="fa-solid fa-star"></i>
														</li>
														<li>
															<i className="fa-solid fa-star"></i>
														</li>
														<li>
															<i className="fa-solid fa-star"></i>
														</li>
														<li>
															<i className="fa-solid fa-star"></i>
														</li>
													</ul>
												</div>
												<span className="quote-icon">
													<i className="fa-solid fa-quote-right"></i>
												</span>
											</div>
										</div>
									</div>
									<div className="item">
										<div className="main-card">
											<div className="testimonial-content">
												<div className="testimonial-text">
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus maximus arcu et ligula maximus vehicula. Phasellus at luctus lacus, quis eleifend nibh. Nam vitae convallis nisi, vitae tempus risus.</p>
												</div>
												<div className="testimonial-user-dt">
													<h5>Joanna P.</h5>
													<span>Event manager</span>
													<ul>
														<li>
															<i className="fa-solid fa-star"></i>
														</li>
														<li>
															<i className="fa-solid fa-star"></i>
														</li>
														<li>
															<i className="fa-solid fa-star"></i>
														</li>
														<li>
															<i className="fa-solid fa-star"></i>
														</li>
														<li>
															<i className="fa-solid fa-star"></i>
														</li>
													</ul>
												</div>
												<span className="quote-icon">
													<i className="fa-solid fa-quote-right"></i>
												</span>
											</div>
										</div>
									</div>
									<div className="item">
										<div className="main-card">
											<div className="testimonial-content">
												<div className="testimonial-text">
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus maximus arcu et ligula maximus vehicula. Phasellus at luctus lacus, quis eleifend nibh. Nam vitae convallis nisi, vitae tempus risus.</p>
												</div>
												<div className="testimonial-user-dt">
													<h5>Romo S.</h5>
													<span>Admin</span>
													<ul>
														<li>
															<i className="fa-solid fa-star"></i>
														</li>
														<li>
															<i className="fa-solid fa-star"></i>
														</li>
														<li>
															<i className="fa-solid fa-star"></i>
														</li>
														<li>
															<i className="fa-solid fa-star"></i>
														</li>
														<li>
															<i className="fa-solid fa-star"></i>
														</li>
													</ul>
												</div>
												<span className="quote-icon">
													<i className="fa-solid fa-quote-right"></i>
												</span>
											</div>
										</div>
									</div>
									<div className="item">
										<div className="main-card">
											<div className="testimonial-content">
												<div className="testimonial-text">
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus maximus arcu et ligula maximus vehicula. Phasellus at luctus lacus, quis eleifend nibh. Nam vitae convallis nisi, vitae tempus risus.</p>
												</div>
												<div className="testimonial-user-dt">
													<h5>Christopher F.</h5>
													<span>Online Marketing Executive</span>
													<ul>
														<li>
															<i className="fa-solid fa-star"></i>
														</li>
														<li>
															<i className="fa-solid fa-star"></i>
														</li>
														<li>
															<i className="fa-solid fa-star"></i>
														</li>
														<li>
															<i className="fa-solid fa-star"></i>
														</li>
														<li>
															<i className="fa-solid fa-star"></i>
														</li>
													</ul>
												</div>
												<span className="quote-icon">
													<i className="fa-solid fa-quote-right"></i>
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="our-organisations-block p-80">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="main-title text-center">
								<h3>321+ events created by thousands of organisations around the globe</h3>
							</div>
						</div>
						<div className="col-lg-12">
							<div className="organisations-area">
								<div className="owl-carousel organisations-slider owl-theme">
									<div className="item">
										<div className="sponsor">
											<a href="#">
												<img src="/images/icons/sponsor-1.png" alt="" />
											</a>
										</div>
									</div>
									<div className="item">
										<div className="sponsor">
											<a href="#">
												<img src="/images/icons/sponsor-2.png" alt="" />
											</a>
										</div>
									</div>
									<div className="item">
										<div className="sponsor">
											<a href="#">
												<img src="/images/icons/sponsor-3.png" alt="" />
											</a>
										</div>
									</div>
									<div className="item">
										<div className="sponsor">
											<a href="#">
												<img src="/images/icons/sponsor-4.png" alt="" />
											</a>
										</div>
									</div>
									<div className="item">
										<div className="sponsor">
											<a href="#">
												<img src="/images/icons/sponsor-5.png" alt="" />
											</a>
										</div>
									</div>
									<div className="item">
										<div className="sponsor">
											<a href="#">
												<img src="/images/icons/sponsor-6.png" alt="" />
											</a>
										</div>
									</div>
									<div className="item">
										<div className="sponsor">
											<a href="#">
												<img src="/images/icons/sponsor-7.png" alt="" />
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div> */}
		</div>
	);
}
