import Image from 'next/image'
import React from 'react'

export default function AboutUs() {
	return (
		<div className="wrapper">
			<div className="hero-banner">
				<Image src={"/images/banners/purple_tinted_banner.jpg"} alt="" layout="fill" objectFit="cover" loading="eager"/>
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-xl-6 col-lg-9 col-md-10">
							<div className="hero-banner-content text-center">
								<h2 className="mb-0">Bukit - Your All-Access Pass to Events (Ever-Lasting Memories)</h2>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<div className="explore-events p-80">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="about--description">
								<h3 className="mb-4">Welcome to Bukit!</h3>
								<p>Bukit is an innovative ticketing and management platform that helps people quickly explore upcoming happenings and book tickets. Tickets for what? With Bukit, you can book tickets for upcoming events, concerts, stand-ups, prom nights, club activities, sports, movie screenings, etc. Here, we are passionate about connecting people with the experiences that ignite them, and we are dedicated to making the event journey smooth and exciting for both organizers and attendees.</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="host-engaging-event-block p-80">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="main-title mb-4">
								<h3>Our Story</h3>
								<p>Bukit was not born in a boardroom. It sparked from a simple conversation between three passionate young innovators. We observed that people crave events – concerts, club nights, festivals, and more – but the ticketing process can be frustrating.</p>
								<p>That&apos;s when the idea for Bukit struck!</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="explore-events p-80">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="main-title mb-4">
								<h3>Our Mission</h3>
								<h4>Ease Ticket Management For Organizers and Attendees</h4>
								<p>We believe events are more than just gatherings; they are opportunities to connect, create memories, and share experiences. Bukit&apos;s mission is to simplify your journey with an all-in-one platform packed with user-friendly features.</p>
								<p>We strive to bridge the gap between passionate event organizers and eager attendees.</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="host-engaging-event-block p-80">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="main-title mb-4">
								<h3>Our Vision</h3>
								<h4>The Future of Event Management</h4>
								<p>We dream of a future where event creation is smooth, ticketing is effortless, and every experience is a masterpiece. We envision Bukit becoming the leading AI-powered event ticketing and management platform worldwide and enabling event creators of all sizes to bring their visions to life.</p>
								<p>We are more than just a platform; we are a community of passionate event creators and engaged attendees. By choosing Bukit, you are not just managing an event; you are connecting with a vibrant network.</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="host-engaging-event-block p-80">
				<div className="container">
					<div className="row">
						<div className="col-lg-12 text-center">
							<h3 className="mb-4">Choose Bukit to book your tickets and be ready to create ever-lasting memories.</h3>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
