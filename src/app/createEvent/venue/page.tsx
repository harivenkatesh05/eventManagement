/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useEffect, useState } from 'react'

import "../../../../public/css/datepicker.min.css"
import "../../../../public/css/jquery-steps.css"
import "../../../../public/css/night-mode.css"

import { TAG_CONSTANTS } from '@/dataset/constants'
import DateTimePickerWithDuration from '@/components/form/DateTimePickerWithDuration'
import DateTimePicker from '@/components/form/DateTimePicker'
import { defaultVenueEvent } from '@/app/defaultValues'
import Link from 'next/link'
import { createVenueEvent } from '@/app/apis'
import { useRouter } from 'next/navigation'
import DatePicker from '@/components/form/DatePicker'
import TimePicker from '@/components/form/TimePicker'

export default function VenueEvent() {
	const router = useRouter();

	// const [tickets, setTickets] = useState<Ticket[]>([])
	const [event, setEvent] = useState<VenueEventForm>(defaultVenueEvent)
	const [loading, setLoading] = useState(false)
	const [imagePreview, setImagePreview] = useState<string | null>(null);

	const handleCreateEvent = () => {
		// Required fields validation
		const requiredFields = ['name', 'tags', 'eventDate', 'eventDuration', 'venue', 'address1', 'country', 'state', 'city', 'zipCode'];

		const emptyFields = requiredFields.filter((key) => {
			if (key === 'tags') {
				return event.tags.length === 0;
			}
			return !event[key as keyof typeof event];
		})

		if (emptyFields.length > 0) {
			alert(`Please fill the required fields`);
			return;
		}

		// Create form data for image upload
		setLoading(true);
		createVenueEvent(event).then(({}) => {
				setLoading(false);
				router.push(`/event/created`);
			}).catch((err: any) => {
				console.error('Error creating event:', err);
				alert('Failed to create event. Please try again.');
			}).finally(() => {
				setLoading(false);
			});
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
		if (e.target.name === 'tags') {
			// Handle multiple select
			const options = e.target as HTMLSelectElement;
			const values = Array.from(options.selectedOptions).map(option => option.value);
			setEvent({ ...event, tags: values });
		} else if (e.target.type === 'checkbox') {
			setEvent({ ...event, [e.target.name]: (e.target as HTMLInputElement).checked });
		} else {
			setEvent({ ...event, [e.target.name]: e.target.value });
		}
	};
	
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
				setEvent({ ...event, image: file });
			};
			reader.readAsDataURL(file);
		}
	};

	// const handleSaveTicket = (ticket: TicketForm) => {
	// 	if(!ticket.id) {
	// 		const newTicket: Ticket = {
	// 			...ticket,
	// 			id: crypto.randomUUID(),
	// 			isTicketEnabled: true
	// 		}
	// 		setTickets([...tickets, newTicket])
	// 	} else {
	// 		setTickets(tickets.map(t => 
	// 			t.id === ticket.id 
	// 			  ? { ...t, ...ticket }
	// 			  : t
	// 		))
	// 	}
	// 	setTicket(null)
	// }

	// const handleCancelTicket = () => {
	// 	setTicket(null)
	// }

	// const handleDeleteTicket = (ticketId: string) => {
	// 	setTickets(tickets.filter((ticket) => ticket.id !== ticketId))
	// }

	// const handleEditTicket = (ticket: Ticket) => {
	// 	setTicket(ticket)
		
	// 	const addTicketButton = document.querySelector("#addTicket") as HTMLElement
	// 	addTicketButton.click()
	// }

	const initMap = () => {
		const mapElement = document.getElementById('venue-map');
		if (!mapElement) return;

		// Start with default position (India)
		const defaultPosition = { lat: 20.5937, lng: 78.9629 };
		
		// Create map with default position
		const map = new (window as any).google.maps.Map(mapElement, {
			center: defaultPosition,
			zoom: 5
		});

		// Get user's current position
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const currentPosition = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};

				// Center map on user's position
				map.setCenter(currentPosition);
				map.setZoom(15); // Zoom in closer

				// Add marker for current position
				new (window as any).google.maps.Marker({
					position: currentPosition,
					map: map,
					title: 'Your Location',
					animation: (window as any).google.maps.Animation.DROP
				});

				// Get address for current position
				const geocoder = new (window as any).google.maps.Geocoder();
				geocoder.geocode(
					{ location: currentPosition },
					(results: any, status: any) => {
						if (status === 'OK' && results[0]) {
							const place = results[0];
							const addressComponents = place.address_components;
							
							setEvent({
								...event,
								venue: place.formatted_address,
								address1: getAddressComponent(addressComponents, 'street_number') + ' ' + 
										getAddressComponent(addressComponents, 'route'),
								address2: getAddressComponent(addressComponents, 'sublocality'),
								country: getAddressComponent(addressComponents, 'country'),
								state: getAddressComponent(addressComponents, 'administrative_area_level_1'),
								city: getAddressComponent(addressComponents, 'locality'),
								zipCode: getAddressComponent(addressComponents, 'postal_code'),
								latitude: currentPosition.lat,
								longitude: currentPosition.lng
							});
						}
					}
				);
			},
			(error) => {
				console.error('Error getting location:', error);
				// Keep default position if geolocation fails
			},
			{
				enableHighAccuracy: true,
				timeout: 5000,
				maximumAge: 0
			}
		);

		// Add click listener for selecting new location
		map.addListener('click', (e: any) => {
			const geocoder = new (window as any).google.maps.Geocoder();
			geocoder.geocode(
				{ location: e.latLng },
				(results: any, status: any) => {
					if (status === 'OK') {
						const place = results[0];
						
						// Extract address components
						const addressComponents = place.address_components;
						const formattedAddress = place.formatted_address;
						
						setEvent({
							...event,
							venue: formattedAddress,
							address1: getAddressComponent(addressComponents, 'street_number') + ' ' + 
									 getAddressComponent(addressComponents, 'route'),
							address2: getAddressComponent(addressComponents, 'sublocality'),
							country: getAddressComponent(addressComponents, 'country'),
							state: getAddressComponent(addressComponents, 'administrative_area_level_1'),
							city: getAddressComponent(addressComponents, 'locality'),
							zipCode: getAddressComponent(addressComponents, 'postal_code'),
							latitude: e.latLng.lat(),
							longitude: e.latLng.lng()
						});
					}
				}
			);
		});
	};

	// Helper function to get address components
	const getAddressComponent = (components: any[], type: string) => {
		const component = components.find(
			(c: any) => c.types[0] === type
		);
		return component ? component.long_name : '';
	};

	useEffect(() => {
		const script = document.createElement('script');
		script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
		script.async = true;
		script.onload = () => {
			initMap();
		};
		document.head.appendChild(script);

		return () => {
			const scriptElement = document.querySelector(`script[src*="maps.googleapis.com"]`);
			if (scriptElement) {
				document.head.removeChild(scriptElement);
			}
		};
	}, []);

	useEffect(() => {
		setTimeout(() => {
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

	// Add this useEffect to reinitialize selectpicker when country changes
	useEffect(() => {
		if (event.country) {
			setTimeout(() => {
				(globalThis as any).$('select[name="country"]')
					.val(event.country)
					.selectpicker('refresh');
			}, 0);
		}
	}, [event.country]);

	return (
		<>
       		{/* <GroupTicket ticket={ticket ?? {} as Ticket} onSave={handleSaveTicket} onCancel={handleCancelTicket} /> */}
			<div className="wrapper">
				<div className="breadcrumb-block">
					<div className="container">
						<div className="row">
							<div className="col-lg-12 col-md-10">
								<div className="barren-breadcrumb">
									<nav aria-label="breadcrumb">
										<ol className="breadcrumb">
											<li className="breadcrumb-item"><Link href="/">Home</Link></li>
											<li className="breadcrumb-item"><Link href="/create">Create</Link></li>
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
																		<input className="form-control h_50" type="text" placeholder="Enter event name here" value={event.name} onChange={handleChange} name="name" />
																	</div>
																	<div className="form-group border_bottom pt_30 pb_30">
																		<label className="form-label fs-16">Choose a category for your event.*</label>
																		<p className="mt-2 d-block fs-14 mb-3">Choosing relevant categories helps to improve the discoverability of your event.</p>
																		<select className="selectpicker" multiple={true} data-selected-text-format="count > 4" data-size="5" title="Select category" data-live-search="true" onChange={handleChange} name="tags">
																			{Object.keys(TAG_CONSTANTS).map((tag: string) => {
																				return <option value={tag} key={tag}> {TAG_CONSTANTS[tag as keyof typeof TAG_CONSTANTS]}</option>
																			})}
																		</select>
																	</div>
																	<div className="form-group border_bottom pt_30 pb_30">
																		<label className="form-label fs-16">When is your event?*</label>
																		<p className="mt-2 fs-14 d-block mb-3">Tell your attendees when your event starts so they can get ready to attend.</p>
																		<DateTimePickerWithDuration duration={event.eventDuration} dateTime={event.eventDate} onDateChange={(date) => setEvent({...event, eventDate: date})} onDurationChange={(duration) => setEvent({...event, eventDuration: parseInt(duration)})}/>
																	</div>
																	<div className="form-group pt_30 pb_30">
																		<label className="form-label fs-16">Add a few images to your event banner.</label>
																		<p className="mt-2 fs-14 d-block mb-3 pe_right">Upload colorful and vibrant images as the banner for your event! See how beautiful images help your event details page.</p>
																		<div className="content-holder mt-4">
																			<div className="default-event-thumb">   
																				<div className="default-event-thumb-btn">
																					<div className="thumb-change-btn">
																						<input type="file" id="thumb-img" onChange={handleImageChange} name='image' accept='image/*'/>
																						<label htmlFor="thumb-img">Change Image</label>
																					</div>
																				</div>
																				<img src={imagePreview || "/images/banners/custom-img.jpg"} alt="Event thumbnail" />
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
																		<label className="form-label fs-16">Where is your event taking place? *</label>
																		<p className="mt-2 fs-14 d-block mb-3">Add a venue to your event to tell your attendees where to join the event.</p>
																		<div className="stepper-data-set">
																			<div className="content-holder template-selector">
																				<div className="row g-4">
																					<div className="col-md-12">
																						<div className="venue-event">
																							<div className="map" id="venue-map" style={{border:0, width:'100%', height:'300px'}} data-lat={event.latitude} data-lng={event.longitude} ></div>
																						</div>
																					</div>
																					<div className="col-md-12">
																						<div className="form-group mt-1">
																							<label className="form-label fs-6">Venue*</label>
																							<input 
																								className="form-control h_50" 
																								type="text" 
																								placeholder="Venue name"
																								value={event.venue}
																								onChange={(e) => setEvent({...event, venue: e.target.value})}
																							/>
																						</div>
																					</div>
																					<div className="col-md-6">
																						<div className="form-group mt-1">
																							<label className="form-label fs-6">Address line 1*</label>
																							<input 
																								className="form-control h_50" 
																								type="text" 
																								placeholder="Address line 1"
																								value={event.address1}
																								onChange={(e) => setEvent({...event, address1: e.target.value})}
																							/>
																						</div>
																					</div>
																					<div className="col-md-6">
																						<div className="form-group mt-1">
																							<label className="form-label fs-6">Address line 2*</label>
																							<input 
																								className="form-control h_50" 
																								type="text" 
																								placeholder="Address line 2"
																								value={event.address2}
																								onChange={(e) => setEvent({...event, address2: e.target.value})}
																							/>
																						</div>
																					</div>
																					<div className="col-md-6">
																						<div className="form-group main-form mt-1">
																							<label className="form-label">Country*</label>
																							<select 
																								className="selectpicker" 
																								data-size="5" 
																								title="Select country" 
																								data-live-search="true" 
																								name="country"
																								value={event.country}
																								onChange={(e) => {
																									setEvent({...event, country: e.target.value});
																									(globalThis as any).$(e.target).selectpicker('refresh');
																								}}
																							>
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
																							<input className="form-control h_50" type="text" placeholder="" value={event.state} onChange={(e) => setEvent({...event, state: e.target.value})}></input>																								
																						</div>
																					</div>
																					<div className="col-lg-6 col-md-12">
																						<div className="form-group mt-1">
																							<label className="form-label">City/Suburb*</label>
																							<input className="form-control h_50" type="text" placeholder="" value={event.city} onChange={(e) => setEvent({...event, city: e.target.value})}></input>																								
																						</div>
																					</div>
																					<div className="col-lg-6 col-md-12">
																						<div className="form-group mt-1">
																							<label className="form-label">Zip/Post Code*</label>
																							<input className="form-control h_50" type="text" placeholder="" value={event.zipCode} onChange={(e) => setEvent({...event, zipCode: e.target.value})}></input>																								
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
											
											{/* <div className="step-tab-panel step-tab-gallery" id="tab_step2">
												<div className="tab-from-content">
													<div className="main-card">
														<div className="bp-title">
															<h4><i className="fa-solid fa-ticket step_icon me-3"></i>Tickets</h4>
														</div>
														<div className="bp-form main-form">
															<div className="p-4 form-group border_bottom pb_30">
																<div className="">
																	<div className="ticket-section">
																		<label className="form-label fs-16">Let&apos;s create tickets!</label>
																		<p className="mt-2 fs-14 d-block mb-3 pe_right">Create tickets for your event by clicking on the &apos;Add Tickets&apos; button below.</p>
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
											</div> */}

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
																			<div className="col-md-6 disabled-action">
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
																						<select className="selectpicker dropdown-no-bg" onChange={handleChange} name='locale' defaultValue={"INR"}>
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
																					<input 
																						className="form-control h_50" 
																						type="text" 
																						placeholder="Enter number of tickets" 
																						name="totalTickets"
																						value={event.totalTickets ? event.totalTickets.toLocaleString('en-IN') : ''}
																						onChange={(e) => {
																							// Remove non-numeric characters and parse
																							const value = parseInt(e.target.value.replace(/[^0-9]/g, '')) || 0;
																							setEvent({ ...event, totalTickets: value });
																						}}
																					/>
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
																					<input type="checkbox" className="" id="free-event-ticketing" value="" onChange={handleChange} name='isFreeEvent'/>
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
																	<label className="form-label fs-16">Let&apos;s configure a few additional options for your event!</label>
																	<p className="mt-2 fs-14 d-block mb-3 pe_right">Change the following settings based on your preferences to customise your event accordingly.</p>
																	<div className="content-holder">
																		<div className="setting-item border_bottom pb_30 pt-4">
																			<div className="d-flex align-items-start">
																				<label className="btn-switch m-0 me-3">
																					<input type="checkbox" className="" id="booking-start-time-btn" value="" defaultChecked={true} onChange={handleChange} name='isBookingStartImmediately'></input>
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
																					<DateTimePicker datePickerTitle='Event Date.*' dateTime={event.bookingStartDateTime} onDateTimeChange={(date) => {setEvent({...event, bookingStartDateTime: date})}}/>
																				</div>
																			</div>
																		</div>
																		<div className="setting-item border_bottom pb_30 pt_30">
																			<div className="d-flex align-items-start">
																				<label className="btn-switch m-0 me-3">
																					<input type="checkbox" className="" id="booking-end-time-btn" value="" defaultChecked={true} onChange={handleChange} name='isBookingEndImmediately'></input>
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
																					<DateTimePicker datePickerTitle='Event Date.*' dateTime={event.bookingEndDateTime} onDateTimeChange={(date) => {setEvent({...event, bookingEndDateTime: date})}}/>
																				</div>
																			</div>
																		</div>
																		<div className="setting-item border_bottom pb_30 pt_30">
																			<div className="d-flex align-items-start">
																				<label className="btn-switch m-0 me-3">
																					<input type="checkbox" className="" id="refund-policies-btn" value="" onChange={handleChange} name='isRefundPolicies' defaultChecked={true}/>
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
																													<input type="number" min="0" max="30" className="form-control" placeholder="" onChange={handleChange} name='refundBefore' value={event.refundBefore}/>
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
																													<input type="text" className="form-control" placeholder="" onChange={handleChange} name='refundAmount' value={event.refundAmount}/>
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
																					<input type="checkbox" className="" id="ticket-instructions-btn" value="" defaultChecked={true} onChange={handleChange} name='isSpecialInstructions'></input>
																					<span className="checkbox-slider"></span>
																				</label>
																				<div className="d-flex flex-column">
																					<label className="color-black fw-bold mb-1">I do not require adding any special instructions on the tickets.</label>
																					<p className="mt-2 fs-14 d-block mb-0">Use this space to provide any last minute checklists your attendees must know in order to attend your event. Anything you provide here will be printed on your ticket.</p>
																				</div>
																			</div>		
																			<div className="ticket-instructions-holder" style={{display:'none'}}>
																				<div className="ticket-instructions-content mt-4">
																					<textarea className="form-textarea" placeholder="About" onChange={handleChange} name='specialInstructions' value={event.specialInstructions}></textarea>
																				</div>
																			</div>
																		</div>
																		{/* <div className="setting-item pb-0 pt_30">
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
		</>
	)
}
