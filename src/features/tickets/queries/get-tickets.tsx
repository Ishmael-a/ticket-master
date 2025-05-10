import { prisma } from "@/lib/prisma"
import { cache } from "react";
import { ParsedSearchParams } from "../search-input";


export const getTickets = cache(async (userId: string | undefined, searchParams: ParsedSearchParams) => {
    try {
        const allTickets = await prisma.ticket.findMany({
          where: {
            userId: userId,
              title: {
                contains: searchParams.search,
                mode: "insensitive",
              }
          },
          orderBy: {
            // // createdAt: "desc",
            // ...(searchParams.sort === "newest" && { createdAt : "desc" }),
            // ...(searchParams.sort === "bounty" && { bounty : "desc" }),
            [searchParams.sortKey]:  searchParams.sortValue,
          },
          include: {
            user: {
              select: {
                username: true
              }
            }
          },
        });

        return allTickets;
    }catch(error){
        console.error("Failed to fetch tickets:", error);
        return [];
    }
})