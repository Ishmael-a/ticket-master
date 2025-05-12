'use client'

import { Form } from '@/components/form/form'
import { SubmitButton } from '@/components/form/submit-button'
import { initialActionState } from '@/components/form/utils/to-action-state'
import React, { useActionState } from 'react'
import { createComment } from '../actions/create-comment'
import { Textarea } from '@/components/ui/textarea'
import { FieldError } from '@/components/form/field-error'

interface CommentCreateFormProps{
    ticketId: string
}

const CommentCreateForm = ({ ticketId }: CommentCreateFormProps) => {
    const [ actionState, action ] = useActionState(createComment.bind(null, ticketId), initialActionState)
  return (
    <Form action={action} actionState={actionState} >
        <Textarea name="content" placeholder={"Whats on your mind..."}/>
        <FieldError actionState={actionState} name={"content"} />

        <SubmitButton label={"Comment"} />
    </Form>
  )
}

export {CommentCreateForm}
