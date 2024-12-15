'use client'

import { bookEvent } from '@/app/apis';
import { useUser } from '@/context/UserContext';
import { formatDateToIST, getDateObj } from '@/util/date';
import { toast } from 'react-hot-toast';
import React, { useState } from 'react'
import BookingConfirmed from './bookingConfirmed';
export default function Checkout({ event, tickets }: { event: EventFullDetail, tickets: number }) {
	const { user } = useUser();
	const [ticketID, setTicketID] = useState('');
	const [loading, setLoading] = useState(false);
	
	if(getDateObj(event.eventDate) < new Date()) {
		return <div>Event has already happened</div>
	}
	
	const handleConfirmBook = () => {
		setLoading(true);
		bookEvent(event.id, tickets)
			.then((res) => {
				// if(event.type === 'online') {
					setTicketID(res.purchaseId);
					// toast.success('Booking confirmed successfully!');
				// }
			})
			.catch((error) => {
				toast.error(error instanceof Error ? error.message : 'Failed to book event');
			})
			.finally(() => {
				setLoading(false);
			});
	}

	return (
		<div className="event-dt-block p-80">
			<div className="container">
				{ticketID ? <BookingConfirmed event={event} tickets={tickets} ticketID={ticketID} /> : (
					<div className="row">
						<div className="col-lg-12 col-md-12">
							<div className="main-title checkout-title">
							<h3>Order Confirmation</h3>
						</div>
					</div>
					<div className="col-xl-8 col-lg-12 col-md-12">
						<div className="checkout-block">
							<div className="main-card">
								<div className="bp-title">
									<h4>Billing information</h4>
								</div>
								<div className="bp-content bp-form">
									<div className="row">
										<div className="col-lg-6 col-md-12">
											<div className="form-group mt-4">
												<label className="form-label">First Name*</label>
												<input className="form-control h_50" type="text" placeholder="" value={user?.firstName} disabled/>																								
											</div>
										</div>
										<div className="col-lg-6 col-md-12">
											<div className="form-group mt-4">
												<label className="form-label">Last Name*</label>
												<input className="form-control h_50" type="text" placeholder="" value={user?.lastName} disabled/>																								
											</div>
										</div>
										<div className="col-lg-6 col-md-12">
											<div className="form-group mt-4">
												<label className="form-label">Email*</label>
												<input className="form-control h_50" type="text" placeholder="" value={user?.email} disabled />																								
											</div>
										</div>
										{/* <div className="col-lg-6 col-md-12">
											<div className="form-group mt-4">
												<label className="form-label">Address*</label>
												<input className="form-control h_50" type="text" placeholder=""/>																								
											</div>
										</div>
										<div className="col-lg-6 col-md-12">
											<div className="form-group main-form mt-4">
												<label className="form-label">Country*</label>
												<select className="selectpicker" data-size="5" title="Nothing selected" data-live-search="true">
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
										<div className="col-lg-6 col-md-12">
											<div className="form-group mt-4">
												<label className="form-label">State*</label>
												<input className="form-control h_50" type="text" placeholder="" value="" />																								
											</div>
										</div>
										<div className="col-lg-6 col-md-12">
											<div className="form-group mt-4">
												<label className="form-label">City/Suburb*</label>
												<input className="form-control h_50" type="text" placeholder="" value="" />																								
											</div>
										</div>
										<div className="col-lg-6 col-md-12">
											<div className="form-group mt-4">
												<label className="form-label">Zip/Post Code*</label>
												<input className="form-control h_50" type="text" placeholder="" value="" />																								
											</div>
										</div> */}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-4 col-lg-12 col-md-12">
						<div className="main-card order-summary">
							<div className="bp-title">
								<h4>Billing information</h4>
							</div>
							<div className="order-summary-content p_30">
								<div className="event-order-dt">
									<div className="event-thumbnail-img">
										<img src={event.image} alt="" />
									</div>
									<div className="event-order-dt-content">
										<h5>{event.name}</h5>
										<span>{formatDateToIST(getDateObj(event.eventDate))}</span>
										<div className="category-type">{event.type === 'online' ? 'Online' : 'Venue'} Event</div>
									</div>
								</div>
								<div className="order-total-block">
									<div className="order-total-dt">
										<div className="order-text">Total Ticket</div>
										<div className="order-number">{tickets}</div>
									</div>
									<div className="divider-line"></div>
									{!event.isFreeEvent && (
										<div className="order-total-dt">
											<div className="order-text">Total</div>
											<div className="order-number">{`${event.locale} ${event.price * tickets}`}</div>
										</div>
									)}
									{/* <div className="order-total-dt">
										<div className="order-text">Total</div>
										<div className="order-number ttl-clr">AUD $50.00</div>
									</div> */}
								</div>
								{/* <div className="coupon-code-block">
									<div className="form-group mt-4">
										<label className="form-label">Coupon Code*</label>
										<div className="position-relative">
											<input className="form-control h_50" type="text" placeholder="Code" value="" />
											<button className="apply-btn btn-hover" type="button">Apply</button>
										</div>
									</div>
								</div> */}
								{
									event.isFreeEvent ? (
										<div className="confirmation-btn">
											<button className="main-btn btn-hover h_50 w-100 mt-5" type="button" onClick={handleConfirmBook}>{loading ? 'Confirming...' : 'Confirm & Book'}</button>
										</div>
									) : (
										<div className="confirmation-btn">
											<button className="main-btn btn-hover h_50 w-100 mt-5" type="button" onClick={() => window.location.href='booking_confirmed.html'}>Confirm & Pay</button>
											<span>Price is inclusive of all applicable GST</span>
										</div>
									)
								}
							</div>
						</div>
					</div>
					</div>
				)}
			</div>
		</div>
	)
}
