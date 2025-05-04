import { prisma } from "@/lib/prisma"
import { Ticket } from "generated/prisma";
import { cache } from "react";

export const getTickets = cache(async () => {
    try {
        const allTickets: Ticket[] = await prisma.ticket.findMany({
          orderBy: {
            createdAt: "desc",
          },
        });

        return allTickets;
    }catch(error){
        console.error("Failed to fetch tickets:", error);
        return [];
    }
})