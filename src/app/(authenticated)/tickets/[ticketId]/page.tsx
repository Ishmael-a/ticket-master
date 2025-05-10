import { homePath } from "@/app/paths";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { TicketItem } from "@/features/tickets/components/ticket-item";
import { getTicket } from "@/features/tickets/queries/get-ticket";
import { notFound } from "next/navigation";

// interface ticketPageProps {
//   params: {
//     ticketId: string;
//   };
// }

type Params = Promise<{ ticketId: string }>

 export default async function Ticketpage({ params }: { params: Params }) {
   const { ticketId } = await params;
   const ticket = await getTicket(ticketId);

   if (!ticket) {
     return notFound();
   }

   return (
    <div className="flex-1 flex flex-col gap-y-4">
      <Breadcrumbs breadcrumbs={[
        { title:"Tickets" , href: homePath() },
        { title:ticket.title }
      ]} />

      <Separator />

     <div className="flex justify-center animate-fade-in-from-top">
       <TicketItem ticket={ticket} isDetail />
     </div>
    </div>
   );
 };


// the TicketPage is made a dynamic page by default since it uses dynamic params i.e the params
// however if you want to make it a static rout you'd have to generate static pages for all the params (i.e in this case the ticketId)
// that way you also have to note that the pages become cached and you'd have to do a lot of revalidations to incrementally update them when needed
// the below shows how to implement SSG

// export async function generateStaticParams(){
//   const tickets = await getTickets();

//   tickets.map((ticket) => ({
//     ticketId: ticket.id
//   }));
// }

