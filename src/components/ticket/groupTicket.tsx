import React, { useEffect, useState } from 'react'
import DatePicker from '../form/DatePicker'
import TimePicker from '../form/TimePicker'
import { Ticket, TicketForm } from '@/type'

export default function GroupTicket({ticket, onSave, onCancel}: {ticket: Ticket, onSave: (ticket: TicketForm) => void, onCancel: () => void}) {
	console.log(ticket)

	const [ticketName, setTicketName] = useState(ticket.ticketName ?? "")
	const [ticketLimitPerUser, setTicketLimitPerUser] = useState(ticket.ticketLimitPerUser ?? "")
	const [ticketLimit, setTicketLimit] = useState(ticket.ticketLimit ?? "")
	const [isTicketLimitEnabled, setIsTicketLimitEnabled] = useState(ticket.isTicketLimitEnabled ?? false)
	const [isTicketLimitPerUserEnabled, setIsTicketLimitPerUserEnabled] = useState(ticket.isTicketLimitPerUserEnabled ?? false)
	
	const [ticketPrice, setTicketPrice] = useState(ticket.ticketPrice ?? "")
	const [isTicketDiscountEnabled, setIsTicketDiscountEnabled] = useState(ticket.isTicketDiscountEnabled ?? false)
	const [discountPrice, setDiscountPrice] = useState(ticket.discountPrice ?? "")
	const [discountType, setDiscountType] = useState(ticket.discountType ?? "Percentage")
	const [discountEndDateTime, setDiscountEndDateTime] = useState(ticket.discountEndDateTime ?? "")

	useEffect(() => {
		setTicketName(ticket.ticketName ?? "")
		setTicketLimitPerUser(ticket.ticketLimitPerUser ?? "")
		setTicketLimit(ticket.ticketLimit ?? "")
		setIsTicketLimitEnabled(ticket.isTicketLimitEnabled ?? false)
		setIsTicketLimitPerUserEnabled(ticket.isTicketLimitPerUserEnabled ?? false)
		setTicketPrice(ticket.ticketPrice ?? "")
		setIsTicketDiscountEnabled(ticket.isTicketDiscountEnabled ?? false)
		setDiscountPrice(ticket.discountPrice ?? "")
		setDiscountType(ticket.discountType ?? "Percentage")
		setDiscountEndDateTime(ticket.discountEndDateTime ?? "")
	}, [ticket])

	const reset = () => {
		setTicketName("")
		setTicketLimitPerUser(0)
		setTicketLimit(0)
		setIsTicketLimitEnabled(false)
		setIsTicketLimitPerUserEnabled(false)
		setTicketPrice(0)
		setIsTicketDiscountEnabled(false)
		setDiscountPrice(0)
		setDiscountType("Percentage")
		setDiscountEndDateTime("")
	}

	const handleSave = () => {
		onSave({ticketName, ticketLimitPerUser, ticketLimit, isTicketLimitEnabled, isTicketLimitPerUserEnabled, ticketPrice, isTicketDiscountEnabled, discountPrice, discountType, discountEndDateTime, id: ticket.id})
		reset()
	}

	const handleCancel = () => {
		reset()
		onCancel()
	}

	useEffect(() => {
		setTimeout(() => {
			// Initialize Bootstrap Modal
			const modalElement = document.getElementById('groupTicketModal')
			if (modalElement) {
				const modal = new (globalThis as any).bootstrap.Modal(modalElement, {
					keyboard: false,
					backdrop: 'static'
				})
				
				// Clean up on unmount
				return () => {
					modal.dispose()
				}
			}
		}, 10)
	}, [])

	return (
		<div className="modal fade" id="groupTicketModal" tabIndex={-1} aria-labelledby="groupTicketModalLabel" aria-hidden="false">
			<div className="modal-dialog modal-lg">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="groupTicketModalLabel">Create Group Ticket</h5>
						<button type="button" className="close-model-btn" data-bs-dismiss="modal" aria-label="Close" onClick={handleCancel}><i className="uil uil-multiply"></i></button>
					</div>
					<div className="modal-body">
						<div className="model-content main-form">
							<div className="row">
								<div className="col-lg-12 col-md-12">
									<div className="form-group mt-4">
										<label className="form-label">Ticket Name*</label>
										<input className="form-control h_40" type="text" placeholder="Enter Ticket Type - Group Name (E.g Gold - Family Pass)" value={ticketName} onChange={(e) => setTicketName(e.target.value)} />																								
									</div>
								</div>
								<div className="col-lg-12 col-md-12">
									<div className="main-card p-4 mt-4">
										<div className="form-label mb-4 fs-16">Ticket Restrictions</div>
										<div className="form-group border_bottom">
											<div className="d-flex align-items-center flex-wrap pb-4 flex-nowrap">
												<h4 className="fs-14 mb-0 me-auto">Total number of tickets available</h4>
												<label className="btn-switch m-0 me-3">
													<input type="checkbox" id="is-restrict-total-ticket2" checked={!isTicketLimitEnabled} onChange={(e) => setIsTicketLimitEnabled(!e.target.checked)}/>
													<span className="checkbox-slider"></span>
												</label>
												<div>
												<label className="fs-12 m-0">Unlimited</label>
												</div>
											</div>
											<div className="p-0 mb-4 total_ticket_per_level2" style={{display:"none"}}>
												<div className="form-group">
													<div className="input-number">
														<input className="form-control h_40" type="number" min="0" max="30" placeholder="Enter Total Tickets" value={Number.isNaN(ticketLimit) ? "" : ticketLimit} onChange={(e) => setTicketLimit(parseInt(e.target.value))}/>
													</div>
												</div>
											</div>
										</div>
										<div className="form-group">
											<div className="d-flex align-items-center flex-wrap pt-4 flex-nowrap">
												<h4 className="fs-14 mb-0 me-auto">Maximum number of tickets for each customer</h4>
												<label className="btn-switch m-0 me-3">
													<input type="checkbox" id="is-restrict-ticket-per-user2" checked={!isTicketLimitPerUserEnabled} onChange={(e) => setIsTicketLimitPerUserEnabled(!e.target.checked)}/>
													<span className="checkbox-slider"></span>
												</label>
												<div>
													<label className="fs-12 m-0">Unlimited</label>
												</div>
											</div>
											<div className="p-0 mt-4 total_ticket_per_user2" style={{display:"none"}}>
												<div className="form-group">
													<div className="input-number">
														<input className="form-control h_40" type="number" min="0" max="30" placeholder="Enter Max. per order" value={ticketLimitPerUser} onChange={(e) => setTicketLimitPerUser(parseInt(e.target.value))}/>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-12 col-md-12">
									<div className="form-group mt-4">
										<label className="form-label mb-2 fs-14">Ticket Price*</label>
										<input className="form-control h_40" type="number" value={ticketPrice} placeholder="Enter Ticket Price" onChange={(e) => setTicketPrice(parseInt(e.target.value))}/>
									</div>
								</div>
								
								<div className="col-lg-12 col-md-12">
									<div className="main-card p-4 mt-4">
										<div className="form-group">
											<div className="d-flex align-items-start">
												<label className="btn-switch m-0 me-3">
													<input type="checkbox" className="" id="bird-discount2" checked={isTicketDiscountEnabled} onChange={(e) => setIsTicketDiscountEnabled(e.target.checked)}/>
													<span className="checkbox-slider"></span>
												</label>
												<div className="d-flex flex-column">
													<label className="color-black mb-1">I want to offer early bird discount.</label>
													<p className="mt-2 fs-14 d-block mb-3">Enabling this discount lets your attendees get all the regular tickets features at a discounted price.</p>
												</div>
											</div>
											<div className="online-event-discount-wrapper2" style={{display: "none"}}>
												<div className="row g-3">
													<div className="col-md-3">
														<label className="form-label mt-3 fs-6">Discount*</label>
														<input className="form-control h_40" type="text" placeholder="0" value={discountPrice} onChange={(e) => setDiscountPrice(parseInt(e.target.value))}/>
													</div>
													<div className="col-md-3">
														<label className="form-label mt-3 fs-6">Price*</label>
														<select className="selectpicker" value={discountType} onChange={(e) => setDiscountType(e.target.value)}>
															<option value="Percentage">Percent(%)</option>
															<option value="Fixed">Fixed($)</option>
														</select>
													</div>
													<div className="col-md-3">
														<DatePicker title="Discount ends on*" value={discountEndDateTime} onChange={(discountEndDateTime) => setDiscountEndDateTime(discountEndDateTime)}/>
													</div>
													<div className="col-md-3">
														<TimePicker value={discountEndDateTime} onChange={(discountEndDateTime) => setDiscountEndDateTime(discountEndDateTime)}/>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="modal-footer">
						<button type="button" className="co-main-btn min-width btn-hover h_40" data-bs-target="#aboutModal" data-bs-toggle="modal" data-bs-dismiss="modal" onClick={handleCancel}>Cancel</button>
						<button type="button" className="main-btn min-width btn-hover h_40" onClick={handleSave} data-bs-dismiss="modal">Save</button>
					</div>
				</div>
			</div>
		</div>
	)
}
