"use server";
// import { setCookie } from "@/actions/cookies";
import { setToastMessage } from "@/actions/toast";
import { ticketsPath } from "@/app/paths";
import { fromErrorToActionState } from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteTicket = async (ticketId: string) => {
  try {

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
