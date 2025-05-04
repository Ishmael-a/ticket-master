import { CardCompact } from '@/components/card-compact'
import { TicketUpsertForm } from '@/features/tickets/components/ticket-upsert-form';
import { getTicket } from '@/features/tickets/queries/get-ticket';
import { notFound } from 'next/navigation';
import React from 'react'


type Params = Promise<{ ticketId: string }>;


const TicketEditPage = async ({ params }: { params: Params }) => {
    const { ticketId } = await params;
    const ticket = await getTicket(ticketId);

    if(!ticket){
        notFound()
    }

  return (
    <div className='flex-1 flex flex-col items-center justify-center'>
      <CardCompact
        title="Edit Ticket"
        description="Edit an existing ticket"
        className="w-full max-w-[420px] animate-fade-in-from-top"
        content={<TicketUpsertForm ticket={ticket} />}
      />
    </div>
  );
};

export default TicketEditPage
