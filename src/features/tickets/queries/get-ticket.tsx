import { prisma } from "@/lib/prisma";
import { isOwner } from "@/features/auth/utils/is-owner";
import { getAuth } from "@/features/auth/actions/get-auth";

// you can use cache from react to wrap around getTicket so the result per id is cached and multiple requests are prevented

export const getTicket = async (ticketId: string) => {
    const { user } = await getAuth();
    
    try {
        const ticket = await prisma.ticket.findUnique({
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

        if(!ticket) {
            return null;
        }
        
        return {
            ...ticket,
            isOwner: isOwner(user, ticket)
        }

    }catch(error){

        console.error("Failed to fetch ticket:", error);
        return null;
    }

}