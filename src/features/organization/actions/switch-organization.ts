'use server'

import { organizationsPath } from '@/app/paths'
import {
  ActionStateStatus,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { getAuthOrRedirect } from '@/features/auth/queries/get-auth-or-redirect'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { getOrganizationsByUser } from '../queries/get-organizations-by-user';

export const switchOrganization = async ( organizationId: string) => {
  const { user } = await getAuthOrRedirect({
    checkActiveOrganization: false,
  });

  try{
        const organizations = await getOrganizationsByUser()

        const canSwitch = organizations.some((organization) => organization.id === organizationId);

        if(!canSwitch){
            return toActionState("Not a member of this organization", ActionStateStatus.ERROR)
        }
        
        await prisma.membership.updateMany({
            where:{
                userId: user.id,
                organizationId: {
                    not: organizationId
                }
            },
            data: {
                isActive: false
            }
        })

        await prisma.membership.update({
            where: {
                membershipId: {
                    organizationId: organizationId,
                    userId: user.id,
                }
            },
            data: {
                isActive: true
            }
        });
    
    }catch(error){
        return fromErrorToActionState(error)
    }


    revalidatePath(organizationsPath())
    return toActionState("Active Organization Has Been Been Switched", ActionStateStatus.SUCCESS)
}

