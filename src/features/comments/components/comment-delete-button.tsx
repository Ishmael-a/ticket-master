'use client'

import { useConfirmDialog } from '@/components/confirm-dialog'
import { Button } from '@/components/ui/button'
import { LucideTrash, LucideLoaderCircle } from "lucide-react";
import React from 'react'
import { deleteComment } from '../actions/delete-comment'

const CommentDeleteButton = ({ id, onDeleteComment } : { id: string, onDeleteComment?: (id: string) => void }) => {
    const { dialogTrigger: deleteButton,  dialog: deleteDialog}  = useConfirmDialog({
        action: deleteComment.bind(null, id),
        trigger:  (isPending) => (
                <Button variant={"outline"} size={"icon"}>
                    { isPending ? 
                        (<LucideLoaderCircle className="w-4 h-4 animate-spin"/>) 
                        : 
                        (<LucideTrash className="w-4 h-4" />)   
                    }
                </Button>
            ),
        onSuccess: () => onDeleteComment?.(id)
    })

  return (
    <>
        {deleteButton}
        {deleteDialog}
    </>
  )
}

export default CommentDeleteButton
