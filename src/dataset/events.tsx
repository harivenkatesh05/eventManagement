export interface Event {
	id: string | number;
	title: string;
	dateTime: string;
	duration: number;
	price: string;
	image: string;
	remaining: number;
	tags: string[];
	type: string;
}

export const events: Event[] = [
    {
        id: 1,
        type: 'online',
        title: 'A New Way Of Life',
        dateTime: '2024-04-15T15:45:00',
        duration: 1,
        price: 'AUD $100.00',
        image: 'img-1.png',
        remaining: 0,
        tags: ['arts', 'concert', 'workshops', 'volunteer', 'sports', 'health_Wellness'],
    },
    {
        id: 2,
        type: 'online',
        title: 'Earrings Workshop with Bronwyn David',
        image: 'img-2.png',
        dateTime: '2024-04-30T23:20:00',
        duration: 2,
        price: 'AUD $75.00',
        remaining: 6,
        tags: ['business', 'workshops', 'volunteer', 'sports', 'health_Wellness'],
    },
    {
        id: 3,
        type: 'online',
        title: 'Spring Showcase Saturday April 30th 2022 at 7pm',
        image: 'img-3.png',
        dateTime: '2024-05-01T19:30:00',
        duration: 3,
        price: 'Free',
        remaining: 0,
        tags: ['coaching_consulting', 'free', 'concert', 'volunteer', 'health_Wellness', 'bussiness'],
    },
    {
        id: 4,
        type: 'online',
        title: 'Shutter Life',
        image: 'img-4.png',
        dateTime: '2024-05-01T21:30:00',
        duration: 1,
        price: 'AUD $85.00',
        remaining: 7,
        tags: ['health_Wellness', 'concert', 'volunteer', 'sports', 'free', 'business'],
    },
    {
        id: 5,
        type: 'offline',
        title: 'Friday Night Dinner at The Old Station May 27 2022',
        image: 'img-5.png',
        dateTime: '2024-05-27T12:00:00',
        duration: 5,
        price: 'AUD $41.50',
        remaining: 0,
        tags: ["concert", "sports", "health_Wellness", "free", "arts"]
    },
    {
        id: 6,
        type: 'offline',
        title: 'Step Up Open Mic Show',
        image: 'img-6.png',
        dateTime: '2024-06-30T14:00:00',
        duration: 1,
        price: 'AUD $200.00',
        remaining: 0,
        tags: ['workshops', 'concert', 'arts', 'volunteer', 'sports'],
    },
    {
        id: 7,
        type: 'offline',
        title: 'Tutorial on Canvas Painting for Beginners',
        image: 'img-7.png',
        dateTime: '2024-07-17T15:30:00',
        duration: 1,
        price: 'AUD $50.00',
        remaining: 17,
        tags: ['volunteer', 'free', 'health_Wellness'],
    },
    {
        id: 8,
        type: 'offline',
        title: 'Trainee Program on Leadership&apos; 2022',
        image: 'img-8.png',
        dateTime: '2024-07-20T16:00:00',
        duration: 1,
        price: 'AUD $120.00',
        remaining: 7,
        tags: ['sports', 'concert', 'volunteer', 'arts'],
    },
]