import React from 'react'
import { TicketItem } from "@/features/tickets/components/ticket-item";
import { getTickets } from '../queries/get-tickets';
import { ParsedSearchParams } from '../search-input';
import { NotFound } from '@/components/not-found';
import TicketSearchInput from './ticket-search-input';
import TicketSortSelect from './ticket-sort-select';

interface TicketListProps{
    userId?: string;
    searchParams: ParsedSearchParams
}


const TicketList = async ({ userId, searchParams }: TicketListProps) => {

    const tickets = await getTickets(userId, searchParams);


  return (
    <div
        className="flex flex-col gap-y-8 items-center animate-fade-in-from-top"
        aria-label="Ticket List"
    >
        <div className='flex w-full max-w-[420px] gap-x-2'>
            <TicketSearchInput placeholder='Search tickets...' />
            <TicketSortSelect 
                options={[
                    {label: "Newest", sortKey: "createdAt", sortValue: "desc"},
                    {label: "Oldest", sortKey: "createdAt", sortValue: "asc"},
                    {label: "Bounty", sortKey: "bounty", sortValue:"desc"},
                    {label: "Title", sortKey: "title", sortValue:"desc"}
                ]}
            />
        </div>
        {tickets.length === 0 ? (
            <NotFound label='No tickets found'/>
        ) : (
            <>
                {tickets.map((ticket) => (
                    <TicketItem key={ticket.id} ticket={ticket} />
                ))}
            </>
        )}
    </div>
  )
}

export default TicketList
