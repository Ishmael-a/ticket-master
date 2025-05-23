import { getTickets } from "@/features/tickets/queries/get-tickets";
import { searchParamsCache } from "@/features/tickets/search-input";


export async function GET(request : Request){
    const { searchParams } = new URL(request.url);

    const untypedSearchParams = Object.fromEntries(searchParams);

    const typedSearchParams = searchParamsCache.parse(untypedSearchParams);

    const { list, metadata } = await getTickets( undefined, typedSearchParams)

    return Response.json({ list, metadata })
}