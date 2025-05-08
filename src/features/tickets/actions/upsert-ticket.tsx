"use server";
import { setToastMessage } from "@/actions/toast";
import { ticketsPath, ticketPath } from "@/app/paths";
import {
  fromErrorToActionState,
  ActionState,
  ActionStateStatus,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";
import { toCent } from "@/utils/currency";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod"

const upsertTicketSchema = z.object({
  title: z.string().min(1, "Title is required").max(191, "Title is too long"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(1024, "Content is too long"),
  deadline: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Deadline must be in YYYY-MM-DD format"),
  bounty: z.coerce
    .number()
    .nonnegative("Bounty must be a positive number or zero"),
});

export const upsertTicket = async (
    id: string | undefined, 
    _actionState: ActionState ,
    formData: FormData) => {

        const { user } = await getAuthOrRedirect();


    try{

        if(id){
            const ticket = await prisma.ticket.findUnique({
                where: {
                    id
                }
            })

            if(!ticket || !isOwner(user, ticket)){
                return toActionState("Not Authorized",ActionStateStatus.ERROR)
            }
        }

        const data = upsertTicketSchema.parse({
            title: formData.get("title"),
            content: formData.get("content"),
            deadline: formData.get("deadline"),
            bounty: formData.get("bounty"),
        });


        const dbData = {
            ...data,
            userId: user.id,
            bounty: toCent(data.bounty),
        }


        await prisma.ticket.upsert({
            where: {
                id: id || "",
            },
            update: dbData,
            create: dbData,
        });
    }catch(error){
        return fromErrorToActionState(error, formData)

    }
    
    revalidatePath(ticketsPath());

    if(id){
        await setToastMessage("Ticket Updated")
        redirect(ticketPath(id));
    }

    return toActionState("Ticket Created", ActionStateStatus.SUCCESS);
}
