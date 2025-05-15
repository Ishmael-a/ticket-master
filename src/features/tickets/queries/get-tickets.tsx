import { prisma } from "@/lib/prisma"
import { cache } from "react";
import { ParsedSearchParams } from "../search-input";
import { isOwner } from "@/features/auth/utils/is-owner";
import { getAuth } from "@/features/auth/actions/get-auth";

export const getTickets = cache(async (userId: string | undefined, searchParams: ParsedSearchParams) => {
  const { user } = await getAuth();
  
    const where = {
      userId: userId,
        title: {
          contains: searchParams.search,
          mode: "insensitive" as const,
        }
    }

    const take = searchParams.size;
    const skip = searchParams.page * searchParams.size;


    try {

        const [allTickets, count] = await prisma.$transaction([
          prisma.ticket.findMany({
            where,
            take,
            skip,
            orderBy: {
              [searchParams.sortKey]: searchParams.sortValue,
            },
            include: {
              user: {
                select: {
                  username: true,
                },
              },
            },
          }),
          prisma.ticket.count({
            where,
          }),
        ]);

        return {
          list: allTickets.map((ticket) => ({
            ...ticket,
            isOwner: isOwner(user, ticket)
          })),
          metadata: {
            count : count,
            hasNextPage: count > skip + take,
          }
        };
    }catch(error){
        console.error("Failed to fetch tickets:", error);
        return {
          list: [],
          metadata: {
            count: 0,
            hasNextPage: false,
          },
        };
    }
})