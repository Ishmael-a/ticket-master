import { getTicket } from "@/features/tickets/queries/get-ticket";


export async function GET(request: Request, { params }: { params: Promise<{ ticketId: string }> }){
    const awaitedParams = await params;
    const ticket = await getTicket(awaitedParams.ticketId)

    return Response.json(ticket)
}