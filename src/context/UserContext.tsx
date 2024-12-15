'use client';

import { getUserDetails } from '@/app/apis';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface UserContextType {
	user: User | null;
	setUser: (user: User | null) => void;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		// Check if there is already a user
		if(user) return;

		getUserDetails().then(setUser);
	}, [user]);
	
	return (
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
