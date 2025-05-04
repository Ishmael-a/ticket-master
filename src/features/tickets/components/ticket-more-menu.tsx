'use client'

import { Ticket } from 'generated/prisma'
import { LucideTrash } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TicketStatus } from "../types"


import React from 'react'
import { updateTicketStatus } from '../actions/update-ticket-status';
import { toast } from 'sonner';
import { useConfirmDialog } from '@/components/confirm-dialog';
import { deleteTicket } from '../actions/delete-ticket';

type TicketMoreMenuProps = {
    ticket: Ticket;
    trigger: React.ReactNode
}

const TicketMoreMenu = ({ticket, trigger}: TicketMoreMenuProps) => {

    const {dialogTrigger: deleteButton, dialog: deleteDialog} = useConfirmDialog({
        action: deleteTicket.bind(null, ticket.id),
        trigger: (
            <DropdownMenuItem>
                <LucideTrash className="mr-2 h-4 w-4" />
                <span>Delete</span>
            </DropdownMenuItem>
        ),
        title: "Delete Ticket",
        description: "Are you sure you want to delete this ticket?"
    })


    const handleUpdateTicketStatus = async (value: string) => {
       const promise = updateTicketStatus(ticket.id, value as TicketStatus);

       toast.promise(promise, {
        loading: "Updating Status...",
       })

       const result = await promise;

       if(result.status === "SUCCESS"){
        toast.success(result.message)
       }else if(result.status === "ERROR"){
        toast.error(result.message)
       }
    }

    const ticketStatusRadioGroupItems = (
        <DropdownMenuRadioGroup value={ticket.status} onValueChange={handleUpdateTicketStatus}>
          {(Object.keys(TicketStatus) as Array<keyof typeof TicketStatus>).map((key) => (
            <DropdownMenuRadioItem key={key} value={key}>
              {TicketStatus[key]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
    )

  return (
    <>
        {deleteDialog}
        <DropdownMenu>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" side="right">
            {ticketStatusRadioGroupItems}
            <DropdownMenuSeparator />
            {deleteButton}
        </DropdownMenuContent>
        </DropdownMenu>
    </>
  );
}

export {TicketMoreMenu}
