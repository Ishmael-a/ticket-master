'use server'

import { ticketPath } from "@/app/paths";
import { ActionStateStatus, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteComment = async (id: string) => {
    const { user } = await getAuthOrRedirect();

    const comment = await prisma.comment.findUnique({
        where: {
            id,
        }
    })

    if(!comment || !isOwner(user, comment)){
        return toActionState("Not Authorized", ActionStateStatus.ERROR);
    }

    try{

        await prisma.comment.delete({
            where: {
                id
            }
        })

    }catch(error){

        fromErrorToActionState(error)

    }
    
    revalidatePath(ticketPath(comment.ticketId))
    return toActionState("Comment Deleted", ActionStateStatus.SUCCESS);

}