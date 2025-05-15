'use client' 

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
import { toCurrencyFromCent } from "@/utils/currency";
import { TicketMoreMenu } from "./ticket-more-menu";
import { TicketWithMetadata } from "../types";


interface TicketItemProps {
  ticket: TicketWithMetadata;
  isDetail?: boolean;
  comments?: React.ReactNode;
}

const TicketItem: React.FC<TicketItemProps> = ({ ticket, isDetail, comments }) => {
    // const { user } = await getAuth();
    // const isTicketOwner = isOwner(user, ticket);
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

    const editButton = ticket.isOwner ?(
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
    ) : null;

    const moreMenu = ticket.isOwner ? (
      <TicketMoreMenu ticket={ticket} trigger={       
        <Button variant={"outline"} size={"icon"} className="w-full">
          <LucideMoreVertical />
        </Button>
      }/>
    ) : null;

  return (
    <div className={clsx("w-full flex flex-col gap-y-4", {
          "max-w-[500px]": isDetail,
          "max-w-[420px]": !isDetail,
        })}
    >
      <div className={"flex gap-x-2"}>
        <Card className="w-full" key={ticket.id}>
          <CardHeader>
            <CardTitle className="flex gap-x-2 items-center min-w-0">
              <StatusIcon size={20} className="flex-shrink-0" />
              <span className="truncate">{ticket.title}</span>
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
            <p className="text-sm text-muted-foreground">
              {ticket.deadline} by {ticket.user.username}
            </p>
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

      {/* using the client server composition pattern, i want to make ticketItem a server component */}
      {/* { isDetail ? 
          <Comments ticketId={ticket.id} comments={comments} /> 
      : null } */}
      { comments }
    </div>
  );
};

export { TicketItem };
