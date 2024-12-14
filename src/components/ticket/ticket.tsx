import React from 'react'

export default function Ticket({ticket, onEdit, onDelete}: {ticket: Ticket, onEdit: () => void, onDelete: () => void}) {
	return (
		<div className="price-ticket-card mt-4">
			<div className="price-ticket-card-head d-md-flex flex-wrap align-items-start justify-content-between position-relative p-4">
				<div className="d-flex align-items-center top-name">
					<div className="icon-box">
						<span className="icon-big rotate-icon icon icon-purple">
							<i className="fa-solid fa-ticket"></i>
						</span>
						<h5 className="fs-16 mb-1 mt-3">{`${ticket.ticketName} - ${Intl.NumberFormat('en-IN', {style: "currency", currency: "INR", useGrouping: true}).format(ticket.ticketPrice)}`}</h5>
						{/* <p className="text-gray-50 m-0"><span className="visitor-date-time">{formatDateToIST(new Date(date))}</span></p> */}
					</div>
				</div>
				<div className="d-flex align-items-center">
					{ticket.isTicketDiscountEnabled && 
						<div className="price-badge">
							<img src="/images/discount.png" alt=""></img>
						</div>
					}

					<label className="btn-switch tfs-8 mb-0 me-4 mt-1">
						<input type="checkbox" value="" defaultChecked={ticket.isTicketEnabled} onChange={(e) => {}}></input>
						<span className="checkbox-slider"></span>
					</label>
					<div className="dropdown dropdown-default dropdown-text dropdown-icon-item">
						<button className="option-btn-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
							<i className="fa-solid fa-ellipsis-vertical"></i>
						</button>
						<div className="dropdown-menu dropdown-menu-end">
							<button className="dropdown-item" onClick={onEdit}><i className="fa-solid fa-pen me-3"></i>Edit</button>
							<button className="dropdown-item" onClick={onDelete}><i className="fa-solid fa-trash-can me-3"></i>Delete</button>
						</div>
					</div>
				</div>
			</div>
			<div className="price-ticket-card-body border_top p-4">
				<div className="full-width d-flex flex-wrap justify-content-between align-items-center">
					<div className="icon-box">
						<div className="icon me-3">
							<i className="fa-solid fa-ticket"></i>
						</div>
						<span className="text-145">Total tickets</span>
						<h6 className="coupon-status">{!ticket.isTicketLimitEnabled ? 'Unlimited' : ticket.ticketLimit}</h6>
					</div>
					<div className="icon-box">
						<div className="icon me-3">
							<i className="fa-solid fa-users"></i>
						</div>
						<span className="text-145">Ticket limit per customer</span>
						<h6 className="coupon-status">{!ticket.isTicketLimitPerUserEnabled ? 'Unlimited' : ticket.ticketLimitPerUser}</h6>
					</div>
					{ticket.isTicketDiscountEnabled && <div className="icon-box">
						<div className="icon me-3">
							<i className="fa-solid fa-cart-shopping"></i>
						</div>
						<span className="text-145">Discount</span>
						<h6 className="coupon-status">{ticket.discountPrice}</h6>
					</div>}
				</div>
			</div>
		</div>
	)
}
