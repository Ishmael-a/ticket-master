import { prisma } from "@/lib/prisma";

// you can use cache from react to wrap around getTicket so the result per id is cached and multiple requests are prevented

export const getTicket = async (ticketId: string) => {
    try {
        return await prisma.ticket.findUnique({
            where: {
                id: ticketId,
            },
            include: {
                user: {
                    select: {
                        username: true
                    }
                }
            }
        })
    }catch(error){
        console.error("Failed to fetch ticket:", error);
        return null;
    }
}