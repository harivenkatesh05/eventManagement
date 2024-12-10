'use client'

import React, { useEffect } from 'react'

import "../../../../public/css/datepicker.min.css"
import "../../../../public/css/jquery-steps.css"
import "../../../../public/css/night-mode.css"
import "../../../../public/vendor/ckeditor5/sample/css/sample.css"
import { TAG_CONSTANTS } from '@/dataset/constants'
import TimePicker from '@/components/form/TimePicker'
import DateTimePickerWithDuration from '@/components/form/DateTimePickerWithDuration'
import DatePicker from '@/components/form/DatePicker'
import Link from 'next/link'
import DateTimePicker from '@/components/form/DateTimePicker'

export default function OnlineEvent() {
	
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
									<li className="breadcrumb-item active" aria-current="page">Create Online Event</li>
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
							<h3>Create Online Event</h3>
						</div>
					</div>
					<div className="col-xl-8 col-lg-9 col-md-12">
						<div className="wizard-steps-block">
							<div id="add-event-tab" className="step-app">
								<ul className="step-steps">
									<li className="active">
										<Link href="#tab_step1">
											<span className="number"></span>
											<span className="step-name">Details</span>
										</Link>
									</li>
									<li>
										<Link href="#tab_step2">
											<span className="number"></span>
											<span className="step-name">Tickets</span>
										</Link>
									</li>
									<li>
										<Link href="#tab_step3">
											<span className="number"></span>
											<span className="step-name">Setting</span>
										</Link>
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
																<input className="form-control h_50" type="text" placeholder="Enter event name here" value="" onChange={(e) => {}}/>
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
																				<input type="file" id="thumb-img" onChange={(e) => {}}/>
																				<label htmlFor="thumb-img">Change Image</label>
																			</div>
																		</div>
																		<img src="/images/banners/custom-img.jpg" alt="" />
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
																<label className="form-label fs-16">What type of online event are you hosting?*</label>
																<p className="mt-2 fs-14 d-block mb-3">Choosing the type of your event helps us to create a more tailored experience for you.</p>
																<div className="stepper-data-set">
																	<div className="content-holder template-selector">
																		<div className="row g-3">
																			<div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
																				<div className="template-item mt-3">
																					<input id="standard_webinar" type="radio" name="template_id" value="standard webinar" onChange={(e) => {}}/>
																					<label className="template sw-template" htmlFor="standard_webinar">
																						<img src="/images/icons/standard-webinar.png" alt="" />
																					</label>											
																					<h6 className="hosting-title fs-14 mt-2 mb-0">Standard Webinar</h6>
																				</div>
																			</div>
																			<div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
																				<div className="template-item mt-3">
																					<input id="traning_workshop" type="radio" name="template_id" value="traning workshop" onChange={(e) => {}}/>
																					<label className="template tw-template" htmlFor="traning_workshop">
																						<img src="/images/icons/health-and-welbeing.png" alt="" />
																					</label>											
																					<h6 className="hosting-title fs-14 mt-2 mb-0">Training and Workshop</h6>
																				</div>
																			</div>
																			<div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
																				<div className="template-item mt-3">
																					<input id="online_classes" type="radio" name="template_id" value="online classes" onChange={(e) => {}}/>
																					<label className="template oc-template" htmlFor="online_classes">
																						<img src="/images/icons/e-learning.png" alt="" />
																					</label>											
																					<h6 className="hosting-title fs-14 mt-2 mb-0">Online Classes</h6>
																				</div>
																			</div>
																			<div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
																				<div className="template-item mt-3">
																					<input id="talk_show" type="radio" name="template_id" value="talk show" onChange={(e) => {}}/>
																					<label className="template ts-template" htmlFor="talk_show">
																						<img src="/images/icons/talk-show-1.png" alt="" />
																					</label>											
																					<h6 className="hosting-title fs-14 mt-2 mb-0">Talk Show</h6>
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
												<div className="p-4 bp-form main-form">
													<div className="form-group border_bottom pb_30">
														<div className="ticket-section">
															<label className="form-label fs-16">Let's create tickets!</label>
															<p className="mt-2 fs-14 d-block mb-3 pe_right">Add the ticket price and the number of your attendees. For free events, keep the price at $0.</p>
															<div className="content-holder">
																<div className="row g-3">
																	<div className="col-md-6 disabled-action">
																		<label className="form-label mt-3 fs-6">Price*</label>
																		<div className="loc-group position-relative input-group">
																			<input className="form-control h_50" type="text" placeholder="" value="10.00" onChange={(e) => {}}/>
																			<div className="pp-select">
																				<select className="selectpicker dropdown-no-bg" onChange={(e) => {}} defaultValue={"INR"}>
																					<option value="AUD">AUD</option>
																					<option value="USD">USD</option>
																					<option value="INR">INR</option>
																					<option value="EUR">EUR</option>
																				</select>
																			</div>
																		</div>
																	</div>
																	<div className="col-md-6">
																		<label className="form-label mt-3 fs-6">Total number of tickets available*</label>
																		<div className="input-number">
																			<input className="form-control h_50" type="number" placeholder="" value="5" onChange={(e) => {}}/>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div className="free-event pt_30">
															<div className="content-holder">
																<div className="form-group">
																	<div className="d-flex align-items-start">
																		<label className="btn-switch m-0 me-3">
																			<input type="checkbox" className="" id="free-event-ticketing" value="" onChange={(e) => {}}/>
																			<span className="checkbox-slider"></span>
																		</label>
																		<div className="d-flex flex-column">
																			<label className="color-black fs-14 fw-bold mb-1">Tickets are free</label>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div className="stepper-data-set pt_30 disabled-action">
														<div className="content-holder">
															<div className="form-group">
																<div className="d-flex align-items-start">
																	<label className="btn-switch m-0 me-3">
																		<input type="checkbox" className="" id="bird-discount" value="" onChange={(e) => {}}/>
																		<span className="checkbox-slider"></span>
																	</label>
																	<div className="d-flex flex-column">
																		<label className="color-black mb-1">I want to offer early bird discount.</label>
																		<p className="mt-2 fs-14 d-block mb-3">Enabling this discount lets your attendees get all the regular tickets features at a discounted price.</p>
																	</div>
																</div>
																<div className="online-event-discount-wrapper" style={{ display: 'none' }}>
																	<div className="row g-3">
																		<div className="col-md-3">
																			<label className="form-label mt-3 fs-6">Discount*</label>
																			<input className="form-control h_50" type="text" placeholder="0" value="" onChange={(e) => {}}/>
																		</div>
																		<div className="col-md-3">
																			<label className="form-label mt-3 fs-6">Price*</label>
																			<select className="selectpicker" onChange={(e) => {}} defaultValue={"Percentage"}>
																				<option value="Percentage">Percent(%)</option>
																				<option value="Fixed">Fixed($)</option>
																			</select>
																		</div>
																		<div className="col-md-3">
																			<DatePicker title="Discount ends on*" onChange={(e) => {}}/>
																		</div>
																		<div className="col-md-3">
																			<TimePicker onChange={(e) => {}}/>
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
																			<input type="checkbox" className="" id="booking-start-time-btn" value="" onChange={(e) => {}} defaultChecked={true}/>
																			<span className="checkbox-slider"></span>
																		</label>
																		<div className="d-flex flex-column">
																			<label className="color-black fw-bold mb-1">I want the bookings to start immediately.</label>
																			<p className="mt-2 fs-14 d-block mb-0">Disable this option if you want to start your booking from a specific date and time.</p>
																		</div>
																	</div>
																	<div className="booking-start-time-holder" style={{display:"none"}}>
																		<div className="form-group pt_30">
																			<label className="form-label fs-16">Booking starts on</label>
																			<p className="mt-2 fs-14 d-block mb-0">Specify the date and time when you want the booking to start.</p>
																			<DateTimePicker datePickerTitle="Event Date.*" onDateChange={(e) => {}}/>
																		</div>
																	</div>
																</div>
																<div className="setting-item border_bottom pb_30 pt_30">
																	<div className="d-flex align-items-start">
																		<label className="btn-switch m-0 me-3">
																			<input type="checkbox" className="" id="booking-end-time-btn" value="" onChange={(e) => {}} defaultChecked={true}/>
																			<span className="checkbox-slider"></span>
																		</label>
																		<div className="d-flex flex-column">
																			<label className="color-black fw-bold mb-1">I want the bookings to continue until my event ends.</label>
																			<p className="mt-2 fs-14 d-block mb-0">Disable this option if you want to end your booking from a specific date and time.</p>
																		</div>
																	</div>
																	<div className="booking-end-time-holder" style={{display:"none"}}>
																		<div className="form-group pt_30">
																			<label className="form-label fs-16">Booking ends on</label>
																			<p className="mt-2 fs-14 d-block mb-0">Specify the date and time when you want the booking to start.</p>
																			<DateTimePicker datePickerTitle="Event Date.*" onDateChange={(e) => {}}/>
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
																			<input type="checkbox" className="" id="ticket-instructions-btn" value="" defaultChecked={true} onChange={(e) => {}}/>
																			<span className="checkbox-slider"></span>
																		</label>
																		<div className="d-flex flex-column">
																			<label className="color-black fw-bold mb-1">I do not require adding any special instructions on the tickets.</label>
																			<p className="mt-2 fs-14 d-block mb-0">Use this space to provide any last minute checklists your attendees must know in order to attend your event. Anything you provide here will be printed on your ticket.</p>
																		</div>		
																	</div>
																	<div className="ticket-instructions-holder" style={{display:"none"}}>
																		<div className="ticket-instructions-content mt-4">
																			<textarea className="form-textarea" placeholder="About" onChange={(e) => {}}></textarea>
																		</div>
																	</div>
																</div>
																<div className="setting-item pb-0 pt_30">
																	<div className="d-flex align-items-start">
																		<label className="btn-switch m-0 me-3">
																			<input type="checkbox" className="" id="tags-btn" value="" onChange={(e) => {}} defaultChecked={true}/>
																			<span className="checkbox-slider"></span>
																		</label>
																		<div className="d-flex flex-column">
																			<label className="color-black fw-bold mb-1">I do not want to add tags in my event</label>
																			<p className="mt-2 fs-14 d-block mb-0">Use relevant words as your tags to improve the discoverability of your event.</p>
																		</div>
																	</div>
																	<div className="tags-holder" style={{display:"none"}}>
																		<div className="ticket-instructions-content tags-container mt-4">
																			<input className="form-control tags-input" type="text" placeholder="Type your tags and press enter" onChange={(e) => {}}/>
																			<div className="tags-list">
																				
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
		
	)
}
