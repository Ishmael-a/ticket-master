import React from 'react'
import { TicketItem } from "@/features/tickets/components/ticket-item";
import { getTickets } from '../queries/get-tickets';

interface TicketListProps{
    userId?: string;
}


const TicketList = async ({ userId }: TicketListProps) => {

    const tickets = await getTickets(userId);


  return (
    <>
        {tickets.length === 0 ? (
            <div className="text-center text-muted-foreground">
            No tickets found
            </div>
        ) : (
            <div
            className="flex flex-col gap-y-8 items-center animate-fade-in-from-top"
            aria-label="Ticket List"
            >
            {tickets.map((ticket) => (
                <TicketItem key={ticket.id} ticket={ticket} />
                ))}
            </div>
        )}
    </>
  )
}

export default TicketList
