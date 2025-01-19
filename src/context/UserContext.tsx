'use client';

import { getUserDetails, updatePhone } from '@/app/apis';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import GooglePhoneVerification from '@/components/auth/GooglePhoneVerification';
import { toast } from 'react-hot-toast';

interface UserContextType {
	user: User | null;
	setUser: (user: User | null) => void;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [showPhoneModal, setShowPhoneModal] = useState(false);
	
	useEffect(() => {
		// Check if there is already a user
		if(user) {
			// if (!user.phoneNumber) {
			// 	setShowPhoneModal(true);
			// }

			// else if(!user.phoneNumberVerfied) {
			// 	setShowPhoneNumberVerificationModal(true)
			// }
			return
		};

		getUserDetails().then((user: User) => {
			setUser(user);
		});
	}, [user]);

	const handlePhoneSubmit = async (phoneNumber: string) => {
		try {
			if (!user?.email) return;
			
			const data = await updatePhone(user.email, phoneNumber);
			if (data.user) {
				setUser(data.user);
				setShowPhoneModal(false);
				toast.success('Phone number updated successfully');
			}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			console.error(error);
			toast.error('Failed to update phone number');
		}
	};
	
	return (
		// <UserContext.Provider value={{ user, setUser }}>
		// 	{children}
		// 	{showPhoneModal && user && (
		// 		<GooglePhoneVerification
		// 			onSubmit={handlePhoneSubmit}
		// 			email={user.email}
		// 		/>
		// 	)}
		// 	{showPhoneNumberVerificationModal && user && (
		// 		<OTPVerificationModal
		// 			onVerificationSuccess={handleOTPSubmit}
		// 		/>
		// 	)}
		// </UserContext.Provider>
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};

// Hook to use the UserContext
export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
};
