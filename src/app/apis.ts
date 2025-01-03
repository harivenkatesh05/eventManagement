function convertToBase64(file: File) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
}

export const fetchEvent = async (id: string) => {
	const response = await fetch(`/api/events/${id}`);
	if (!response.ok) throw new Error('Failed to fetch event');
	const data = await response.json();
	return data.event;
};

export const fetchEvents = async () => {
	const response = await fetch('/api/events');
	if (!response.ok) throw new Error('Failed to fetch events');
	const data = await response.json();
	return data.events;
};

export const signup = async (data: User) => {
	const response = await fetch('/api/auth/signup', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});
	if (!response.ok) throw new Error('Failed to sign up');
	return response.json();
};

export const signin = async (data: SignInForm) => {
	const response = await fetch('/api/auth/signin', {
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

		const response = await fetch('/api/events/online', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});

		const result = await response.json();

		if (!response.ok) {
			// Server returned an error status code
			throw new Error(result.message || 'Failed to create event');
		}

		return result;
	} catch (error) {
		console.error('Error in createOnlineEvent:', error);
		throw error; // Re-throw to be caught by component
	}
};

export const createVenueEvent = async (data: VenueEventForm) => {
	if (data.image) {
		const image = await convertToBase64(data.image);
		data.image = image as unknown as File;
	}
	const response = await fetch('/api/events/venue', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});
	if (!response.ok) throw new Error('Failed to create event');
	return response.json();
};

export const signout = async () => {
	const response = await fetch('/api/auth/signout', {
		method: 'POST',
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
	});
	if (!response.ok) throw new Error('Failed to sign out');
	return response.json();
};

export const getUserDetails = async () => {
	const response = await fetch('/api/auth/me');
	if (!response.ok) throw new Error('Failed to fetch user details');
	return response.json();
};

export const bookEvent = async (
	eventId: string,
	purchaseForm: PurchaseForm
) => {
	const response = await fetch(`/api/events/${eventId}/book`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(purchaseForm),
	});
	if (!response.ok) throw new Error('Failed to book event');
	return response.json();
};

export const fetchPurchase = async (id: string) => {
	const response = await fetch(`/api/purchase/${id}`);
	if (!response.ok) throw new Error('Failed to fetch purchase');
	return response.json();
};

export const initiatePayment = async (paymentData: PaymentData) => {
	const response = await fetch('/api/payment/initiate', {
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
	const response = await fetch('/api/auth/update-phone', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, phoneNumber }),
	});

	if (!response.ok) {
		throw new Error('Failed to update phone number');
	}

	return response.json();
};

export const clearRuntimeStore = async (model?: string) => {
	const body = model ? { model: model } : {};
	const response = await fetch('/api/runtime-store/clear', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	});
	if (!response.ok) throw new Error('Failed to clear runtime store');
	return response.json();
};

export const sendPhoneOTP = async (phoneNumber: string) => {
	const response = await fetch('/api/auth/send-otp', {
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
	const response = await fetch('/api/auth/verify-otp', {
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
(globalThis as any).clearRuntimeStore = clearRuntimeStore;