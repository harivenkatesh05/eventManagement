'use client'
import React, { useEffect, useState, useRef } from 'react'

import "../../../../public/css/datepicker.min.css"
import "../../../../public/css/jquery-steps.css"
import "../../../../public/css/night-mode.css"
import "../../../../public/vendor/ckeditor5/sample/css/sample.css"
import { TAG_CONSTANTS } from '@/dataset/constants'
import DateTimePickerWithDuration from '@/components/form/DateTimePickerWithDuration'
import DateTimePicker from '@/components/form/DateTimePicker'
import Ticket from '@/components/ticket/ticket'
import GroupTicket from '@/components/ticket/groupTicket'
import type { TicketForm, Ticket as TicketType } from '@/type'

export default function VenueEvent() {
	const [tickets, setTickets] = useState<TicketType[]>([])
	const [ticket, setTicket] = useState<null | TicketType>(null)
	const modalRef = useRef<HTMLDivElement>(null)
	
	const handleSaveTicket = (ticket: TicketForm) => {
		if(!ticket.id) {
			const newTicket: TicketType = {
				...ticket,
				id: crypto.randomUUID(),
				isTicketEnabled: true
			}
			setTickets([...tickets, newTicket])
		} else {
			setTickets(tickets.map(t => 
				t.id === ticket.id 
				  ? { ...t, ...ticket }
				  : t
			))
		}
		setTicket(null)
	}

	const handleCancelTicket = () => {
		setTicket(null)
	}

	const handleDeleteTicket = (ticketId: string) => {
		setTickets(tickets.filter((ticket) => ticket.id !== ticketId))
	}

	const handleEditTicket = (ticket: TicketType) => {
		setTicket(ticket)
		
		const addTicketButton = document.querySelector("#addTicket") as HTMLElement
		addTicketButton.click()

		// const modal = new (globalThis as any).bootstrap.Modal(modalRef.current)
		// modal.show()
	}

	useEffect(() => {
		setTimeout(() => {
			(globalThis as any).ClassicEditor
				.create( document.querySelector( '#pd_editor' ), {
				// toolbar: [ 'heading', '|', 'bold', 'italic', 'link' ]
				} )
				.then((editor: any) => {
					(globalThis as any).editor = editor;
				})
				.catch((err: any) => {
					console.error( err.stack );
				});

			// Initialize jQuery Steps
			(globalThis as any).$('#add-event-tab').steps({
				headerTag: "ul",
				bodyTag: "div.step-content",
				transitionEffect: "slideLeft",
				autoFocus: true,
				labels: {
					finish: "Create",
					next: "Next",
					previous: "Previous"
				},
				onStepChanging: function() {
					return true; // Allow step changing
				},
				onFinishing: function() {
					return true; // Allow finishing
				},
				onFinished: function() {
					// Handle form submission
					console.log('Form submitted');
				}
			});

			// Initialize other plugins
			(globalThis as any).$('.selectpicker').selectpicker();
		}, 10)
	}, [])
	
	return (
		<>
			<GroupTicket ticket={ticket ?? {} as TicketType} onSave={handleSaveTicket} onCancel={handleCancelTicket} />
			<div className="wrapper">
				<div className="breadcrumb-block">
					<div className="container">
						<div className="row">
							<div className="col-lg-12 col-md-10">
								<div className="barren-breadcrumb">
									<nav aria-label="breadcrumb">
										<ol className="breadcrumb">
											<li className="breadcrumb-item"><a href="index.html">Home</a></li>
											<li className="breadcrumb-item"><a href="create.html">Create</a></li>
											<li className="breadcrumb-item active" aria-current="page">Create Venue Event</li>
										</ol>
									</nav>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="event-dt-block p-80">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-lg-12 col-md-12">
								<div className="main-title text-center">
									<h3>Create Venue Event</h3>
								</div>
							</div>
							<div className="col-xl-8 col-lg-9 col-md-12">
								<div className="wizard-steps-block">
									<div id="add-event-tab" className="step-app">
										<ul className="step-steps">
											<li className="active">
												<a href="#tab_step1">
													<span className="number"></span>
													<span className="step-name">Details</span>
												</a>
											</li>
											<li>
												<a href="#tab_step2">
													<span className="number"></span>
													<span className="step-name">Tickets</span>
												</a>
											</li>
											<li>
												<a href="#tab_step3">
													<span className="number"></span>
													<span className="step-name">Setting</span>
												</a>
											</li>
										</ul>
										<div className="step-content">
											<div className="step-tab-panel step-tab-info active" id="tab_step1"> 
												<div className="tab-from-content">
													<div className="main-card">
														<div className="bp-title">
															<h4><i className="fa-solid fa-circle-info step_icon me-3"></i>Details</h4>
														</div>
														<div className="p-4 bp-form main-form">
															<div className="row">
																<div className="col-lg-12 col-md-12">
																	<div className="form-group border_bottom pb_30">
																		<label className="form-label fs-16">Give your event a name.*</label>
																		<p className="mt-2 d-block fs-14 mb-3">See how your name appears on the event page and a list of all places where your event name will be used.</p>
																		<input className="form-control h_50" type="text" placeholder="Enter event name here" value="" onChange={(e) => {}}></input>
																	</div>
																	<div className="form-group border_bottom pt_30 pb_30">
																		<label className="form-label fs-16">Choose a category for your event.*</label>
																		<p className="mt-2 d-block fs-14 mb-3">Choosing relevant categories helps to improve the discoverability of your event.</p>
																		<select className="selectpicker" multiple={true} data-selected-text-format="count > 4" data-size="5" title="Select category" data-live-search="true" onChange={(e) => {}}>
																			{Object.keys(TAG_CONSTANTS).map((tag: string) => {
																				return <option value={tag} key={tag}> {TAG_CONSTANTS[tag as keyof typeof TAG_CONSTANTS]}</option>
																			})}
																		</select>
																	</div>
																	<div className="form-group border_bottom pt_30 pb_30">
																		<label className="form-label fs-16">When is your event?*</label>
																		<p className="mt-2 fs-14 d-block mb-3">Tell your attendees when your event starts so they can get ready to attend.</p>
																		<DateTimePickerWithDuration />
																	</div>
																	<div className="form-group pt_30 pb_30">
																		<label className="form-label fs-16">Add a few images to your event banner.</label>
																		<p className="mt-2 fs-14 d-block mb-3 pe_right">Upload colorful and vibrant images as the banner for your event! See how beautiful images help your event details page.</p>
																		<div className="content-holder mt-4">
																			<div className="default-event-thumb">   
																				<div className="default-event-thumb-btn">
																					<div className="thumb-change-btn">
																						<input type="file" id="thumb-img" onChange={(e) => {}}></input>
																						<label htmlFor="thumb-img">Change Image</label>
																					</div>
																				</div>
																				<img src="/images/banners/custom-img.jpg" alt=""></img>
																			</div>
																		</div>
																	</div>
																	<div className="form-group border_bottom pb_30">
																		<label className="form-label fs-16">Please describe your event.</label>
																		<p className="mt-2 fs-14 d-block mb-3">Write a few words below to describe your event and provide any extra information such as schedules, itinerary or any special instructions required to attend your event.</p>
																		<div className="text-editor mt-4">
																			<div id="pd_editor"></div>
																		</div>
																	</div>
																	<div className="form-group pt_30 pb-2">
																		<label className="form-label fs-16">Where is your event taking place? *</label>
																		<p className="mt-2 fs-14 d-block mb-3">Add a venue to your event to tell your attendees where to join the event.</p>
																		<div className="stepper-data-set">
																			<div className="content-holder template-selector">
																				<div className="row g-4">
																					<div className="col-md-12">
																						<div className="venue-event">
																							<div className="map">
																								<iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d27382.59422947023!2d75.84077125074462!3d30.919535510612153!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1534312417365" style={{border:0}} allowFullScreen></iframe>	
																							</div>
																						</div>
																					</div>
																					<div className="col-md-12">
																						<div className="form-group mt-1">
																							<label className="form-label fs-6">Venue*</label>
																							<input className="form-control h_50" type="text" placeholder="" value="" onChange={(e) => {}}></input>
																						</div>
																					</div>
																					<div className="col-md-6">
																						<div className="form-group mt-1">
																							<label className="form-label fs-6">Address line 1*</label>
																							<input className="form-control h_50" type="text" placeholder="" value="" onChange={(e) => {}}></input>
																						</div>
																					</div>
																					<div className="col-md-6">
																						<div className="form-group mt-1">
																							<label className="form-label fs-6">Address line 2*</label>
																							<input className="form-control h_50" type="text" placeholder="" value="" onChange={(e) => {}}></input>
																						</div>
																					</div>
																					<div className="col-md-6">
																						<div className="form-group main-form mt-1">
																							<label className="form-label">Country*</label>
																							<select className="selectpicker" data-size="5" title="Nothing selected" data-live-search="true" onChange={(e) => {}}>
																								<option value="Algeria">Algeria</option>
																								<option value="Argentina">Argentina</option>
																								<option value="Australia">Australia</option>
																								<option value="Austria">Austria (Österreich)</option>
																								<option value="Belgium">Belgium (België)</option>
																								<option value="Bolivia">Bolivia</option>
																								<option value="Brazil">Brazil</option>
																								<option value="Canada">Canada</option>
																								<option value="Chile">Chile</option>
																								<option value="Colombia">Colombia</option>
																								<option value="Costa Rica">Costa Rica</option>
																								<option value="Cyprus">Cyprus</option>
																								<option value="Czech Republic">Czech Republic</option>
																								<option value="Denmark">Denmark</option>
																								<option value="Dominican Republic">Dominican Republic</option>
																								<option value="Estonia">Estonia</option>
																								<option value="Finland">Finland</option>
																								<option value="France">France</option>
																								<option value="Germany">Germany</option>
																								<option value="Greece">Greece</option>
																								<option value="Hong Kong">Hong Kong</option>
																								<option value="Iceland">Iceland</option>
																								<option value="India">India</option>
																								<option value="Indonesia">Indonesia</option>
																								<option value="Ireland">Ireland</option>
																								<option value="Israel">Israel</option>
																								<option value="Italy">Italy</option>
																								<option value="Japan">Japan</option>
																								<option value="Latvia">Latvia</option>
																								<option value="Lithuania">Lithuania</option>
																								<option value="Luxembourg">Luxembourg</option>
																								<option value="Malaysia">Malaysia</option>
																								<option value="Mexico">Mexico</option>
																								<option value="Nepal">Nepal</option>
																								<option value="Netherlands">Netherlands</option>
																								<option value="New Zealand">New Zealand</option>
																								<option value="Norway">Norway</option>
																								<option value="Paraguay">Paraguay</option>
																								<option value="Peru">Peru</option>
																								<option value="Philippines">Philippines</option>
																								<option value="Poland">Poland</option>
																								<option value="Portugal">Portugal</option>
																								<option value="Singapore">Singapore</option>
																								<option value="Slovakia">Slovakia</option>
																								<option value="Slovenia">Slovenia</option>
																								<option value="South Africa">South Africa</option>
																								<option value="South Korea">South Korea</option>
																								<option value="Spain">Spain</option>
																								<option value="Sweden">Sweden</option>
																								<option value="Switzerland">Switzerland</option>
																								<option value="Tanzania">Tanzania</option>
																								<option value="Thailand">Thailand</option>
																								<option value="Turkey">Turkey</option>
																								<option value="United Kingdom">United Kingdom</option>
																								<option value="United States">United States</option>
																								<option value="Vietnam">Vietnam</option>																					
																							</select>
																						</div>
																					</div>
																					<div className="col-md-6">
																						<div className="form-group mt-1">
																							<label className="form-label">State*</label>
																							<input className="form-control h_50" type="text" placeholder="" value="Victoria" onChange={(e) => {}}></input>																								
																						</div>
																					</div>
																					<div className="col-lg-6 col-md-12">
																						<div className="form-group mt-1">
																							<label className="form-label">City/Suburb*</label>
																							<input className="form-control h_50" type="text" placeholder="" value="Melbourne" onChange={(e) => {}}></input>																								
																						</div>
																					</div>
																					<div className="col-lg-6 col-md-12">
																						<div className="form-group mt-1">
																							<label className="form-label">Zip/Post Code*</label>
																							<input className="form-control h_50" type="text" placeholder="" value="3000" onChange={(e) => {}}></input>																								
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
												</div>
											</div>
											
											<div className="step-tab-panel step-tab-gallery" id="tab_step2">
												<div className="tab-from-content">
													<div className="main-card">
														<div className="bp-title">
															<h4><i className="fa-solid fa-ticket step_icon me-3"></i>Tickets</h4>
														</div>
														<div className="bp-form main-form">
															<div className="p-4 form-group border_bottom pb_30">
																<div className="">
																	<div className="ticket-section">
																		<label className="form-label fs-16">Let's create tickets!</label>
																		<p className="mt-2 fs-14 d-block mb-3 pe_right">Create tickets for your event by clicking on the 'Add Tickets' button below.</p>
																	</div>
																	<div className="d-flex align-items-center justify-content-between pt-4 pb-3 full-width">
																		<h3 className="fs-18 mb-0">Tickets (<span className="venue-event-ticket-counter">{tickets.length}</span>)</h3>
																		<div className="btn-ticket-type-top">
																			<button 
																				className="main-btn btn-hover h_40 pe-4 ps-4" 
																				type="button" 
																				data-bs-toggle="modal" data-bs-target="#groupTicketModal"
																				id="addTicket"
																			>
																				<span>Add Tickets</span>
																			</button>
																		</div>
																	</div>
																	{tickets.length === 0 ? (
																		<div className="ticket-type-item-empty text-center p_30">
																			<div className="ticket-list-icon d-inline-block">
																				<img src="/images/ticket.png" alt=""></img>
																			</div>
																			<h4 className="color-black mt-4 mb-3 fs-18">You have no tickets yet.</h4>
																			<p className="mb-0">You have not created a ticket yet. Please click the button above to create your event ticket.</p>
																		</div>) : 
																		<div className="ticket-type-item-list mt-4">
																			{tickets.map((ticket) => {
																				return (
																					<Ticket key={ticket.id} ticket={ticket} onEdit={() => handleEditTicket(ticket)} onDelete={() => handleDeleteTicket(ticket.id)} />
																				)
																			})}														
																		</div>
																	}
																</div>
															</div>
															
														</div>
													</div>
												</div>
											</div>

											<div className="step-tab-panel step-tab-location" id="tab_step3">
												<div className="tab-from-content">											
													<div className="main-card">
														<div className="bp-title">
															<h4><i className="fa-solid fa-gear step_icon me-3"></i>Setting</h4>
														</div>
														<div className="p_30 bp-form main-form">
															<div className="form-group">
																<div className="ticket-section">
																	<label className="form-label fs-16">Let's configure a few additional options for your event!</label>
																	<p className="mt-2 fs-14 d-block mb-3 pe_right">Change the following settings based on your preferences to customise your event accordingly.</p>
																	<div className="content-holder">
																		<div className="setting-item border_bottom pb_30 pt-4">
																			<div className="d-flex align-items-start">
																				<label className="btn-switch m-0 me-3">
																					<input type="checkbox" className="" id="booking-start-time-btn" value="" defaultChecked={true} onChange={(e) => {}}></input>
																					<span className="checkbox-slider"></span>
																				</label>
																				<div className="d-flex flex-column">
																					<label className="color-black fw-bold mb-1">I want the bookings to start immediately.</label>
																					<p className="mt-2 fs-14 d-block mb-0">Disable this option if you want to start your booking from a specific date and time.</p>
																				</div>
																			</div>
																			<div className="booking-start-time-holder" style={{display:'none'}}>
																				<div className="form-group pt_30">
																					<label className="form-label fs-16">Booking starts on</label>
																					<p className="mt-2 fs-14 d-block mb-0">Specify the date and time when you want the booking to start.</p>
																					<DateTimePicker datePickerTitle='Event Date.*' onDateChange={(e) => {}}/>
																				</div>
																			</div>
																		</div>
																		<div className="setting-item border_bottom pb_30 pt_30">
																			<div className="d-flex align-items-start">
																				<label className="btn-switch m-0 me-3">
																					<input type="checkbox" className="" id="booking-end-time-btn" value="" defaultChecked={true} onChange={(e) => {}}></input>
																					<span className="checkbox-slider"></span>
																				</label>
																				<div className="d-flex flex-column">
																					<label className="color-black fw-bold mb-1">I want the bookings to continue until my event ends.</label>
																					<p className="mt-2 fs-14 d-block mb-0">Disable this option if you want to end your booking from a specific date and time.</p>
																				</div>
																			</div>
																			<div className="booking-end-time-holder" style={{display:'none'}}>
																				<div className="form-group pt_30">
																					<label className="form-label fs-16">Booking ends on</label>
																					<p className="mt-2 fs-14 d-block mb-0">Specify the date and time when you want the booking to start.</p>
																					<DateTimePicker datePickerTitle='Event Date.*' onDateChange={(e) => {}}/>
																				</div>
																			</div>
																		</div>
																		<div className="setting-item border_bottom pb_30 pt_30">
																			<div className="d-flex align-items-start">
																				<label className="btn-switch m-0 me-3">
																					<input type="checkbox" className="" id="refund-policies-btn" value="" onChange={(e) => {}} defaultChecked={true}/>
																					<span className="checkbox-slider"></span>
																				</label>
																				<div className="d-flex flex-column">
																					<label className="color-black fw-bold mb-1">I do not wish to offer my customers with option to cancel their orders and receive refund.</label>
																					<p className="mt-2 fs-14 d-block mb-0">Disable this slider if you want to let your customers cancel their order and select a refund policy.</p>
																				</div>
																			</div>
																			<div className="refund-policies-holder" style={{display:"none"}}>
																				<div className="refund-policies-content border_top mt-4">
																					<div className="row grid-padding-8">
																						<div className="col-md-12 mb-6">
																							<div className="refund-method">
																								<div className="refund-input-content" data-method="refund-id-2">
																									<div className="input-content mb-3">
																										<label className="color-black mb-2 fs-14 fw-bold">Cancellation must be made <span className="red">*</span></label>
																										<div className="d-block d-md-flex align-items-center flex-wrap flex-lg-wrap-reverse">
																											<div className="col-md-4">
																												<div className="input-group input-number">
																													<input type="number" min="0" max="30" className="form-control" placeholder="" onChange={(e) => {}}/>
																												</div>
																											</div>
																											<div className="input-sign ms-md-3 mt-3 mb-3">days before the event</div>
																										</div>
																									</div>
																									<div className="input-content mb-3">
																										<label className="color-black mb-2 fs-14 fw-bold">Refund amount <span className="red">*</span></label>
																										<div className="d-block d-md-flex align-items-center flex-wrap flex-lg-wrap-reverse">
																											<div className="col-md-4">
																												<div className="input-group loc-group position-relative">
																													<input type="text" value="" className="form-control" placeholder="" onChange={(e) => {}}/>
																													<span className="percentage-icon"><i className="fa-solid fa-percent"></i></span>
																												</div>
																											</div>
																											<div className="input-sign ms-md-3 mt-3 mb-3">days before the event</div>
																										</div>
																									</div>
																								</div>
																							</div>
																						</div>
																					</div>																	
																				</div>
																			</div>
																		</div>
																		<div className="setting-item border_bottom pb_30 pt_30">
																			<div className="d-flex align-items-start">
																				<label className="btn-switch m-0 me-3">
																					<input type="checkbox" className="" id="ticket-instructions-btn" value="" defaultChecked={true} onChange={(e) => {}}></input>
																					<span className="checkbox-slider"></span>
																				</label>
																				<div className="d-flex flex-column">
																					<label className="color-black fw-bold mb-1">I do not require adding any special instructions on the tickets.</label>
																					<p className="mt-2 fs-14 d-block mb-0">Use this space to provide any last minute checklists your attendees must know in order to attend your event. Anything you provide here will be printed on your ticket.</p>
																				</div>
																			</div>		
																			<div className="ticket-instructions-holder" style={{display:'none'}}>
																				<div className="ticket-instructions-content mt-4">
																					<textarea className="form-textarea" placeholder="About"></textarea>
																				</div>
																			</div>
																		</div>
																		<div className="setting-item pb-0 pt_30">
																			<div className="d-flex align-items-start">
																				<label className="btn-switch m-0 me-3">
																					<input type="checkbox" className="" id="tags-btn" value="" defaultChecked={true} onChange={(e) => {}}></input>
																					<span className="checkbox-slider"></span>
																				</label>
																				<div className="d-flex flex-column">
																					<label className="color-black fw-bold mb-1">I do not want to add tags in my event</label>
																					<p className="mt-2 fs-14 d-block mb-0">Use relevant words as your tags to improve the discoverability of your event.</p>
																				</div>
																			</div>
																			<div className="tags-holder" style={{display:'none'}}>
																				<div className="ticket-instructions-content tags-container mt-4">
																					<input className="form-control tags-input" type="text" placeholder="Type your tags and press enter"></input>
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
										</div>
										<div className="step-footer step-tab-pager mt-4">
											<button data-direction="prev" className="btn btn-default btn-hover steps_btn">Previous</button>
											<button data-direction="next" className="btn btn-default btn-hover steps_btn">Next</button>
											<button data-direction="finish" className="btn btn-default btn-hover steps_btn">Create</button>
										</div>
									</div>
								</div> 
							</div>

						</div>
					</div>
				</div>
			</div>
		</>
	)
}
