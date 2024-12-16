import Link from 'next/link'
import React from 'react'

export default function FAQ() {
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
										<li className="breadcrumb-item active" aria-current="page">Frequently asked questions</li>
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
						<div className="col-lg-12 col-md-12">
							<div className="main-title checkout-title text-center">
								<h3>Frequently asked questions</h3>
								<p className="mb-0">Find answers to the common questions asked about Barren.</p>
							</div>
						</div>
						<div className="col-lg-4 col-md-12">
							<div className="main-card mt-5">
								<div className="bp-title">
									<h4>Table of contents</h4>
								</div>
								<div className="bp-content faq-widget-content">
									<ul className="faq-widget-links pt_30">
										<li><a href="#FAQforOrganisers">FAQ for Organisers</a></li>
										<li><a href="#FAQforAttendees">FAQ for Attendees</a></li>
									</ul>
									{/* <div className="cant-ans-box pt_30">
										<h4><i className="fa-solid fa-circle-question me-2 fs-18"></i>Can&apos;t find an answer?</h4>
										<a href="help_center.html">Visit Help Center</a>
									</div> */}
								</div>
							</div>
						</div>
						<div className="col-lg-8 col-md-12">							
							<div className="faq-scrollspy">
								<div className="faq-accordion pt-0 p-2 mt-5" id="FAQforOrganisers">	
									<div className="faq-accordion-title">
										<h4>FAQ for Organisers</h4>
									</div>
									<div className="accordion" id="accordionFAQforOrganisers">
										<div className="accordion-item">
											<h2 className="accordion-header" id="panelsOrgnaisersOpen-heading1">
												<button className="accordion-btn pe-0 ps-0" type="button" data-bs-toggle="collapse" data-bs-target="#panelsOrgnaisersOpen-collapse1" aria-expanded="true" aria-controls="panelsOrgnaisersOpen-collapse1">
													What are the benefits of using Bukit for my event?
												</button>
											</h2>
											<div id="panelsOrgnaisersOpen-collapse1" className="accordion-collapse collapse show" aria-labelledby="panelsOrgnaisersOpen-heading1" data-bs-parent="#accordionFAQforOrganisers">
												<div className="accordion-body pt-0 pe-0 ps-0">
													<p>With Bukit, you won’t just sell tickets; you can also manage your event. It offers a complete suite of tools to simplify event management, from ticketing and promotions to data analytics and reporting. We help you sell tickets, manage attendees, and obtain valuable data to optimize your future events.</p>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header" id="panelsOrgnaisersOpen-heading2">
												<button className="accordion-btn pe-0 ps-0 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsOrgnaisersOpen-collapse2" aria-expanded="false" aria-controls="panelsOrgnaisersOpen-collapse2">
													What types of events can I host and manage on Bukit?
												</button>
											</h2>
											<div id="panelsOrgnaisersOpen-collapse2" className="accordion-collapse collapse" aria-labelledby="panelsOrgnaisersOpen-heading2" data-bs-parent="#accordionFAQforOrganisers">
												<div className="accordion-body pt-0 pe-0 ps-0">
													<p>Bukit is perfect for a wide range of events, including concerts, club nights, festivals, sporting events, conferences, workshops, stand-up comedies, and more. Whether you are hosting a large-scale event or a smaller gathering, Bukit can help you manage your ticketing and attendee information efficiently.</p>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header" id="panelsOrgnaisersOpen-heading3">
												<button className="accordion-btn pe-0 ps-0 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsOrgnaisersOpen-collapse3" aria-expanded="false" aria-controls="panelsOrgnaisersOpen-collapse3">
													Is there a fee to use Bukit?
												</button>
											</h2>
											<div id="panelsOrgnaisersOpen-collapse3" className="accordion-collapse collapse" aria-labelledby="panelsOrgnaisersOpen-heading3" data-bs-parent="#accordionFAQforOrganisers">
												<div className="accordion-body pt-0 pe-0 ps-0">
													<p>For free events, there are no charges associated with using Bukit&apos;s ticketing platform. For paid events, we offer the lowest commission rates on ticket sales. Additional service fees may apply for optional marketing tools or equipment rentals.</p>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header" id="panelsOrgnaisersOpen-heading4">
												<button className="accordion-btn pe-0 ps-0 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsOrgnaisersOpen-collapse4" aria-expanded="false" aria-controls="panelsOrgnaisersOpen-collapse4">
													How do I set up an event on Bukit?
												</button>
											</h2>
											<div id="panelsOrgnaisersOpen-collapse4" className="accordion-collapse collapse" aria-labelledby="panelsOrgnaisersOpen-heading4" data-bs-parent="#accordionFAQforOrganisers">
												<div className="accordion-body pt-0 pe-0 ps-0">
													<p>Setting up an event on Bukit is a simple process. Our user-friendly platform allows you to set up event details (date, time, location), pricing, ticket options, and manage sales through a centralized dashboard. You don’t need any technical expertise for using Bukit.</p>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header" id="panelsOrgnaisersOpen-heading5">
												<button className="accordion-btn pe-0 ps-0 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsOrgnaisersOpen-collapse5" aria-expanded="false" aria-controls="panelsOrgnaisersOpen-collapse5">
													How can I track my ticket sales on Bukit?
												</button>
											</h2>
											<div id="panelsOrgnaisersOpen-collapse5" className="accordion-collapse collapse" aria-labelledby="panelsOrgnaisersOpen-heading5" data-bs-parent="#accordionFAQforOrganisers">
												<div className="accordion-body pt-0 pe-0 ps-0">
													<p>Bukit provides live-time sales data and detailed reports. You can easily track ticket sales, inventory levels, and attendee demographics and gain valuable insights to understand your audience and optimize your future event strategy.</p>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header" id="panelsOrgnaisersOpen-heading6">
												<button className="accordion-btn pe-0 ps-0 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsOrgnaisersOpen-collapse6" aria-expanded="false" aria-controls="panelsOrgnaisersOpen-collapse6">
													How does Bukit help me promote my event?
												</button>
											</h2>
											<div id="panelsOrgnaisersOpen-collapse6" className="accordion-collapse collapse" aria-labelledby="panelsOrgnaisersOpen-heading6" data-bs-parent="#accordionFAQforOrganisers">
												<div className="accordion-body pt-0 pe-0 ps-0">
													<p>Bukit offers a variety of marketing tools to help you promote your event. It includes running targeted social media ads, creating a featured event listing, email marketing campaigns, influencer collaborations, and targeted audience reach through our extensive user base.</p>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header" id="panelsOrgnaisersOpen-heading7">
												<button className="accordion-btn pe-0 ps-0 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsOrgnaisersOpen-collapse7" aria-expanded="false" aria-controls="panelsOrgnaisersOpen-collapse7">
													Can I sell merchandise alongside my event tickets?
												</button>
											</h2>
											<div id="panelsOrgnaisersOpen-collapse7" className="accordion-collapse collapse" aria-labelledby="panelsOrgnaisersOpen-heading7" data-bs-parent="#accordionFAQforOrganisers">
												<div className="accordion-body pt-0 pe-0 ps-0">
													<p>Absolutely! You can integrate your existing e-commerce platform or utilize Bukit’s secure and scalable platform to sell event-specific merchandise alongside your tickets. This simplifies the process and potentially increases revenue.</p>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header" id="panelsOrgnaisersOpen-heading8">
												<button className="accordion-btn pe-0 ps-0 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsOrgnaisersOpen-collapse8" aria-expanded="false" aria-controls="panelsOrgnaisersOpen-collapse8">
													Does Bukit offer any additional services?
												</button>
											</h2>
											<div id="panelsOrgnaisersOpen-collapse8" className="accordion-collapse collapse" aria-labelledby="panelsOrgnaisersOpen-heading8" data-bs-parent="#accordionFAQforOrganisers">
												<div className="accordion-body pt-0 pe-0 ps-0">
													<p>Bukit offers several optional services like access control scanner rentals, event staff assistance, ticket design customization, and more. It will also provide advanced analytics dashboards for deeper insights and understanding.</p>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header" id="panelsOrgnaisersOpen-heading9">
												<button className="accordion-btn pe-0 ps-0 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsOrgnaisersOpen-collapse9" aria-expanded="false" aria-controls="panelsOrgnaisersOpen-collapse9">
													Can I customize my event page on Bukit?
												</button>
											</h2>
											<div id="panelsOrgnaisersOpen-collapse9" className="accordion-collapse collapse" aria-labelledby="panelsOrgnaisersOpen-heading9" data-bs-parent="#accordionFAQforOrganisers">
												<div className="accordion-body pt-0 pe-0 ps-0">
													<p>Absolutely! You can customize your event page with an engaging event description, artist/speaker bios, attractive visuals, and branding elements to create an appealing and informative event pages.</p>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header" id="panelsOrgnaisersOpen-heading10">
												<button className="accordion-btn pe-0 ps-0 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsOrgnaisersOpen-collapse10" aria-expanded="false" aria-controls="panelsOrgnaisersOpen-collapse10">
													Does Bukit manage access control at events?
												</button>
											</h2>
											<div id="panelsOrgnaisersOpen-collapse10" className="accordion-collapse collapse" aria-labelledby="panelsOrgnaisersOpen-heading10" data-bs-parent="#accordionFAQforOrganisers">
												<div className="accordion-body pt-0 pe-0 ps-0">
													<p>Bukit offers various access control options, including mobile ticketing with QR codes and scannable tickets. We also offer rental scanners for verification and simplified entry.</p>
												</div>
											</div>
										</div>
										{/* <div className="accordion-item">
											<h2 className="accordion-header" id="panelsOrgnaisersOpen-heading11">
												<button className="accordion-btn pe-0 ps-0 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsOrgnaisersOpen-collapse11" aria-expanded="false" aria-controls="panelsOrgnaisersOpen-collapse11">
													What is the maximum number of people that I can host?
												</button>
											</h2>
											<div id="panelsOrgnaisersOpen-collapse11" className="accordion-collapse collapse" aria-labelledby="panelsOrgnaisersOpen-heading11" data-bs-parent="#accordionFAQforOrganisers">
												<div className="accordion-body pt-0 pe-0 ps-0">
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis auctor ex. Curabitur id odio in lectus molestie porttitor ac vel turpis. Integer tincidunt non felis et tincidunt. Duis eros leo, porta a felis vitae, facilisis blandit felis. Cras auctor nisl ut sem bibendum, non auctor magna ultrices. Etiam condimentum enim eu dui pharetra, eu sagittis ante mollis. Integer porttitor ultricies bibendum. Aenean mollis odio id ultrices pharetra. Quisque vitae mi nec enim viverra pellentesque.</p>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header" id="panelsOrgnaisersOpen-heading12">
												<button className="accordion-btn pe-0 ps-0 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsOrgnaisersOpen-collapse12" aria-expanded="false" aria-controls="panelsOrgnaisersOpen-collapse12">
													Can I easily share my event&apos;s page? 
												</button>
											</h2>
											<div id="panelsOrgnaisersOpen-collapse12" className="accordion-collapse collapse" aria-labelledby="panelsOrgnaisersOpen-heading12" data-bs-parent="#accordionFAQforOrganisers">
												<div className="accordion-body pt-0 pe-0 ps-0">
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis auctor ex. Curabitur id odio in lectus molestie porttitor ac vel turpis. Integer tincidunt non felis et tincidunt. Duis eros leo, porta a felis vitae, facilisis blandit felis. Cras auctor nisl ut sem bibendum, non auctor magna ultrices. Etiam condimentum enim eu dui pharetra, eu sagittis ante mollis. Integer porttitor ultricies bibendum. Aenean mollis odio id ultrices pharetra. Quisque vitae mi nec enim viverra pellentesque.</p>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header" id="panelsOrgnaisersOpen-heading13">
												<button className="accordion-btn pe-0 ps-0 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsOrgnaisersOpen-collapse13" aria-expanded="false" aria-controls="panelsOrgnaisersOpen-collapse13">
													How do I know who has arrived at my venue event?
												</button>
											</h2>
											<div id="panelsOrgnaisersOpen-collapse13" className="accordion-collapse collapse" aria-labelledby="panelsOrgnaisersOpen-heading13" data-bs-parent="#accordionFAQforOrganisers">
												<div className="accordion-body pt-0 pe-0 ps-0">
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis auctor ex. Curabitur id odio in lectus molestie porttitor ac vel turpis. Integer tincidunt non felis et tincidunt. Duis eros leo, porta a felis vitae, facilisis blandit felis. Cras auctor nisl ut sem bibendum, non auctor magna ultrices. Etiam condimentum enim eu dui pharetra, eu sagittis ante mollis. Integer porttitor ultricies bibendum. Aenean mollis odio id ultrices pharetra. Quisque vitae mi nec enim viverra pellentesque.</p>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header" id="panelsOrgnaisersOpen-heading14">
												<button className="accordion-btn pe-0 ps-0 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsOrgnaisersOpen-collapse14" aria-expanded="false" aria-controls="panelsOrgnaisersOpen-collapse14">
													How do I edit my event after it has been published?
												</button>
											</h2>
											<div id="panelsOrgnaisersOpen-collapse14" className="accordion-collapse collapse" aria-labelledby="panelsOrgnaisersOpen-heading14" data-bs-parent="#accordionFAQforOrganisers">
												<div className="accordion-body pt-0 pe-0 ps-0">
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis auctor ex. Curabitur id odio in lectus molestie porttitor ac vel turpis. Integer tincidunt non felis et tincidunt. Duis eros leo, porta a felis vitae, facilisis blandit felis. Cras auctor nisl ut sem bibendum, non auctor magna ultrices. Etiam condimentum enim eu dui pharetra, eu sagittis ante mollis. Integer porttitor ultricies bibendum. Aenean mollis odio id ultrices pharetra. Quisque vitae mi nec enim viverra pellentesque.</p>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header" id="panelsOrgnaisersOpen-heading15">
												<button className="accordion-btn pe-0 ps-0 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsOrgnaisersOpen-collapse15" aria-expanded="false" aria-controls="panelsOrgnaisersOpen-collapse15">
													Does Barren charge for free events?
												</button>
											</h2>
											<div id="panelsOrgnaisersOpen-collapse15" className="accordion-collapse collapse" aria-labelledby="panelsOrgnaisersOpen-heading15" data-bs-parent="#accordionFAQforOrganisers">
												<div className="accordion-body pt-0 pe-0 ps-0">
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis auctor ex. Curabitur id odio in lectus molestie porttitor ac vel turpis. Integer tincidunt non felis et tincidunt. Duis eros leo, porta a felis vitae, facilisis blandit felis. Cras auctor nisl ut sem bibendum, non auctor magna ultrices. Etiam condimentum enim eu dui pharetra, eu sagittis ante mollis. Integer porttitor ultricies bibendum. Aenean mollis odio id ultrices pharetra. Quisque vitae mi nec enim viverra pellentesque.</p>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header" id="panelsOrgnaisersOpen-heading16">
												<button className="accordion-btn pe-0 ps-0 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsOrgnaisersOpen-collapse16" aria-expanded="false" aria-controls="panelsOrgnaisersOpen-collapse16">
													Can I change my subscription?
												</button>
											</h2>
											<div id="panelsOrgnaisersOpen-collapse16" className="accordion-collapse collapse" aria-labelledby="panelsOrgnaisersOpen-heading16" data-bs-parent="#accordionFAQforOrganisers">
												<div className="accordion-body pt-0 pe-0 ps-0">
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis auctor ex. Curabitur id odio in lectus molestie porttitor ac vel turpis. Integer tincidunt non felis et tincidunt. Duis eros leo, porta a felis vitae, facilisis blandit felis. Cras auctor nisl ut sem bibendum, non auctor magna ultrices. Etiam condimentum enim eu dui pharetra, eu sagittis ante mollis. Integer porttitor ultricies bibendum. Aenean mollis odio id ultrices pharetra. Quisque vitae mi nec enim viverra pellentesque.</p>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header" id="panelsOrgnaisersOpen-heading17">
												<button className="accordion-btn pe-0 ps-0 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsOrgnaisersOpen-collapse17" aria-expanded="false" aria-controls="panelsOrgnaisersOpen-collapse17">
													What payment options do you accept?
												</button>
											</h2>
											<div id="panelsOrgnaisersOpen-collapse17" className="accordion-collapse collapse" aria-labelledby="panelsOrgnaisersOpen-heading17" data-bs-parent="#accordionFAQforOrganisers">
												<div className="accordion-body pt-0 pe-0 ps-0">
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis auctor ex. Curabitur id odio in lectus molestie porttitor ac vel turpis. Integer tincidunt non felis et tincidunt. Duis eros leo, porta a felis vitae, facilisis blandit felis. Cras auctor nisl ut sem bibendum, non auctor magna ultrices. Etiam condimentum enim eu dui pharetra, eu sagittis ante mollis. Integer porttitor ultricies bibendum. Aenean mollis odio id ultrices pharetra. Quisque vitae mi nec enim viverra pellentesque.</p>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header" id="panelsOrgnaisersOpen-heading18">
												<button className="accordion-btn pe-0 ps-0 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsOrgnaisersOpen-collapse18" aria-expanded="false" aria-controls="panelsOrgnaisersOpen-collapse18">
													Where can I get a report of my event?
												</button>
											</h2>
											<div id="panelsOrgnaisersOpen-collapse18" className="accordion-collapse collapse" aria-labelledby="panelsOrgnaisersOpen-heading18" data-bs-parent="#accordionFAQforOrganisers">
												<div className="accordion-body pt-0 pe-0 ps-0">
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis auctor ex. Curabitur id odio in lectus molestie porttitor ac vel turpis. Integer tincidunt non felis et tincidunt. Duis eros leo, porta a felis vitae, facilisis blandit felis. Cras auctor nisl ut sem bibendum, non auctor magna ultrices. Etiam condimentum enim eu dui pharetra, eu sagittis ante mollis. Integer porttitor ultricies bibendum. Aenean mollis odio id ultrices pharetra. Quisque vitae mi nec enim viverra pellentesque.</p>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header" id="panelsOrgnaisersOpen-heading19">
												<button className="accordion-btn pe-0 ps-0 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsOrgnaisersOpen-collapse19" aria-expanded="false" aria-controls="panelsOrgnaisersOpen-collapse19">
													Can I arrange printed items such as tickets and programs through Barren? 
												</button>
											</h2>
											<div id="panelsOrgnaisersOpen-collapse19" className="accordion-collapse collapse" aria-labelledby="panelsOrgnaisersOpen-heading19" data-bs-parent="#accordionFAQforOrganisers">
												<div className="accordion-body pt-0 pe-0 ps-0">
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis auctor ex. Curabitur id odio in lectus molestie porttitor ac vel turpis. Integer tincidunt non felis et tincidunt. Duis eros leo, porta a felis vitae, facilisis blandit felis. Cras auctor nisl ut sem bibendum, non auctor magna ultrices. Etiam condimentum enim eu dui pharetra, eu sagittis ante mollis. Integer porttitor ultricies bibendum. Aenean mollis odio id ultrices pharetra. Quisque vitae mi nec enim viverra pellentesque.</p>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header" id="panelsOrgnaisersOpen-heading20">
												<button className="accordion-btn pe-0 ps-0 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsOrgnaisersOpen-collapse20" aria-expanded="false" aria-controls="panelsOrgnaisersOpen-collapse20">
													Do my customers need to make an account with Barren?
												</button>
											</h2>
											<div id="panelsOrgnaisersOpen-collapse20" className="accordion-collapse collapse" aria-labelledby="panelsOrgnaisersOpen-heading20" data-bs-parent="#accordionFAQforOrganisers">
												<div className="accordion-body pt-0 pe-0 ps-0">
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis auctor ex. Curabitur id odio in lectus molestie porttitor ac vel turpis. Integer tincidunt non felis et tincidunt. Duis eros leo, porta a felis vitae, facilisis blandit felis. Cras auctor nisl ut sem bibendum, non auctor magna ultrices. Etiam condimentum enim eu dui pharetra, eu sagittis ante mollis. Integer porttitor ultricies bibendum. Aenean mollis odio id ultrices pharetra. Quisque vitae mi nec enim viverra pellentesque.</p>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header" id="panelsOrgnaisersOpen-heading21">
												<button className="accordion-btn pe-0 ps-0 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsOrgnaisersOpen-collapse21" aria-expanded="false" aria-controls="panelsOrgnaisersOpen-collapse21">
													Where do I get help if I need it?
												</button>
											</h2>
											<div id="panelsOrgnaisersOpen-collapse21" className="accordion-collapse collapse" aria-labelledby="panelsOrgnaisersOpen-heading21" data-bs-parent="#accordionFAQforOrganisers">
												<div className="accordion-body pt-0 pe-0 ps-0">
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis auctor ex. Curabitur id odio in lectus molestie porttitor ac vel turpis. Integer tincidunt non felis et tincidunt. Duis eros leo, porta a felis vitae, facilisis blandit felis. Cras auctor nisl ut sem bibendum, non auctor magna ultrices. Etiam condimentum enim eu dui pharetra, eu sagittis ante mollis. Integer porttitor ultricies bibendum. Aenean mollis odio id ultrices pharetra. Quisque vitae mi nec enim viverra pellentesque.</p>
												</div>
											</div>
										</div> */}
									</div>
								</div>
								<div className="faq-accordion faq-attendees-accordion pt-0 p-2" id="FAQforAttendees">	
									<div className="faq-accordion-title">
										<h4>FAQ for Attendees</h4>
									</div>
									<div className="accordion" id="accordionFAQforAttendees">
										<div className="accordion-item">
											<h2 className="accordion-header" id="panelsAttendeesOpen-heading1">
												<button className="accordion-btn pe-0 ps-0 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsAttendeesOpen-collapse1" aria-expanded="true" aria-controls="panelsAttendeesOpen-collapse1">
													How can I find events on Bukit?
												</button>
											</h2>
											<div id="panelsAttendeesOpen-collapse1" className="accordion-collapse collapse" aria-labelledby="panelsAttendeesOpen-heading1" data-bs-parent="#accordionFAQforAttendees">
												<div className="accordion-body pt-0 pe-0 ps-0">
													<p>With Bukit, you can easily find any event. Go to our mobile app or website and browse any upcoming events by category, date, venues, event organizers, and more as per your convenience.</p>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordionpanelsAttendeesOpen-header" id="panelsAttendeesOpen-heading2">
												<button className="accordion-btn pe-0 ps-0 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsAttendeesOpen-collapse2" aria-expanded="false" aria-controls="panelsAttendeesOpen-collapse2">
													How can I purchase tickets on Bukit?
												</button>
											</h2>
											<div id="panelsAttendeesOpen-collapse2" className="accordion-collapse collapse" aria-labelledby="panelsAttendeesOpen-heading2" data-bs-parent="#accordionFAQforAttendees">
												<div className="accordion-body pt-0 pe-0 ps-0">
													<p>We created Bukit by keeping you in mind. So, purchasing tickets for any event through our secure online platform is easy and quick. Find the event you want to attend, choose your ticket options, and complete the checkout process. We accept a variety of payment methods for your convenience, use them, and receive your digital tickets via email or mobile app.</p>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header" id="panelsAttendeesOpen-heading3">
												<button className="accordion-btn pe-0 ps-0 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsAttendeesOpen-collapse3" aria-expanded="false" aria-controls="panelsAttendeesOpen-collapse3">
													Does Bukit offer mobile ticketing?
												</button>
											</h2>
											<div id="panelsAttendeesOpen-collapse3" className="accordion-collapse collapse" aria-labelledby="panelsAttendeesOpen-heading3" data-bs-parent="#accordionFAQforAttendees">
												<div className="accordion-body pt-0 pe-0 ps-0">
													<p>Yes, Bukit offers convenient mobile ticketing for attendees. You can access your tickets directly from your Bukit mobile app. You can display them on your phone at the event entrance and eliminate the need for physical tickets.</p>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header" id="panelsAttendeesOpen-heading4">
												<button className="accordion-btn pe-0 ps-0 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsAttendeesOpen-collapse4" aria-expanded="false" aria-controls="panelsAttendeesOpen-collapse4">
													Can I transfer or resell my tickets?
												</button>
											</h2>
											<div id="panelsAttendeesOpen-collapse4" className="accordion-collapse collapse" aria-labelledby="panelsAttendeesOpen-heading4" data-bs-parent="#accordionFAQforAttendees">
												<div className="accordion-body pt-0 pe-0 ps-0">
													<p>Some events allow ticket transfers or reselling within the platform. Check the specific event details or contact the organizer directly for information on transfer policies.</p>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header" id="panelsAttendeesOpen-heading5">
												<button className="accordion-btn pe-0 ps-0 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsAttendeesOpen-collapse5" aria-expanded="false" aria-controls="panelsAttendeesOpen-collapse5">
													When will I receive my tickets?
												</button>
											</h2>
											<div id="panelsAttendeesOpen-collapse5" className="accordion-collapse collapse" aria-labelledby="panelsAttendeesOpen-heading5" data-bs-parent="#accordionFAQforAttendees">
												<div className="accordion-body pt-0 pe-0 ps-0">
													<p>Your digital tickets are typically sent via email or accessible within the Bukit mobile app under “My Tickets.” You can download or store your tickets for easy entry at the event.</p>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header" id="panelsAttendeesOpen-heading6">
												<button className="accordion-btn pe-0 ps-0 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsAttendeesOpen-collapse6" aria-expanded="false" aria-controls="panelsAttendeesOpen-collapse6">
													What if I lose my ticket or can&apos;t access it digitally?
												</button>
											</h2>
											<div id="panelsAttendeesOpen-collapse6" className="accordion-collapse collapse" aria-labelledby="panelsAttendeesOpen-heading6" data-bs-parent="#accordionFAQforAttendees">
												<div className="accordion-body pt-0 pe-0 ps-0">
													<p>If you lost or couldn&apos;t access your ticket, please contact the event organizer through Bukit. They will assist you in accessing your ticket details, or they may be resend your e-ticket.</p>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header" id="panelsAttendeesOpen-heading7">
												<button className="accordion-btn pe-0 ps-0 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsAttendeesOpen-collapse7" aria-expanded="false" aria-controls="panelsAttendeesOpen-collapse7">
													What payment methods are accepted on Bukit?
												</button>
											</h2>
											<div id="panelsAttendeesOpen-collapse7" className="accordion-collapse collapse" aria-labelledby="panelsAttendeesOpen-heading7" data-bs-parent="#accordionFAQforAttendees">
												<div className="accordion-body pt-0 pe-0 ps-0">
													<p>Bukit accepts a variety of secure payment methods depending on the event organizer&apos;s preference. This basically includes credit cards, debit cards, e-wallet payments and online payment platforms.</p>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header" id="panelsAttendeesOpen-heading8">
												<button className="accordion-btn pe-0 ps-0 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsAttendeesOpen-collapse8" aria-expanded="false" aria-controls="panelsAttendeesOpen-collapse8">
													Are there any fees associated with purchasing tickets?
												</button>
											</h2>
											<div id="panelsAttendeesOpen-collapse8" className="accordion-collapse collapse" aria-labelledby="panelsAttendeesOpen-heading8" data-bs-parent="#accordionFAQforAttendees">
												<div className="accordion-body pt-0 pe-0 ps-0">
													<p>For most events, there is just a booking fee added at checkout. Some events may have additional fees, which will be clearly displayed before purchase (only if applicable).</p>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header" id="panelsAttendeesOpen-heading9">
												<button className="accordion-btn pe-0 ps-0 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsAttendeesOpen-collapse9" aria-expanded="false" aria-controls="panelsAttendeesOpen-collapse9">
													Can I cancel or change my booking?
												</button>
											</h2>
											<div id="panelsAttendeesOpen-collapse9" className="accordion-collapse collapse" aria-labelledby="panelsAttendeesOpen-heading9" data-bs-parent="#accordionFAQforAttendees">
												<div className="accordion-body pt-0 pe-0 ps-0">
													<p>Ticket change or cancellation options depend on the organizer&apos;s policy. Please check the event details or contact the event organizer directly for specific information.</p>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header" id="panelsAttendeesOpen-heading10">
												<button className="accordion-btn pe-0 ps-0 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsAttendeesOpen-collapse10" aria-expanded="false" aria-controls="panelsAttendeesOpen-collapse10">
													How do I contact Bukit for support?
												</button>
											</h2>
											<div id="panelsAttendeesOpen-collapse10" className="accordion-collapse collapse" aria-labelledby="panelsAttendeesOpen-heading10" data-bs-parent="#accordionFAQforAttendees">
												<div className="accordion-body pt-0 pe-0 ps-0">
													<p>If you encounter any issues, you can contact Bukit&apos;s customer support team through the website or mobile app. We are dedicated to providing quick and helpful assistance for a smooth event experience.</p>
												</div>
											</div>
										</div>
										{/* <div className="accordion-item">
											<h2 className="accordion-header" id="panelsAttendeesOpen-heading11">
												<button className="accordion-btn pe-0 ps-0 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsAttendeesOpen-collapse11" aria-expanded="false" aria-controls="panelsAttendeesOpen-collapse11">
													I have lost my tickets, can you resend them?
												</button>
											</h2>
											<div id="panelsAttendeesOpen-collapse11" className="accordion-collapse collapse" aria-labelledby="panelsAttendeesOpen-heading11" data-bs-parent="#accordionFAQforAttendees">
												<div className="accordion-body pt-0 pe-0 ps-0">
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis auctor ex. Curabitur id odio in lectus molestie porttitor ac vel turpis. Integer tincidunt non felis et tincidunt. Duis eros leo, porta a felis vitae, facilisis blandit felis. Cras auctor nisl ut sem bibendum, non auctor magna ultrices. Etiam condimentum enim eu dui pharetra, eu sagittis ante mollis. Integer porttitor ultricies bibendum. Aenean mollis odio id ultrices pharetra. Quisque vitae mi nec enim viverra pellentesque.</p>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header" id="panelsAttendeesOpen-heading12">
												<button className="accordion-btn pe-0 ps-0 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsAttendeesOpen-collapse12" aria-expanded="false" aria-controls="panelsAttendeesOpen-collapse12">
													Where can I go to get some help? 
												</button>
											</h2>
											<div id="panelsAttendeesOpen-collapse12" className="accordion-collapse collapse" aria-labelledby="panelsAttendeesOpen-heading12" data-bs-parent="#accordionFAQforAttendees">
												<div className="accordion-body pt-0 pe-0 ps-0">
													<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis auctor ex. Curabitur id odio in lectus molestie porttitor ac vel turpis. Integer tincidunt non felis et tincidunt. Duis eros leo, porta a felis vitae, facilisis blandit felis. Cras auctor nisl ut sem bibendum, non auctor magna ultrices. Etiam condimentum enim eu dui pharetra, eu sagittis ante mollis. Integer porttitor ultricies bibendum. Aenean mollis odio id ultrices pharetra. Quisque vitae mi nec enim viverra pellentesque.</p>
												</div>
											</div>
										</div>								 */}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
