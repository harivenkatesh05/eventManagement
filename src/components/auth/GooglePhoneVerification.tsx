import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import Modal from '../modal/Modal';

interface Props {
	onSubmit: (phoneNumber: string) => Promise<void>;
	email: string;
}

export default function GooglePhoneVerification({ onSubmit, email }: Props) {
	const [phoneNumber, setPhoneNumber] = useState('');
	const [, setLoading] = useState(false);
	const [error, setError] = useState('');

	const handleSubmit = async () => {
		if (!phoneNumber.trim()) {
			setError('Phone number is required');
			return;
		}

		// Basic phone validation
		const phoneRegex = /^\d{10}$/;
		if (!phoneRegex.test(phoneNumber)) {
			setError('Please enter a valid 10-digit phone number');
			return;
		}

		setLoading(true);
		try {
			await onSubmit(phoneNumber);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			toast.error('Failed to update phone number');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal
			isOpen={true}
			onClose={() => {}}
			closeOnlyOnSubmit={true}
			title="Complete Your Profile"
			onSave={handleSubmit}
		>
			<div className="p-4">
				<p className="mb-4">
					Please provide your phone number to complete the registration for {email}
				</p>
				<div className="form-group">
					<label className="form-label">Phone Number*</label>
					<input
						type="tel"
						className={`form-control h_50 ${error ? 'error-input' : ''}`}
						placeholder="Enter your phone number"
						value={phoneNumber}
						onChange={(e) => {
							setPhoneNumber(e.target.value);
							setError('');
						}}
					/>
					{error && <div className="error-message">{error}</div>}
				</div>
			</div>
		</Modal>
	);
}
