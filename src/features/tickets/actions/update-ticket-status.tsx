'use server'
import { prisma } from "@/lib/prisma"
import { TicketStatus } from "../types"
import { revalidatePath } from "next/cache"
import { ticketsPath } from "@/app/paths"
import { ActionStateStatus, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state"


export const updateTicketStatus = async (id: string, status: TicketStatus) => {

    try{
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