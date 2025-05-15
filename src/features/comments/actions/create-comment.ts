'use server'

import { ticketPath } from "@/app/paths";
import { ActionState, ActionStateStatus, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod"


const createCommentSchema = z.object({
  content: z
    .string()
    .min(1, "Content is required")
    .max(1024, "Content is too long"),
}) 

export const createComment = async (
  ticketId: string,
  actionState: ActionState,
  formData: FormData,
) => {
  const { user } = await getAuthOrRedirect();

    let comment;

    try {
        const data = createCommentSchema.parse(Object.fromEntries(formData))

        comment = await prisma.comment.create({
            data: {
                userId: user.id,
                ticketId: ticketId,
                ...data
            },
            include: {
              user: {
                  select: {
                      username: true
                  }
              }
            }
        })

    } catch (error) {
        
        return fromErrorToActionState(error);
    }

    revalidatePath(ticketPath(ticketId));
    return toActionState("Comment Created", ActionStateStatus.SUCCESS, undefined, { ...comment, isOwner: true});
};