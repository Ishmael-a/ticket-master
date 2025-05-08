import { prisma } from "@/lib/prisma"
import { cache } from "react";

export const getTickets = cache(async (userId: string | undefined) => {
    try {
        const allTickets = await prisma.ticket.findMany({
          where: {
            userId: userId
          },
          orderBy: {
            createdAt: "desc",
          },
          include: {
            user: {
              select: {
                username: true
              }
            }
          },
        });

        return allTickets;
    }catch(error){
        console.error("Failed to fetch tickets:", error);
        return [];
    }
})