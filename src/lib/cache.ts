import { UserDocument, VenueDocument, EventDocument, OnlineDocument } from "@/types/model"

export class Cache{
	private userStore: Map<string, UserDocument>
	private eventStore: Map<string, EventDocument>
	private venueEvents: Map<string, VenueDocument>
	private onlineEvents: Map<string, OnlineDocument>
	
	constructor() {
		this.userStore = new Map()
		this.eventStore = new Map()
		this.venueEvents = new Map()
		this.onlineEvents = new Map()
	}

	getUserByID(userId: string) {
		if(this.userStore.has(userId)) {
			return this.userStore.get(userId)
		}
		return null
	}

	getUserByEmail(mail: string) {
		for(const user of this.userStore.values()) {
			if(user.email === mail) {
				return user
			} 
		}
		
		return null
	}

	setUser(id: string, user: UserDocument) {
		this.userStore.set(id, user)
	}

	setEvent(id: string, event: EventDocument) {
		this.eventStore.set(id, event)
	}

	setOnlineEvent(id: string, event: OnlineDocument) {
		this.onlineEvents.set(id, event)
	}

	setVenueEvent(id: string, event: VenueDocument) {
		this.venueEvents.set(id, event)
	}

	getEvents() {
		return Array.from(this.eventStore.values())
	}

	getEvent(id: string) {
		return this.eventStore.get(id) ?? null
	}

	getVenueEvent(id: string) {
		return this.venueEvents.get(id) ?? null
	}

	getOnlineEvent(id: string) {
		return this.onlineEvents.get(id) ?? null
	}
}