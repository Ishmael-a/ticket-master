import { prisma } from "@/lib/prisma"


export const getComments = (ticketId: string) => {


    return prisma.comment.findMany({
        where: {
            ticketId: ticketId
        },
        include: {
            user: {
                select: {
                    username: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
}