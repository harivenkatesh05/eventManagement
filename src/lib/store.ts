import { EventDocument, OnlineDocument, UserDocument, VenueDocument } from "@/types/model";
// import { Cache } from "./cache";
import connectDatabase from "./mongodb";
import User from "@/models/User";
import Event from "@/models/Event";
import OnlineEvent from "@/models/OnlineEvent";
import VenueEvent from "@/models/VenueEvent";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv()

  
class Store{
	// private cache: Cache

	// constructor() {
		// this.cache = new Cache()
		// redis.hset("userMap", {})
		// redis.hset("eventMap", {})
		// redis.hset("venueMap", {})
		// redis.hset("onlineMap", {})
	// }

	async getUserByID(userId: string) {
		// const cachedUser = this.cache.getUserByID(userId)
		// if(cachedUser) {
		// 	return cachedUser
		// }
		const redisUser = await redis.hget("user:map", userId)
		if(redisUser) {
			console.log("user from redis", userId)
			return redisUser as UserDocument;
		}

		await connectDatabase();
		const user = await User.findById(userId) as UserDocument;
		console.log("user from db", userId)
		// this.cache.setUser(userId, user);
		if(!user) {throw new Error("User not found")}
		redis.hset("user:map", {[userId]: user})
		
		return user as UserDocument
	}

	async getUserByEmail(userEmail: string) {
		const redisUser = await redis.hgetall("user:map")
		if(redisUser) {
			for(const [userId, user] of Object.entries(redisUser)) {
				if(!user) {
					await connectDatabase();
					const user = await User.findById(userId) as UserDocument;
					if(!user) {
						redis.hdel("user:map", userId)
					}
					redis.hset("user:map", {[userId]: user})
				}
				else if((user as UserDocument).email === userEmail) {
					console.log("user from redis", userEmail)
					return user as UserDocument
				}
			}
		}

		await connectDatabase();
		const user = await User.findOne({ email: userEmail }) as UserDocument;
		if(!user) {return null}
		console.log("user from db ", user.id)
		// this.cache.setUser(userId, user);
		redis.hset("user:map", {[user.id]: user})
		return user as UserDocument
	}

	// async isUserExistByEmail(mail: string) {
	// 	const user = this.cache.getUserByEmail(mail)
	// 	return user !== null
	// }

	async createUser(user: UserDocument) {
		// this.cache.setUser(user.id, user)
		
		await connectDatabase();
		const userSaved = await user.save()
		console.log("saved user", user.id);

		await redis.hset("user:map", {[user.id]: user})
		return userSaved.id
	}

	async createOnlineEvent(event: OnlineDocument) {
		// this.cache.setOnlineEvent(event.id, event)
		
		await connectDatabase()
		const eventSaved = await event.save()
		console.log("saved online event", event.id);

		// await redis.hset("onlineEvent:map", {[event.id]: event})
		return eventSaved.id
	}

	async createVenueEvent(event: VenueDocument) {
		// this.cache.setVenueEvent(event.id, event)
		
		await connectDatabase()
		const eventSaved = await event.save()
		console.log("saved venue event ", eventSaved.id)

		// await redis.hset("venueEvent:map", {[event.id]: event})
		return eventSaved.id
	}

	async createEvent(event: EventDocument) {
		// this.cache.setEvent(event.id, event)
		
		await connectDatabase()
		const eventSaved = await event.save()
		console.log("saved event ", eventSaved.id)

		// await redis.hset("event:map", {[event.id]: event})
		return eventSaved.id
	}

	async saveUser(user: UserDocument) {
		// this.cache.setOnlineEvent(event.id, event)
		await connectDatabase()
		
		const userSaved = await User.findOneAndUpdate(
			{ id: user.id },
			user,
			{ new: true }
		);
		console.log("update user", userSaved.id);

		if(!userSaved) {throw new Error("User not found")}
		await redis.hset("user:map", {[userSaved.id]: userSaved})
		return userSaved.id
	}

	async saveOnlineEvent(event: OnlineDocument) {
		// this.cache.setOnlineEvent(event.id, event)
		await connectDatabase()
		const eventSaved = await event.save()
		console.log("update online event", event.id);

		await redis.hset("onlineEvent:map", {[event.id]: event})
		return eventSaved.id
	}

	async saveVenueEvent(event: VenueDocument) {
		// this.cache.setVenueEvent(event.id, event)
		await connectDatabase()
		const eventSaved = await event.save()
		console.log("update venue event ", eventSaved.id)

		await redis.hset("venueEvent:map", {[event.id]: event})
		return eventSaved.id 
	}

	async getEvents() {
		const eventMap = await redis.hgetall("event:map") as {[x: string]: EventDocument}
		let events: EventDocument[] = eventMap ? Object.values(eventMap) : []
		
		if(events.length === 0) {
			await connectDatabase();
			events = await Event.find({ status: { $ne: 'waitingForApproval' } }) as EventDocument[];
			console.log("events from db - events");
			
			for (const event of events) {
				await redis.hset("event:map", {[event.id]: event})
			}
		}

		return events as EventDocument[];
	}

	async getLinkedOnlineEvent(id: string) {
		// let onlineEvent = this.cache.getOnlineEvent(id)
		let onlineEvent = await redis.hget("onlineEvent:map", id);
		if(!onlineEvent) {
			await connectDatabase()
			onlineEvent = await OnlineEvent.findById(id)
			if(!onlineEvent) {throw new Error("Linked online event not found")}
			console.log("online event from db ", id)

			// this.cache.setOnlineEvent(id, onlineEvent)
			await redis.hset("onlineEvent:map", {[id]: onlineEvent})
		}

		return onlineEvent as OnlineDocument
	}

	async getLinkedVenueEvent(id: string) {
		// let venueEvent = this.cache.getVenueEvent(id)
		let venueEvent = await redis.hget("venueEvent:map", id);
		if(!venueEvent) {
			await connectDatabase()
			venueEvent = await VenueEvent.findById(id)
			if(!venueEvent) {throw new Error("Linked Venue Event not found")}
			console.log("Venue event from db ", id)

			// this.cache.setVenueEvent(id, venueEvent)
			await redis.hset("venueEvent:map", {[id]: venueEvent})
		}

		return venueEvent as VenueDocument
	}

	async getLinkedEvent(id: string, type: string) {
		return type === "online" ? this.getLinkedOnlineEvent(id) : this.getLinkedVenueEvent(id)
	}

	async getEvent(id: string) {
		// let event = this.cache.getEvent(id)
		let event = await redis.hget("event:map", id);
		if(!event) {
			await connectDatabase()
			event = await Event.findById(id)
			if(!event) {throw new Error("Event not found ")}
			console.log("event from db ", id)

			// this.cache.setEvent(event.id, event)
			await redis.hset("event:map", {[id]: event})
		}

		return event as EventDocument
	}

	clear() {
		// this.cache = new Cache()
		redis.flushall()
	}

}

export const store = new Store();
