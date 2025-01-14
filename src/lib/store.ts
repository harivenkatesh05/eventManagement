import { EventDocument, OnlineDocument, UserDocument, VenueDocument } from "@/types/model";
import { Cache } from "./cache";
import connectDatabase from "./mongodb";
import User from "@/models/User";
import Event from "@/models/Event";
import OnlineEvent from "@/models/OnlineEvent";
import VenueEvent from "@/models/VenueEvent";

class Store{
	private cache: Cache

	constructor() {
		this.cache = new Cache()
	}

	async getUserByID(userId: string) {
		const cachedUser = this.cache.getUserByID(userId)
		if(cachedUser) {
			return cachedUser
		}

		await connectDatabase();
		const user = await User.findById(userId).select('-password') as UserDocument;
		this.cache.setUser(userId, user);
		return user
	}

	async isUserExistByEmail(mail: string) {
		const user = this.cache.getUserByEmail(mail)
		return user !== null
	}

	async createUser(user: UserDocument) {
		this.cache.setUser(user.id, user)
		await connectDatabase();
		const userSaved = await user.save()
		console.log("saved user", user.id);
		return userSaved.id
	}

	async createOnlineEvent(event: OnlineDocument) {
		this.cache.setOnlineEvent(event.id, event)
		await connectDatabase()
		const eventSaved = await event.save()
		console.log("saved online event", event.id);
		return eventSaved.id
	}

	async createVenueEvent(event: VenueDocument) {
		this.cache.setVenueEvent(event.id, event)
		await connectDatabase()
		const eventSaved = await event.save()
		console.log("saved venue event ", eventSaved.id)
		return eventSaved.id
	}

	async createEvent(event: EventDocument) {
		this.cache.setEvent(event.id, event)
		await connectDatabase()
		const eventSaved = await event.save()
		console.log("saved event ", eventSaved.id)
		return eventSaved.id
	}

	async saveOnlineEvent(event: OnlineDocument) {
		this.cache.setOnlineEvent(event.id, event)
		await connectDatabase()
		const eventSaved = await event.save()
		console.log("update online event", event.id);
		return eventSaved.id
	}

	async saveVenueEvent(event: VenueDocument) {
		this.cache.setVenueEvent(event.id, event)
		await connectDatabase()
		const eventSaved = await event.save()
		console.log("update venue event ", eventSaved.id)
		return eventSaved.id 
	}

	async getEvents() {
		let events = this.cache.getEvents()
		if(events.length === 0) {
			await connectDatabase();
			events = await Event.find({ status: { $ne: 'waitingForApproval' } });
			console.log("events from db - events");

			events.forEach(event => {
				if (event && typeof event === 'object' && '_id' in event) {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					this.cache.setEvent(event.id, event);
				}
			});
		}

		return events;
	}

	async getLinkedOnlineEvent(id: string) {
		let onlineEvent = this.cache.getOnlineEvent(id)
		if(!onlineEvent) {
			await connectDatabase()
			onlineEvent = await OnlineEvent.findById(id)
			if(!onlineEvent) {throw new Error("Linked online event not found")}
			console.log("online event from db ", id)

			this.cache.setOnlineEvent(id, onlineEvent)
		}

		return onlineEvent
	}

	async getLinkedVenueEvent(id: string) {
		let venueEvent = this.cache.getVenueEvent(id)
		if(!venueEvent) {
			await connectDatabase()
			venueEvent = await VenueEvent.findById(id)
			if(!venueEvent) {throw new Error("Linked Venue Event not found")}
			console.log("Venue event from db ", id)

			this.cache.setVenueEvent(id, venueEvent)
		}

		return venueEvent
	}

	async getLinkedEvent(id: string, type: string) {
		return type === "online" ? this.getLinkedOnlineEvent(id) : this.getLinkedVenueEvent(id)
	}

	async getEvent(id: string) {
		let event = this.cache.getEvent(id)
		if(!event) {
			await connectDatabase()
			event = await Event.findById(id)
			if(!event) {throw new Error("Event not found ")}
			console.log("event from db ", id)

			this.cache.setEvent(event.id, event)
		}

		return event
	}

	clear() {
		this.cache = new Cache()
	}

}

export const store = new Store();
