'use client'

import { useConfirmDialog } from '@/components/confirm-dialog'
import { Button } from '@/components/ui/button'
import { LucideTrash } from 'lucide-react'
import React from 'react'
import { deleteComment } from '../actions/delete-comment'

const CommentDeleteButton = ({ id } : { id: string }) => {
    const { dialogTrigger: deleteButton,  dialog: deleteDialog}  = useConfirmDialog({
        action: deleteComment.bind(null, id),
        trigger:  (
                <Button variant={"outline"} size={"icon"}>
                    <LucideTrash className="w-4 h-4" />
                </Button>
            )
    })

  return (
    <>
        {deleteButton}
        {deleteDialog}
    </>
  )
}

export default CommentDeleteButton
