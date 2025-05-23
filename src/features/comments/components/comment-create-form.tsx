'use client'

import { Form } from '@/components/form/form'
import { SubmitButton } from '@/components/form/submit-button'
import { ActionState, initialActionState } from '@/components/form/utils/to-action-state'
import React, { useActionState } from 'react'
import { createComment } from '../actions/create-comment'
import { Textarea } from '@/components/ui/textarea'
import { FieldError } from '@/components/form/field-error'
import { CommentWithMetadata } from '../types';


interface CommentCreateFormProps{
    ticketId: string,
    onCreateComment?: (comment: CommentWithMetadata | undefined) => void,
}

const CommentCreateForm = ({
  ticketId,
  onCreateComment,
}: CommentCreateFormProps) => {
  const [actionState, action] = useActionState(
    createComment.bind(null, ticketId),
    initialActionState
  );

  const handleSuccess = (actionState: ActionState<CommentWithMetadata | undefined>) => {
    onCreateComment?.(actionState.data);
  };

  return (
    <Form action={action} actionState={actionState} onSuccess={handleSuccess}>
      <Textarea name="content" placeholder={"Whats on your mind..."} />
      <FieldError actionState={actionState} name={"content"} />

      <SubmitButton label={"Comment"} />
    </Form>
  );
};

export {CommentCreateForm}
