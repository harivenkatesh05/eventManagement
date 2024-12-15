'use client'

import { useUser } from '@/context/UserContext';
import { getDateObj } from '@/util/date'
import Link from 'next/link';
import React from 'react'

export default function BookingConfirmed({ event, tickets, ticketID }: { event: EventFullDetail, tickets: number, ticketID: string }) {
	const { user } = useUser();
	const minutes = event.eventDuration % 60;
	const hours = (event.eventDuration - minutes) / 60;
	const inHours = minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
	return (
		<div className="row justify-content-center">
			<div className="col-xl-5 col-lg-7 col-md-10">
				<div className="booking-confirmed-content">
					<div className="main-card">
						<div className="booking-confirmed-top text-center p_30">
							<div className="booking-confirmed-img mt-4">
								<img src="/images/confirmed.png" alt="" />
							</div>
							<h4>Booking Confirmed</h4>
							<p className="ps-lg-4 pe-lg-4">{event.type === "online" ? 
								"We are pleased to inform you that your reservation request has been received and confirmed. The event link will be sent to you before 1 business day before the event." :
								"We are pleased to inform you that your reservation request has been received and confirmed."
							}</p>
							{/* <div className="add-calender-booking">
								<h5>Add</h5>
								<a href="#" className="cb-icon"><i className="fa-brands fa-windows"></i></a>
								<a href="#" className="cb-icon"><i className="fa-brands fa-apple"></i></a>
								<a href="#" className="cb-icon"><i className="fa-brands fa-google"></i></a>
								<a href="#" className="cb-icon"><i className="fa-brands fa-yahoo"></i></a>
							</div> */}
						</div>
						<div className="booking-confirmed-bottom">
							<div className="booking-confirmed-bottom-bg p_30">
								<div className="event-order-dt">
									<div className="event-thumbnail-img">
										<img src={event.image} alt="" />
									</div>
									<div className="event-order-dt-content">
										<h5>{event.name}</h5>
										<span>{getDateObj(event.eventDate).toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' })} {inHours}</span>
										<div className="buyer-name">{user?.firstName} {user?.lastName}</div>
										<div className="booking-total-tickets">
											<i className="fa-solid fa-ticket rotate-icon"></i>
											<span className="booking-count-tickets mx-2">{tickets}</span>x Ticket
										</div>
										{!event.isFreeEvent && <div className="booking-total-grand">
											Total : <span>${event.price * tickets}</span>
										</div>}
									</div>
								</div>
								{!(event.type === 'online' && event.isFreeEvent) && <Link href={`/invoice/${ticketID}`} className="main-btn btn-hover h_50 w-100 mt-5"><i className="fa-solid fa-ticket rotate-icon me-3"></i>View Ticket</Link>}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}