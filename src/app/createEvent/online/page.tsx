/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useState } from 'react'

import "../../../../public/css/datepicker.min.css"
import "../../../../public/css/jquery-steps.css"
import "../../../../public/css/night-mode.css"

import { TAG_CONSTANTS } from '@/dataset/constants'
import DateTimePickerWithDuration from '@/components/form/DateTimePickerWithDuration'
import Link from 'next/link'
import DateTimePicker from '@/components/form/DateTimePicker'
import { createOnlineEvent } from '@/app/apis';
import { defaultOnlineEvent } from '@/app/defaultValues'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

// Define error state interface
interface FormErrors {
	name: boolean;
	tags: boolean;
	eventDate: boolean;
	totalTickets: boolean;
}

export default function OnlineEvent() {
	const router = useRouter();
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState<FormErrors>({
		name: false,
		tags: false,
		eventDate: false,
		totalTickets: false
	});

	const [event, setEvent] = useState<OnlineEventForm>(defaultOnlineEvent)
	const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
		const field = e.target.name as keyof FormErrors;
		if (field in errors) {
			clearError(field);
		}

		if (e.target.name === 'tags') {
			// Handle multiple select
			const options = e.target as HTMLSelectElement;
			const values = Array.from(options.selectedOptions).map(option => option.value);
			setEvent({ ...event, tags: values });
		} else if (e.target.type === 'checkbox') {

			if(e.target.name === "isFreeEvent" && (e.target as HTMLInputElement).checked) { 
				setEvent({ ...event, price: 0 });
			} 
			if(e.target.name === "isBookingStartImmediately" && !(e.target as HTMLInputElement).checked) {
				setEvent({ ...event, bookingStartDateTime: event.eventDate });
			}
			if(e.target.name === "isBookingEndImmediately" && !(e.target as HTMLInputElement).checked) {
				setEvent({ ...event, bookingEndDateTime: event.eventDate });
			}
			if(e.target.name === "isSpecialInstructions" && (e.target as HTMLInputElement).checked) {
				setEvent({ ...event, specialInstructions: "" });
			} 
			
			setEvent({ ...event, [e.target.name]: (e.target as HTMLInputElement).checked });
		} else {
			setEvent({ ...event, [e.target.name]: e.target.value });
		}
	};

	const handleTypeChange = (type: number) => {
		setEvent({ ...event, type });
	}

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			// Check file size (5MB = 5 * 1024 * 1024 bytes)
			const maxSize = 5 * 1024 * 1024; // 5MB in bytes
			if (file.size > maxSize) {
				alert('Image size must be less than 5MB');
				// Clear the input
				e.target.value = '';
				return;
			}

			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
				setEvent({ ...event, image: file }); // Store the file object
			};
			reader.readAsDataURL(file);
		}
	};

	// Clear errors helper
	const clearError = (field: keyof FormErrors) => {
		setErrors(prev => ({ ...prev, [field]: false }));
	};

	// Validate form helper
	const validateForm = () => {
		const newErrors = {
			name: event.name.trim() === "",
			tags: event.tags.length === 0,
			eventDate: event.eventDate === "",
			totalTickets: event.totalTickets === 0
		};
		
		setErrors(newErrors);
		
		if (newErrors.name || newErrors.tags || newErrors.eventDate) {
			(globalThis as any).$('#tab_step1_link').click();
			toast.error('Please fill the required fields');
			return false;
		}
		
		if (newErrors.totalTickets) {
			(globalThis as any).$('#tab_step2_link').click();
			toast.error('Please fill the required fields');
			return false;
		}
		
		return true;
	};

	const handleCreateEvent = async () => {
		try {
			if (!validateForm()) return;
			
			setLoading(true);
			await createOnlineEvent(event);
			router.push(`/event/created`);
		} catch (error) {
			console.error('Error creating event:', error);
			toast.error(error instanceof Error ? error.message : 'Failed to create event. Please try again.');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		setTimeout(() => {
			// (globalThis as any).ClassicEditor
			// 	.create( document.querySelector( '#pd_editor' ), {
			// 	// toolbar: [ 'heading', '|', 'bold', 'italic', 'link' ]
				
			// 	} )
			// 	.then((editor: any) => {
			// 		(globalThis as any).editor = editor;
			// 	})
			// 	.catch((err: any) => {
			// 		console.error( err.stack );
			// 	});

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
										<li className="breadcrumb-item"><Link href="/">Home</Link></li>
										<li className="breadcrumb-item"><Link href="/createEvent">Create</Link></li>
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
											<Link href="#tab_step1" id="tab_step1_link">
												<span className="number"></span>
												<span className="step-name">Details</span>
											</Link>
										</li>
										<li>
											<Link href="#tab_step2" id="tab_step2_link">
												<span className="number"></span>
												<span className="step-name">Tickets</span>
											</Link>
										</li>
										<li>
											<Link href="#tab_step3" id="tab_step3_link">
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
																	<input 
																		className={`form-control h_50 ${errors.name ? 'error-input' : ''}`} 
																		type="text" 
																		placeholder="Enter event name here" 
																		value={event.name} 
																		onChange={handleChange} 
																		name="name"
																	/>
																	{errors.name && (
																		<div className="error-message">Event name is required</div>
																	)}
																</div>
																<div className="form-group border_bottom pt_30 pb_30">
																	<label className="form-label fs-16">Choose a category for your event.*</label>
																	<p className="mt-2 d-block fs-14 mb-3">Choosing relevant categories helps to improve the discoverability of your event.</p>
																	<select 
																		className={`selectpicker ${errors.tags ? 'error-input' : ''}`} 
																		multiple={true} 
																		data-selected-text-format="count > 4" 
																		data-size="5" 
																		title="Select category" 
																		data-live-search="true" 
																		value={event.tags} 
																		onChange={handleChange} 
																		name="tags"
																	>
																		{Object.keys(TAG_CONSTANTS).map((tag: string) => {
																			return <option value={tag} key={tag}> {TAG_CONSTANTS[tag as keyof typeof TAG_CONSTANTS]}</option>
																		})}
																	</select>
																	{errors.tags && (
																		<div className="error-message">Please select at least one category</div>
																		)}
																</div>
																<div className="form-group border_bottom pt_30 pb_30">
																	<label className="form-label fs-16">When is your event?*</label>
																	<p className="mt-2 fs-14 d-block mb-3">Tell your attendees when your event starts so they can get ready to attend.</p>
																	<DateTimePickerWithDuration 
																		duration={event.eventDuration} 
																		dateTime={event.eventDate} 
																		onDateChange={(date) => {
																			clearError('eventDate');
																			setEvent({...event, eventDate: date});
																		}} 
																		onDurationChange={(duration) => setEvent({...event, eventDuration: parseInt(duration)})}
																	/>
																	{errors.eventDate && (
																		<div className="error-message">Please select event date and time</div>
																	)}
																</div>
																<div className="form-group pt_30 pb_30">
																	<label className="form-label fs-16">Add a few images to your event banner.</label>
																	<p className="mt-2 fs-14 d-block mb-3 pe_right">Upload colorful and vibrant images as the banner for your event! See how beautiful images help your event details page.</p>
																	<div className="content-holder mt-4">
																		<div className="default-event-thumb">   
																			<div className="default-event-thumb-btn">
																				<div className="thumb-change-btn">
																					<input type="file" id="thumb-img" onChange={handleImageChange} name='image' accept='image/*' size={5 * 1024 * 1024}/>
																					<label htmlFor="thumb-img">Change Image</label>
																				</div>
																			</div>
																			<img 
																				src={imagePreview || "/images/banners/custom-img.jpg"} 
																				alt="Event thumbnail" 
																			/>
																		</div>
																	</div>
																</div>
																<div className="form-group border_bottom pb_30">
																	<label className="form-label fs-16">Please describe your event.</label>
																	<p className="mt-2 fs-14 d-block mb-3">Write a few words below to describe your event and provide any extra information such as schedules, itinerary or any special instructions required to attend your event.</p>
																	<div className="text-editor mt-4">
																		<textarea id="pd_editor" className="form-control" value={event.description} onChange={handleChange} name="description"></textarea>
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
																						<input id="standard_webinar" type="radio" name="template_id" value="standard webinar" onChange={() => handleTypeChange(1)} checked={event.type === 1}/>
																						<label className="template sw-template" htmlFor="standard_webinar">
																							<img src="/images/icons/standard-webinar.png" alt="" />
																						</label>											
																						<h6 className="hosting-title fs-14 mt-2 mb-0 ">Standard Webinar</h6>
																					</div>
																				</div>
																				<div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
																					<div className="template-item mt-3">
																						<input id="traning_workshop" type="radio" name="template_id" value="traning workshop" onChange={() => handleTypeChange(2)} checked={event.type === 2}/>
																						<label className="template tw-template" htmlFor="traning_workshop">
																							<img src="/images/icons/health-and-welbeing.png" alt="" />
																						</label>											
																						<h6 className="hosting-title fs-14 mt-2 mb-0">Training and Workshop</h6>
																					</div>
																				</div>
																				<div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
																					<div className="template-item mt-3">
																						<input id="online_classes" type="radio" name="template_id" value="online classes" onChange={() => handleTypeChange(3)} checked={event.type === 3}/>
																						<label className="template oc-template" htmlFor="online_classes">
																							<img src="/images/icons/e-learning.png" alt="" />
																						</label>											
																						<h6 className="hosting-title fs-14 mt-2 mb-0">Online Classes</h6>
																					</div>
																				</div>
																				<div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
																					<div className="template-item mt-3">
																						<input id="talk_show" type="radio" name="template_id" value="talk show" onChange={() => handleTypeChange(4)} checked={event.type === 4}/>
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
																<label className="form-label fs-16">Let&apos;s create tickets!</label>
																<p className="mt-2 fs-14 d-block mb-3 pe_right">Add the ticket price and the number of your attendees. For free events, keep the price at empty.</p>
																<div className="content-holder">
																	<div className="row g-3">
																		{!event.isFreeEvent && <div className="col-md-6 disabled-action">
																			<label className="form-label mt-3 fs-6">Price*</label>
																			<div className="loc-group position-relative input-group">
																				<input 
																					className="form-control h_50" 
																					type="text" 
																					placeholder="Enter price" 
																					name="price"
																					value={event.price ? event.price.toLocaleString('en-IN') : ''}
																					onChange={(e) => {
																						// Remove non-numeric characters and parse
																						const value = parseFloat(e.target.value.replace(/[^0-9.]/g, '')) || 0;
																						setEvent({ ...event, price: value });
																					}}
																				/>
																				<div className="pp-select">
																					<span className="pp-select-label">INR</span>
																					{/* <select className="selectpicker dropdown-no-bg" onChange={handleChange} name='locale' value={event.locale}>
																						<option value="AUD">AUD</option>
																						<option value="USD">USD</option>
																						<option value="INR">INR</option>
																						<option value="EUR">EUR</option>
																					</select> */}
																				</div>
																			</div>
																		</div>}
																		<div className="col-md-6">
																			<label className="form-label mt-3 fs-6">Total number of tickets available*</label>
																			<div className="input-number">
																				<input 
																					className={`form-control h_50 ${errors.totalTickets ? 'error-input' : ''}`}
																					type="text" 
																					placeholder="Enter number of tickets" 
																					name="totalTickets"
																					value={event.totalTickets ? event.totalTickets.toLocaleString('en-IN') : ''}
																					onChange={(e) => {
																						clearError('totalTickets');
																						const value = parseInt(e.target.value.replace(/[^0-9]/g, '')) || 0;
																						setEvent({ ...event, totalTickets: value });
																					}}
																				/>
																				{errors.totalTickets && (
																					<div className="error-message">Please enter number of tickets</div>
																				)}
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
																				<input type="checkbox" className="" id="free-event-ticketing" value="" onChange={handleChange} name='isFreeEvent' defaultChecked={false}/>
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
														{/* <div className="stepper-data-set pt_30 disabled-action">
															<div className="content-holder">
																<div className="form-group">
																	<div className="d-flex align-items-start">
																		<label className="btn-switch m-0 me-3">
																			<input type="checkbox" className="" id="bird-discount" value="" onChange={handleChange} name='isDiscount'/>
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
																				<input className="form-control h_50" type="text" placeholder="0" value={event.discount === 0 ? "" : event.discount} onChange={handleChange} name='discount'/>
																			</div>
																			<div className="col-md-3">
																				<label className="form-label mt-3 fs-6">Price*</label>
																				<select className="selectpicker" onChange={handleChange} name='discountType' value={event.discountType}>
																					<option value="Percentage">Percent(%)</option>
																					<option value="Fixed">Fixed($)</option>
																				</select>
																			</div>
																			<div className="col-md-3">
																				<DatePicker title="Discount ends on*" value={event.discountEndDateTime} onChange={(date) => setEvent({...event, discountEndDateTime: date})}/>
																			</div>
																			<div className="col-md-3">
																				<TimePicker value={event.discountEndDateTime} onChange={(date) => {setEvent({...event, discountEndDateTime: date})}}/>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div> */}
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
																<label className="form-label fs-16">Let&apos;s configure a few additional options for your event!</label>
																<p className="mt-2 fs-14 d-block mb-3 pe_right">Change the following settings based on your preferences to customise your event accordingly.</p>
																<div className="content-holder">
																	<div className="setting-item border_bottom pb_30 pt-4">
																		<div className="d-flex align-items-start">
																			<label className="btn-switch m-0 me-3">
																				<input type="checkbox" className="" id="booking-start-time-btn"  value="" onChange={handleChange} name='isBookingStartImmediately' checked={event.isBookingStartImmediately}/>
																				<span className="checkbox-slider"></span>
																			</label>
																			<div className="d-flex flex-column">
																				<label className="color-black fw-bold mb-1">I want the bookings to start immediately.</label>
																				<p className="mt-2 fs-14 d-block mb-0">Disable this option if you want to start your booking from a specific date and time.</p>
																			</div>
																		</div>
																		<div className="booking-start-time-holder" style={{display: event.isBookingStartImmediately ? 'none' : 'block'}}>
																			<div className="form-group pt_30">
																				<label className="form-label fs-16">Booking starts on</label>
																				<p className="mt-2 fs-14 d-block mb-0">Specify the date and time when you want the booking to start.</p>
																				<DateTimePicker datePickerTitle="Event Date.*" dateTime={event.bookingStartDateTime} onDateTimeChange={(date) => {setEvent({...event, bookingStartDateTime: date})}}/>
																			</div>
																		</div>
																	</div>
																	<div className="setting-item border_bottom pb_30 pt_30">
																		<div className="d-flex align-items-start">
																			<label className="btn-switch m-0 me-3">
																				<input type="checkbox" className="" id="booking-end-time-btn" value="" onChange={handleChange} name='isBookingContinueTillEventEnd' checked={event.isBookingContinueTillEventEnd}/>
																				<span className="checkbox-slider"></span>
																			</label>
																			<div className="d-flex flex-column">
																				<label className="color-black fw-bold mb-1">I want the bookings to continue until my event ends.</label>
																				<p className="mt-2 fs-14 d-block mb-0">Disable this option if you want to end your booking from a specific date and time.</p>
																			</div>
																		</div>
																		<div className="booking-end-time-holder" style={{display: event.isBookingContinueTillEventEnd ? 'none' : 'block'}}>
																			<div className="form-group pt_30">
																				<label className="form-label fs-16">Booking ends on</label>
																				<p className="mt-2 fs-14 d-block mb-0">Specify the date and time when you want the booking to start.</p>
																				<DateTimePicker datePickerTitle="Event Date.*" dateTime={event.bookingEndDateTime} onDateTimeChange={(date) => setEvent({...event, bookingEndDateTime: date})}/>
																			</div>
																		</div>
																	</div>
																	{/* <div className="setting-item border_bottom pb_30 pt_30">
																		<div className="d-flex align-items-start">
																			<label className="btn-switch m-0 me-3">
																				<input type="checkbox" className="" id="refund-policies-btn"  value="" onChange={handleChange} name='isRefundPolicies' defaultChecked={true}/>
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
																												<input type="number" min="0" max="30" className="form-control" placeholder="" onChange={handleChange} name='refundBefore'/>
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
																												<input type="text" value={event.refundPrecentage} className="form-control" placeholder="" onChange={handleChange} name='refundPrecentage'/>
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
																	</div> */}
																	<div className="setting-item border_bottom pb_30 pt_30">
																		<div className="d-flex align-items-start">
																			<label className="btn-switch m-0 me-3">
																				<input type="checkbox" className="" id="ticket-instructions-btn" value="" onChange={handleChange} name='isSpecialInstructions' checked={event.isSpecialInstructions}/>
																				<span className="checkbox-slider"></span>
																			</label>
																			<div className="d-flex flex-column">
																				<label className="color-black fw-bold mb-1">I do not require adding any special instructions on the tickets.</label>
																				<p className="mt-2 fs-14 d-block mb-0">Use this space to provide any last minute checklists your attendees must know in order to attend your event. Anything you provide here will be printed on your ticket.</p>
																			</div>		
																		</div>
																		<div className="ticket-instructions-holder" style={{display: event.isSpecialInstructions ? 'none' : 'block'}}>
																			<div className="ticket-instructions-content mt-4">
																				<textarea className="form-textarea" placeholder="About" onChange={handleChange} name='specialInstructions'></textarea>
																			</div>
																		</div>
																	</div>
																	{/* <div className="setting-item pb-0 pt_30">
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
																	</div> */}
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
										<button data-direction="finish" className="btn btn-default btn-hover steps_btn" onClick={handleCreateEvent} disabled={loading}>
											{loading ? (
												<>
													<i className="fa-solid fa-spinner fa-spin me-2"></i>
													Creating...
												</>
											) : (
												'Create'
											)}
										</button>
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