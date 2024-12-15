import connectDatabase from '@/lib/mongodb';
import Event from '@/models/Event';
import { NextResponse } from 'next/server';

// A simple GET handler to simulate adding a product reminder
export async function GET() {
	try {
		await connectDatabase();

		const events = (await Event.find()).filter((event) => event.status !== 'waitingForApproval');
		console.log(events);
		return NextResponse.json({ events: events.map((event) => {
			return {
				id: event._id,
				type: event.type,
				name: event.name,
				description: event.description,
				eventDate: event.eventDate,
				eventDuration: event.eventDuration,
				price: event.price,
				locale: event.locale,
				image: event.image,
				tags: event.tags,
				remaining: event.remaining,
				isFreeEvent: event.isFreeEvent
			}
		}) }, { status: 200 });

		// 	{
		// 		id: "1",
		// 		type: 'online',
		// 		title: 'A New Way Of Life',
		// 		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dolor justo, sodales mattis orci et, mattis faucibus est. Nulla semper consectetur sapien a tempor. Ut vel lacus lorem. Nulla mauris massa, pharetra a mi ut, mattis euismod libero. Ut pretium bibendum urna nec egestas. Etiam tempor vehicula libero. Aenean cursus venenatis orci, ac porttitor leo porta sit amet. Nulla eleifend mollis enim sed rutrum. Nunc cursus ex a ligula consequat aliquet. Donec semper tellus ac ante vestibulum, vitae varius leo mattis. In vestibulum blandit tempus. Etiam elit turpis, volutpat hendrerit varius ut, posuere a sapien. Maecenas molestie bibendum finibus. Nulla euismod neque vel sem hendrerit faucibus. Nam sit amet metus sollicitudin, luctus eros at, consectetur libero.\n In malesuada luctus libero sed gravida. Suspendisse nunc est, maximus vel viverra nec, suscipit non massa. Maecenas efficitur vestibulum pellentesque. Ut finibus ullamcorper congue. Sed ut libero sit amet lorem venenatis facilisis. Mauris egestas tortor vel massa auctor, eget gravida mauris cursus. Etiam elementum semper fermentum. Suspendisse potenti. Morbi lobortis leo urna, non laoreet enim ultricies id. Integer id felis nec sapien consectetur porttitor. Proin tempor mauris in odio iaculis semper. Cras ultricies nulla et dui viverra, eu convallis orci fermentum.",
		// 		dateTime: '2025-04-15T15:45:00',
		// 		duration: 1,
		// 		price: 'AUD $100.00',
		// 		image: 'img-1.png',
		// 		remaining: 0,
		// 		tags: ['arts', 'concert', 'workshops', 'volunteer', 'sports', 'health_Wellness'],
		// 		organizer: {
		// 			name: 'Story Tellers',
		// 			id: 1
		// 		}
		// 	},
		// 	{
		// 		id: "2",
		// 		type: 'online',
		// 		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dolor justo, sodales mattis orci et, mattis faucibus est. Nulla semper consectetur sapien a tempor. Ut vel lacus lorem. Nulla mauris massa, pharetra a mi ut, mattis euismod libero. Ut pretium bibendum urna nec egestas. Etiam tempor vehicula libero. Aenean cursus venenatis orci, ac porttitor leo porta sit amet. Nulla eleifend mollis enim sed rutrum. Nunc cursus ex a ligula consequat aliquet. Donec semper tellus ac ante vestibulum, vitae varius leo mattis. In vestibulum blandit tempus. Etiam elit turpis, volutpat hendrerit varius ut, posuere a sapien. Maecenas molestie bibendum finibus. Nulla euismod neque vel sem hendrerit faucibus. Nam sit amet metus sollicitudin, luctus eros at, consectetur libero.\n In malesuada luctus libero sed gravida. Suspendisse nunc est, maximus vel viverra nec, suscipit non massa. Maecenas efficitur vestibulum pellentesque. Ut finibus ullamcorper congue. Sed ut libero sit amet lorem venenatis facilisis. Mauris egestas tortor vel massa auctor, eget gravida mauris cursus. Etiam elementum semper fermentum. Suspendisse potenti. Morbi lobortis leo urna, non laoreet enim ultricies id. Integer id felis nec sapien consectetur porttitor. Proin tempor mauris in odio iaculis semper. Cras ultricies nulla et dui viverra, eu convallis orci fermentum.",
		// 		title: 'Earrings Workshop with Bronwyn David',
		// 		image: 'img-2.png',
		// 		dateTime: '2024-04-30T23:20:00',
		// 		duration: 2,
		// 		price: 'AUD $75.00',
		// 		remaining: 6,
		// 		tags: ['business', 'workshops', 'volunteer', 'sports', 'health_Wellness'],
		// 		organizer: {
		// 			name: 'Story Tellers',
		// 			id: 1
		// 		}
		// 	},
		// 	{
		// 		id: "3",
		// 		type: 'online',
		// 		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dolor justo, sodales mattis orci et, mattis faucibus est. Nulla semper consectetur sapien a tempor. Ut vel lacus lorem. Nulla mauris massa, pharetra a mi ut, mattis euismod libero. Ut pretium bibendum urna nec egestas. Etiam tempor vehicula libero. Aenean cursus venenatis orci, ac porttitor leo porta sit amet. Nulla eleifend mollis enim sed rutrum. Nunc cursus ex a ligula consequat aliquet. Donec semper tellus ac ante vestibulum, vitae varius leo mattis. In vestibulum blandit tempus. Etiam elit turpis, volutpat hendrerit varius ut, posuere a sapien. Maecenas molestie bibendum finibus. Nulla euismod neque vel sem hendrerit faucibus. Nam sit amet metus sollicitudin, luctus eros at, consectetur libero.\n In malesuada luctus libero sed gravida. Suspendisse nunc est, maximus vel viverra nec, suscipit non massa. Maecenas efficitur vestibulum pellentesque. Ut finibus ullamcorper congue. Sed ut libero sit amet lorem venenatis facilisis. Mauris egestas tortor vel massa auctor, eget gravida mauris cursus. Etiam elementum semper fermentum. Suspendisse potenti. Morbi lobortis leo urna, non laoreet enim ultricies id. Integer id felis nec sapien consectetur porttitor. Proin tempor mauris in odio iaculis semper. Cras ultricies nulla et dui viverra, eu convallis orci fermentum.",
		// 		title: 'Spring Showcase Saturday April 30th 2022 at 7pm',
		// 		image: 'img-3.png',
		// 		dateTime: '2024-05-01T19:30:00',
		// 		duration: 3,
		// 		price: 'Free',
		// 		remaining: 0,
		// 		tags: ['coaching_consulting', 'free', 'concert', 'volunteer', 'health_Wellness', 'bussiness'],
		// 		organizer: {
		// 			name: 'Story Tellers',
		// 			id: 1
		// 		}
		// 	},
		// 	{
		// 		id: "4",
		// 		type: 'online',
		// 		title: 'Shutter Life',
		// 		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dolor justo, sodales mattis orci et, mattis faucibus est. Nulla semper consectetur sapien a tempor. Ut vel lacus lorem. Nulla mauris massa, pharetra a mi ut, mattis euismod libero. Ut pretium bibendum urna nec egestas. Etiam tempor vehicula libero. Aenean cursus venenatis orci, ac porttitor leo porta sit amet. Nulla eleifend mollis enim sed rutrum. Nunc cursus ex a ligula consequat aliquet. Donec semper tellus ac ante vestibulum, vitae varius leo mattis. In vestibulum blandit tempus. Etiam elit turpis, volutpat hendrerit varius ut, posuere a sapien. Maecenas molestie bibendum finibus. Nulla euismod neque vel sem hendrerit faucibus. Nam sit amet metus sollicitudin, luctus eros at, consectetur libero.\n In malesuada luctus libero sed gravida. Suspendisse nunc est, maximus vel viverra nec, suscipit non massa. Maecenas efficitur vestibulum pellentesque. Ut finibus ullamcorper congue. Sed ut libero sit amet lorem venenatis facilisis. Mauris egestas tortor vel massa auctor, eget gravida mauris cursus. Etiam elementum semper fermentum. Suspendisse potenti. Morbi lobortis leo urna, non laoreet enim ultricies id. Integer id felis nec sapien consectetur porttitor. Proin tempor mauris in odio iaculis semper. Cras ultricies nulla et dui viverra, eu convallis orci fermentum.",
		// 		image: 'img-4.png',
		// 		dateTime: '2024-05-01T21:30:00',
		// 		duration: 1,
		// 		price: 'AUD $85.00',
		// 		remaining: 7,
		// 		tags: ['health_Wellness', 'concert', 'volunteer', 'sports', 'free', 'business'],
		// 		organizer: {
		// 			name: 'Story Tellers',
		// 			id: 1
		// 		}
		// 	},
		// 	{
		// 		id: "5",
		// 		type: 'offline',
		// 		title: 'Friday Night Dinner at The Old Station May 27 2022',
		// 		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dolor justo, sodales mattis orci et, mattis faucibus est. Nulla semper consectetur sapien a tempor. Ut vel lacus lorem. Nulla mauris massa, pharetra a mi ut, mattis euismod libero. Ut pretium bibendum urna nec egestas. Etiam tempor vehicula libero. Aenean cursus venenatis orci, ac porttitor leo porta sit amet. Nulla eleifend mollis enim sed rutrum. Nunc cursus ex a ligula consequat aliquet. Donec semper tellus ac ante vestibulum, vitae varius leo mattis. In vestibulum blandit tempus. Etiam elit turpis, volutpat hendrerit varius ut, posuere a sapien. Maecenas molestie bibendum finibus. Nulla euismod neque vel sem hendrerit faucibus. Nam sit amet metus sollicitudin, luctus eros at, consectetur libero.\n In malesuada luctus libero sed gravida. Suspendisse nunc est, maximus vel viverra nec, suscipit non massa. Maecenas efficitur vestibulum pellentesque. Ut finibus ullamcorper congue. Sed ut libero sit amet lorem venenatis facilisis. Mauris egestas tortor vel massa auctor, eget gravida mauris cursus. Etiam elementum semper fermentum. Suspendisse potenti. Morbi lobortis leo urna, non laoreet enim ultricies id. Integer id felis nec sapien consectetur porttitor. Proin tempor mauris in odio iaculis semper. Cras ultricies nulla et dui viverra, eu convallis orci fermentum.",
		// 		image: 'img-5.png',
		// 		dateTime: '2024-05-27T12:00:00',
		// 		duration: 5,
		// 		price: 'AUD $41.50',
		// 		remaining: 0,
		// 		venue: {
		// 			location: "00 Challis St, Newport, Victoria, 0000, Australia",
		// 			latitude: -37.7749,
		// 			longitude: 144.9633
		// 		},
		// 		tags: ["concert", "sports", "health_Wellness", "free", "arts"],
		// 		organizer: {
		// 			name: 'Story Tellers',
		// 			id: 1
		// 		}
		// 	},
		// 	{
		// 		id: "6",
		// 		type: 'offline',
		// 		title: 'Step Up Open Mic Show',
		// 		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dolor justo, sodales mattis orci et, mattis faucibus est. Nulla semper consectetur sapien a tempor. Ut vel lacus lorem. Nulla mauris massa, pharetra a mi ut, mattis euismod libero. Ut pretium bibendum urna nec egestas. Etiam tempor vehicula libero. Aenean cursus venenatis orci, ac porttitor leo porta sit amet. Nulla eleifend mollis enim sed rutrum. Nunc cursus ex a ligula consequat aliquet. Donec semper tellus ac ante vestibulum, vitae varius leo mattis. In vestibulum blandit tempus. Etiam elit turpis, volutpat hendrerit varius ut, posuere a sapien. Maecenas molestie bibendum finibus. Nulla euismod neque vel sem hendrerit faucibus. Nam sit amet metus sollicitudin, luctus eros at, consectetur libero.\n In malesuada luctus libero sed gravida. Suspendisse nunc est, maximus vel viverra nec, suscipit non massa. Maecenas efficitur vestibulum pellentesque. Ut finibus ullamcorper congue. Sed ut libero sit amet lorem venenatis facilisis. Mauris egestas tortor vel massa auctor, eget gravida mauris cursus. Etiam elementum semper fermentum. Suspendisse potenti. Morbi lobortis leo urna, non laoreet enim ultricies id. Integer id felis nec sapien consectetur porttitor. Proin tempor mauris in odio iaculis semper. Cras ultricies nulla et dui viverra, eu convallis orci fermentum.",
		// 		image: 'img-6.png',
		// 		dateTime: '2024-06-30T14:00:00',
		// 		duration: 1,
		// 		price: 'AUD $200.00',
		// 		remaining: 0,
		// 		venue: {
		// 			location: "00 Challis St, Newport, Victoria, 0000, Australia",
		// 			latitude: -37.7749,
		// 			longitude: 144.9633
		// 		},
		// 		tags: ['workshops', 'concert', 'arts', 'volunteer', 'sports'],
		// 		organizer: {
		// 			name: 'Story Tellers',
		// 			id: 1
		// 		}
		// 	},
		// 	{
		// 		id: "7",
		// 		type: 'offline',
		// 		title: 'Tutorial on Canvas Painting for Beginners',
		// 		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dolor justo, sodales mattis orci et, mattis faucibus est. Nulla semper consectetur sapien a tempor. Ut vel lacus lorem. Nulla mauris massa, pharetra a mi ut, mattis euismod libero. Ut pretium bibendum urna nec egestas. Etiam tempor vehicula libero. Aenean cursus venenatis orci, ac porttitor leo porta sit amet. Nulla eleifend mollis enim sed rutrum. Nunc cursus ex a ligula consequat aliquet. Donec semper tellus ac ante vestibulum, vitae varius leo mattis. In vestibulum blandit tempus. Etiam elit turpis, volutpat hendrerit varius ut, posuere a sapien. Maecenas molestie bibendum finibus. Nulla euismod neque vel sem hendrerit faucibus. Nam sit amet metus sollicitudin, luctus eros at, consectetur libero.\n In malesuada luctus libero sed gravida. Suspendisse nunc est, maximus vel viverra nec, suscipit non massa. Maecenas efficitur vestibulum pellentesque. Ut finibus ullamcorper congue. Sed ut libero sit amet lorem venenatis facilisis. Mauris egestas tortor vel massa auctor, eget gravida mauris cursus. Etiam elementum semper fermentum. Suspendisse potenti. Morbi lobortis leo urna, non laoreet enim ultricies id. Integer id felis nec sapien consectetur porttitor. Proin tempor mauris in odio iaculis semper. Cras ultricies nulla et dui viverra, eu convallis orci fermentum.",
		// 		image: 'img-7.png',
		// 		dateTime: '2024-07-17T15:30:00',
		// 		duration: 1,
		// 		price: 'AUD $50.00',
		// 		remaining: 17,
		// 		venue: {
		// 			location: "00 Challis St, Newport, Victoria, 0000, Australia",
		// 			latitude: -37.7749,
		// 			longitude: 144.9633
		// 		},
		// 		tags: ['volunteer', 'free', 'health_Wellness'],
		// 		organizer: {
		// 			name: 'Story Tellers',
		// 			id: 1
		// 		}
		// 	},
		// 	{
		// 		id: "8",
		// 		type: 'offline',
		// 		title: 'Trainee Program on Leadership&apos; 2022',
		// 		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dolor justo, sodales mattis orci et, mattis faucibus est. Nulla semper consectetur sapien a tempor. Ut vel lacus lorem. Nulla mauris massa, pharetra a mi ut, mattis euismod libero. Ut pretium bibendum urna nec egestas. Etiam tempor vehicula libero. Aenean cursus venenatis orci, ac porttitor leo porta sit amet. Nulla eleifend mollis enim sed rutrum. Nunc cursus ex a ligula consequat aliquet. Donec semper tellus ac ante vestibulum, vitae varius leo mattis. In vestibulum blandit tempus. Etiam elit turpis, volutpat hendrerit varius ut, posuere a sapien. Maecenas molestie bibendum finibus. Nulla euismod neque vel sem hendrerit faucibus. Nam sit amet metus sollicitudin, luctus eros at, consectetur libero.\n In malesuada luctus libero sed gravida. Suspendisse nunc est, maximus vel viverra nec, suscipit non massa. Maecenas efficitur vestibulum pellentesque. Ut finibus ullamcorper congue. Sed ut libero sit amet lorem venenatis facilisis. Mauris egestas tortor vel massa auctor, eget gravida mauris cursus. Etiam elementum semper fermentum. Suspendisse potenti. Morbi lobortis leo urna, non laoreet enim ultricies id. Integer id felis nec sapien consectetur porttitor. Proin tempor mauris in odio iaculis semper. Cras ultricies nulla et dui viverra, eu convallis orci fermentum.",
		// 		image: 'img-8.png',
		// 		dateTime: '2025-07-20T16:00:00',
		// 		duration: 1,
		// 		price: 'AUD $120.00',
		// 		remaining: 7,
		// 		venue: {
		// 			location: "00 Challis St, Newport, Victoria, 0000, Australia",
		// 			latitude: -37.7749,
		// 			longitude: 144.9633
		// 		},
		// 		tags: ['sports', 'concert', 'volunteer', 'arts'],
		// 		organizer: {
		// 			name: 'Story Tellers',
		// 			id: 1
		// 		}
		// 	},
		// ]

		// return NextResponse.json({ events }, { status: 200 });
	} catch (error) {
		console.error('Error:', error);
		return new Response(JSON.stringify({ error: 'Failed to fetch events' }), { status: 500 });
	}
}