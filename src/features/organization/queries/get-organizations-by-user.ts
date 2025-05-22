import { prisma } from "@/lib/prisma"
import { cache } from "react";
import { getAuth } from "@/features/auth/actions/get-auth";

export const getOrganizationsByUser = cache(async () => {
  const { user } = await getAuth();

  if(!user) return []


    try {

          const organizations = await prisma.organization.findMany({
            where: {
                memberships: {
                    some: {
                        userId: user.id
                    }
                },
            },
            include: {
              memberships: {
                where: {
                    userId: user.id
                }
              },
              _count: {
                select: {
                    memberships: true
                }
              }
            },
          })

        return organizations.map(({ memberships, ...organization }) => ({
            ...organization,
            membershipByUser: memberships[0]
        }));

    }catch(error){
        console.error("Failed to fetch organizations:", error);
        return [];
    }
})