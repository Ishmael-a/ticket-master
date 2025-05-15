'use server'

import { prisma } from "@/lib/prisma"
import { isOwner } from "@/features/auth/utils/is-owner";
import { getAuth } from "@/features/auth/actions/get-auth";

export const getComments = async (ticketId: string, cursor?: string) => {
    const { user } = await getAuth();

    const where = {
            ticketId: ticketId,
            id: {
                lt: cursor
            }
            // createdAt: {
            //     lt: cursor ? new Date(cursor) : undefined,
            // }
        };

    const take = 2;
    // const skip = offset ?? 0;

    try{
        // eslint-disable-next-line prefer-const
        let [comments, count] = await prisma.$transaction([
            prisma.comment.findMany({
                where,
                take: take + 1,
                // skip,
                include: {
                    user: {
                        select: {
                            username: true
                        }
                    }
                },
                orderBy: [{
                    createdAt: 'desc'
                },{
                    id: "desc"
                }]
            }),
            prisma.comment.count({
                where,
            })
        ])

        const hasNextPage = comments.length > take;
        comments = hasNextPage ? comments.slice(0, -1) : comments;


        return {
            list: comments.map((comment) => ({
                    ...comment,
                    isOwner: isOwner(user, comment)
                })),
            metadata: {
                count : count,
                hasNextPage: hasNextPage,
                cursor: comments.at(-1)?.id,
            }
        }
    }catch(error){
        console.error("Failed to fetch comments:", error);
        return {
          list: [],
          metadata: {
            count: 0,
            hasNextPage: false,
          },
        };
    }
}