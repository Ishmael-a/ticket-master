"use server";
// import { setCookie } from "@/actions/cookies";
import { setToastMessage } from "@/actions/toast";
import { ticketsPath } from "@/app/paths";
import { ActionStateStatus, fromErrorToActionState, toActionState } from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { isOwner } from "@/features/auth/utils/is-owner";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteTicket = async (ticketId: string) => {
    const { user } = await getAuthOrRedirect();
  
  try {
    if (ticketId) {
      const ticket = await prisma.ticket.findUnique({
        where: {
          id: ticketId,
        },
      });

      if (!ticket || !isOwner(user, ticket)) {
        return toActionState("Not Authorized", ActionStateStatus.ERROR);
      }
    }

    await prisma.ticket.delete({
      where: { 
        id: ticketId
      },
    });

  } catch (error) {

    return fromErrorToActionState(error);

  }
  
  // On Demand Caching(ISR)
  revalidatePath(ticketsPath())

  await setToastMessage("Ticket Deleted")
  redirect(ticketsPath())
  
  // return toActionState("Ticket Deleted", ActionStateStatus.SUCCESS);
};
