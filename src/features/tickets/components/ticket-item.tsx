
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import Link from "next/link";
import { ticketPath, ticketEditPath } from "@/app/paths";
import { TICKET_ICONS } from "../constants";
import { LucideMoreVertical, LucidePencil, LucideSquareArrowOutUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Ticket } from "../../../../generated/prisma";
import { toCurrencyFromCent } from "@/utils/currency";
import { TicketMoreMenu } from "./ticket-more-menu";


interface TicketItemProps {
  ticket: Ticket;
  isDetail?: boolean;
}

const TicketItem: React.FC<TicketItemProps> = ({ ticket, isDetail }) => {
    const StatusIcon = TICKET_ICONS[ticket.status];
    const detailButton = (
      <Button variant={"outline"} asChild >
        <Link
          prefetch
          href={ticketPath(ticket.id)}
          className=" hover:text-primary transition-colors"
          aria-label={`View details for ticket ${ticket.title}`}
        >
          <LucideSquareArrowOutUpRight className="h-4 w-4" />
        </Link>
      </Button>
    );

    const editButton = (
      <Button variant={"outline"} asChild >
        <Link
          prefetch
          href={ticketEditPath(ticket.id)}
          className=" hover:text-primary transition-colors"
          aria-label={`Edit ticket ${ticket.title}`}
        >
          <LucidePencil className="h-4 w-4" />
        </Link>
      </Button>
    );

    const moreMenu = (
      <TicketMoreMenu ticket={ticket} trigger={       
        <Button variant={"outline"} size={"icon"} className="w-full">
          <LucideMoreVertical />
        </Button>
      }/>
    )

  return (
    <div
      className={clsx("w-full flex gap-x-1", {
        "max-w-[500px]": isDetail,
        "max-w-[420px]": !isDetail,
      })}
    >
      <Card className="w-full" key={ticket.id}>
        <CardHeader>
          <CardTitle className="flex gap-x-2 items-center">
            <StatusIcon size={20} />
            <span className=" truncate">{ticket.title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span
            className={clsx(" whitespace-break-spaces text-muted-foreground", {
              "line-clamp-2": !isDetail,
            })}
          >
            {ticket.content}
          </span>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">{ticket.deadline}</p>
          <p className="text-sm text-muted-foreground">
            {toCurrencyFromCent(ticket.bounty)}
          </p>
        </CardFooter>
      </Card>
      <div className="flex flex-col gap-y-1">
        {isDetail ? (
          <>
            {editButton}
            {moreMenu}
          </>
        ) : (
          <>
            {detailButton}
            {editButton}
          </>
        )}
      </div>
    </div>
  );
};

export { TicketItem };
