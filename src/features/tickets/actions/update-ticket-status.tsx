'use server'
import { prisma } from "@/lib/prisma"
import { TicketStatus } from "../types"
import { revalidatePath } from "next/cache"
import { ticketsPath } from "@/app/paths"
import { ActionStateStatus, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state"
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect"
import { isOwner } from "@/features/auth/utils/is-owner"


export const updateTicketStatus = async (id: string, status: TicketStatus) => {
    const { user } = await getAuthOrRedirect();
    
    try{
        if (id) {
            const ticket = await prisma.ticket.findUnique({
                where: {
                    id,
                },
            });

            if (!ticket || !isOwner(user, ticket)) {
                return toActionState(
                    "Not Authorized",
                    ActionStateStatus.ERROR
                );
            }
        }


        await prisma.ticket.update({
            where:{
                id,
            },
            data:{
                status
            }
        }) 
    }catch(error){
        return fromErrorToActionState(error);
    }

    revalidatePath(ticketsPath())   
    return toActionState("Status Updated", ActionStateStatus.SUCCESS);
}