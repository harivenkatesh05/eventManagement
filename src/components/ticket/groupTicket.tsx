/* eslint-disable @typescript-eslint/no-explicit-any */
import { defaultTicket } from '@/app/defaultValues'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Modal from '@/components/modal/Modal';

interface FormErrors {
	ticketName: boolean;
	ticketPrice: boolean;
	ticketLimit: boolean;
/* The backticks (` `) in the code snippet you provided are used for string interpolation in JSX.
Within the backticks, you can embed JavaScript expressions or variables by wrapping them in curly
braces `{}`. This allows you to dynamically generate content within the JSX code. */
	// ticketLimitPerUser: boolean;
}

export default function GroupTicket({ticket, onSave, onCancel}: {ticket: Ticket, onSave: (ticket: TicketForm) => void, onCancel: () => void}) {
	const [ticketModel, setTicketModel] = useState<TicketForm>(ticket);
	const [isOpen, setIsOpen] = useState(true);
	
	const [errors, setErrors] = useState<FormErrors>({
		ticketName: false,
		ticketPrice: false,
		ticketLimit: false,
		// ticketLimitPerUser: false
	});

	const reset = () => {
		setTicketModel(defaultTicket);
		setErrors({
			ticketName: false,
			ticketPrice: false,
			ticketLimit: false,
			// ticketLimitPerUser: false
		});
	};

	const handleClose = () => {
		reset();
		onCancel();
		setIsOpen(false);
	};

	const clearError = (field: keyof FormErrors) => {
		setErrors(prev => ({ ...prev, [field]: false }));
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const field = e.target.name as keyof FormErrors;
		if (field in errors) {
			clearError(field);
		}

		setTicketModel({
			...ticketModel,
			[e.target.name]: e.target.value
		});
	};

	const validateForm = () => {
		const newErrors = {
			ticketName: !ticketModel.ticketName.trim(),
			ticketPrice: ticketModel.price < 0,
			ticketLimit: ticketModel.totalTickets <= 0,
			// ticketLimitPerUser: ticketModel.maxBookingTickets <= 0
		};

		setErrors(newErrors);
		return !Object.values(newErrors).some(error => error);
	};

	const handleSave = () => {
		if (!validateForm()) {
			toast.error('Please fill all required fields');
			return;
		}

		onSave(ticketModel);
		reset();
		setIsOpen(false);
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={handleClose}
			title="Create Group Ticket"
			onSave={handleSave}
		>
			<div className="model-content main-form">
				<div className="row">
					<div className="col-lg-12 col-md-12">
						<div className="form-group mt-4">
							<label className="form-label">Ticket Name*</label>
							<input 
								className={`form-control h_40 ${errors.ticketName ? 'error-input' : ''}`} 
								type="text" 
								placeholder="Enter Ticket Type Name" 
								name="ticketName" 
								value={ticketModel.ticketName ?? ""} 
								onChange={handleChange} 
							/>
							{errors.ticketName && (
								<div className="error-message">Ticket name is required</div>
							)}
						</div>
					</div>
					<div className="col-lg-12 col-md-12">
						<div className="main-card p-4 mt-4">
							<div className="form-label mb-4 fs-16">Ticket Restrictions</div>
							<div className="form-group">
								<label className="form-label">Total number of tickets available*</label>
								<input 
									className={`form-control h_40 ${errors.ticketLimit ? 'error-input' : ''}`}
									type="number"
									name="totalTickets"
									value={ticketModel.totalTickets}
									onChange={handleChange}
								/>
								{errors.ticketLimit && (
									<div className="error-message">Ticket limit is required</div>
								)}
							</div>
							{/* <div className="form-group mt-4">
								<label className="form-label">Maximum tickets per customer*</label>
								<input 
									className={`form-control h_40 ${errors.ticketLimitPerUser ? 'error-input' : ''}`}
									type="number"
									name="maxBookingTickets"
									value={ticketModel.maxBookingTickets}
									onChange={handleChange}
								/>
								{errors.ticketLimitPerUser && (
									<div className="error-message">Ticket limit per user is required</div>
								)}
							</div> */}
						</div>
					</div>
					<div className="col-lg-12 col-md-12">
						<div className="form-group mt-4">
							<label className="form-label">Ticket Price*</label>
							<input 
								className={`form-control h_40 ${errors.ticketPrice ? 'error-input' : ''}`}
								type="number"
								name="price"
								value={ticketModel.price}
								onChange={handleChange}
							/>
							{errors.ticketPrice && (
								<div className="error-message">Ticket price is required</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
}
