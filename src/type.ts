export type Ticket = {
    id: string
    ticketName: string
    isTicketLimitEnabled: boolean
    ticketLimit: number
    isTicketLimitPerUserEnabled: boolean
    isTicketEnabled: boolean
    ticketLimitPerUser: number
    ticketPrice: number
    isTicketDiscountEnabled: boolean
    discountPrice: number
    discountEndDateTime: string
    discountType: string
}

export type TicketForm = Omit<Ticket, 'id' | 'isTicketEnabled'> & {id?: string}