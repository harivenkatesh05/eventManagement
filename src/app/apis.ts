function convertToBase64(file: File) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
}
  

export const fetchEvents = async () => {
	const response = await fetch('/api/events');
	if (!response.ok) throw new Error('Failed to fetch events');
	const data = await response.json();
	return data.events;
}

export const signup = async (data: User) => {
	const response = await fetch('/api/auth/signup', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});
	return response.json();
}

export const signin = async (data: SignInForm) => {
	const response = await fetch('/api/auth/signin', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});
	return response.json();
}

export const createOnlineEvent = async (data: OnlineEventForm) => {
	try {
		if(data.image) {
			const image = await convertToBase64(data.image);
			data.image = image as unknown as File;
		}
		
		const response = await fetch('/api/events/online', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json'},
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
	if(data.image) {
		const image = await convertToBase64(data.image);
		data.image = image as unknown as File;
	}
	const response = await fetch('/api/events/venue', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json'},
		body: JSON.stringify(data),
	});
	return response.json();
}

export const getUserDetails = async () => {
	const response = await fetch('/api/auth/me');
	return response.json();
};
