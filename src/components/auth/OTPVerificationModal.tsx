import { useState } from 'react';
import { verifyPhoneOTP } from '@/app/apis';
import { useUser } from '@/context/UserContext';
import Modal from '../modal/Modal';

interface OTPVerificationModalProps {
	onVerificationSuccess: () => void;
}

export default function OTPVerificationModal({
	onVerificationSuccess
}: OTPVerificationModalProps) {

	const {user} = useUser();
	const [otp, setOtp] = useState('');
	const [error, setError] = useState<string | null>(null);
	
	const handleVerify = async () => {
		if (!otp || otp.length !== 6) {
			setError('Please enter a valid 6-digit OTP');
			return;
		}

		setError(null);

		try {
			const phoneNumber = user?.phoneNumber
			const response = await verifyPhoneOTP(phoneNumber!, otp);
			if (response.verified) {
				onVerificationSuccess();
			} else {
				setError('Invalid OTP. Please try again.');
			}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (err) {
			setError('Failed to verify OTP. Please try again.');
		} 
	};

	return (
		<Modal
			isOpen={true}
			onClose={() => {}}
			closeOnlyOnSubmit={true}
			title="Verify phonenumber"
			onSave={handleVerify}	
			buttonText="Verify OTP"
		>
			<div className="modal-body">
				<p className='mb-4'>
					Enter the verification code sent to yout phoneNumber
				</p>
				<div className="form-group">
					<input
						type="text"
						maxLength={6}
						value={otp}
						onChange={(e) => {
							const value = e.target.value.replace(/[^0-9]/g, '');
							setOtp(value);
							setError(null);
						}}
						placeholder="Enter 6-digit OTP"
						className={`form-control h_50 ${error ? 'error-input' : ''}`}
					/>
				</div>
				{error && <div className="error-message">{error}</div>}
			</div>
		</Modal>
		// <div className="modal-overlay">
		// 	<div className="modal-content">
		// 		<div className="modal-header">
		// 			<h4>Phone Verification</h4>
		// 			{/* <button 
		// 				className="close-button" 
		// 				onClick={onClose}
		// 				aria-label="Close"
		// 			>
		// 				<i className="uil uil-multiply"></i>
		// 			</button> */}
		// 		</div>
				
		// 		<div className="modal-footer">
		// 			<button 
		// 				className="main-btn btn-hover" 
		// 				onClick={handleVerify}
		// 				disabled={isVerifying}
		// 			>
		// 				{isVerifying ? 'Verifying...' : 'Verify OTP'}
		// 			</button>
		// 		</div>
		// 	</div>
		// </div>
	)
} 