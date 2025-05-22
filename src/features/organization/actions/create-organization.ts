'use server'

import { fromErrorToActionState, ActionState } from '@/components/form/utils/to-action-state';
import { prisma } from "@/lib/prisma";
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { ticketsPath } from '@/app/paths';
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect';
import { setToastMessage } from '@/actions/toast';

const signupSchema = z.object({
    name: z
        .string()
        .min(1, "Organization Name is required")
        .max(191, "Organization Name is too long")
})


export const createOrganization = async (
  _actionState: ActionState,
  formData: FormData
) => {

    const { user } = await getAuthOrRedirect({
      checkOrganization: false,
      checkActiveOrganization: false,
    });

  try {
    const data = signupSchema.parse({
      name: formData.get("name"),
    });


    const organization = await prisma.organization.create({
      data: {
        ...data,
        memberships: {
            create: {
                userId: user.id,
                isActive: true
            }
        }
      },
    });

    await prisma.membership.updateMany({
        where:{
            userId: user.id,
            organizationId: {
                not: organization.id
            }
        },
        data: {
            isActive: false
        }
    })

  } catch (error) {
    return fromErrorToActionState(error);
  }

  await setToastMessage("Organization Created")
  redirect(ticketsPath());
};