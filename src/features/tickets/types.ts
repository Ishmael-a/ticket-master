import { LucideProps } from "lucide-react";
import { Prisma } from "generated/prisma";


export type StatusIconComponent = React.FC<LucideProps>;

export enum TicketStatus {
  DONE = "DONE",
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
}


export type TicketWithMetadata = Prisma.TicketGetPayload<{
    include: {
      user: {
        select: {
          username: true;
        }
      }
    }
  }> & { isOwner: boolean }
