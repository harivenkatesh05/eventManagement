function convertToBase64(file: File) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';

export const fetchEvent = async (id: string) => {
	const response = await fetch(`${BASE_URL}/api/events/${id}`);
	if (!response.ok) throw new Error('Failed to fetch event');
	const data = await response.json();
	return data.event;
};

export const fetchEvents = async () => {
	const response = await fetch(`${BASE_URL}/api/events`);
	if (!response.ok) throw new Error('Failed to fetch events');
	const data = await response.json();
	return data.events;
};

export const fetchOnlineEvent = async (id: string) => {
	const response = await fetch(`${BASE_URL}/api/events/online/${id}`);
	if (!response.ok) throw new Error('Failed to fetch events');
	const data = await response.json();
	return data.event;
}

export const fetchVenueEvent = async (id: string) => {
	const response = await fetch(`${BASE_URL}/api/events/venue/${id}`);
	if (!response.ok) throw new Error('Failed to fetch events');
	const data = await response.json();
	return data.event;
}

export const signup = async (data: User) => {
	const response = await fetch(`${BASE_URL}/api/auth/signup`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});
	if (!response.ok) throw new Error('Failed to sign up');
	return response.json();
};

export const signin = async (data: SignInForm) => {
	const response = await fetch(`${BASE_URL}/api/auth/signin`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});
	if (!response.ok) throw new Error('Failed to sign in');
	return response.json();
};

export const createOnlineEvent = async (data: OnlineEventForm) => {
	try {
		if (data.image) {
			const image = await convertToBase64(data.image);
			data.image = image as unknown as File;
		}

		const response = await fetch(`${BASE_URL}/api/events/online`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});

		const result = await response.json();

		if (!response.ok) {
			throw new Error(result.message || 'Failed to create event');
		}

		return result;
	} catch (error) {
		console.error('Error in createOnlineEvent:', error);
		throw error;
	}
};

export const createVenueEvent = async (data: VenueEventForm) => {
	if (data.image) {
		const image = await convertToBase64(data.image);
		data.image = image as unknown as File;
	}
	const response = await fetch(`${BASE_URL}/api/events/venue`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});
	if (!response.ok) throw new Error('Failed to create event');
	return response.json();
};

export const signout = async () => {
	const response = await fetch(`${BASE_URL}/api/auth/signout`, {
		method: 'POST',
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
	});
	if (!response.ok) throw new Error('Failed to sign out');
	return response.json();
};

export const getUserDetails = async () => {
	const response = await fetch(`${BASE_URL}/api/auth/me`);
	if (!response.ok) throw new Error('Failed to fetch user details');
	return response.json();
};

export const bookOnlineEvent = async (eventId: string, purchaseForm: OnlinePurchaseForm) => {
	const response = await fetch(`${BASE_URL}/api/events/online/${eventId}/book`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(purchaseForm),
	});
	if (!response.ok) throw new Error('Failed to book event');
	return response.json();
};

export const bookVenueEvent = async (eventId: string, purchaseForm: VenuePurchaseForm) => {
	const response = await fetch(`${BASE_URL}/api/events/venue/${eventId}/book`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(purchaseForm),
	});
	if (!response.ok) throw new Error('Failed to book event');
	return response.json();
};

export const updateUserProfile = async (userProfile: UserProfile) => {
	const response = await fetch(`${BASE_URL}/api/auth/update-user`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(userProfile),
	});
	if (!response.ok) throw new Error('Failed to update user profile');
	return response.json();
};

export const fetchPurchase = async (id: string) => {
	const response = await fetch(`${BASE_URL}/api/purchase/${id}`);
	if (!response.ok) throw new Error('Failed to fetch purchase');
	return response.json();
};

export const initiatePayment = async (paymentData: PaymentData) => {
	const response = await fetch(`${BASE_URL}/api/payment/initiate`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(paymentData),
	});

	if (!response.ok) {
		throw new Error('Failed to initiate payment');
	}

	return response.json();
};

export const updatePhone = async (email: string, phoneNumber: string) => {
	const response = await fetch(`${BASE_URL}/api/auth/update-phone`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, phoneNumber }),
	});

	if (!response.ok) {
		throw new Error('Failed to update phone number');
	}

	return response.json();
};

export const clearCacheStore = async (model?: string) => {
	const body = model ? { model: model } : {};
	const response = await fetch(`${BASE_URL}/api/cache/clear`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	});
	if (!response.ok) throw new Error('Failed to clear runtime store');
	return response.json();
};

export const sendPhoneOTP = async (phoneNumber: string) => {
	const response = await fetch(`${BASE_URL}/api/auth/send-otp`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ phoneNumber }),
	});

	if (!response.ok) {
		throw new Error('Failed to send OTP');
	}

	return response.json();
};

export const verifyPhoneOTP = async (phoneNumber: string, code: string) => {
	const response = await fetch(`${BASE_URL}/api/auth/verify-otp`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ phoneNumber, code }),
	});

	if (!response.ok) {
		throw new Error('Failed to verify OTP');
	}

	return response.json();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).clearCacheStore = clearCacheStore;