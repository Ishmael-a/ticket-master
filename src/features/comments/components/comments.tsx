import React from 'react'
import { getComments } from '../queries/get-comments';
import { CommentItem } from './comment-item';
import { CommentCreateForm } from './comment-create-form';
import { CardCompact } from '@/components/card-compact';
import CommentDeleteButton from './comment-delete-button'
import { getAuth } from '@/features/auth/actions/get-auth';
import { isOwner } from '@/features/auth/utils/is-owner';


interface CommentProps{
    ticketId: string
}

const Comments = async ({ ticketId }: CommentProps) => {
    const { user } = await getAuth();
    const comments = await getComments(ticketId);


  return (
    <>
      <CardCompact
        title="Create Comment"
        description="A new comment will be created"
        className="w-full  flex-1"
        content={<CommentCreateForm ticketId={ticketId} />}
      />

      <div className="flex flex-col gap-y-2">
        {comments.map((comment) => (
          <CommentItem 
            key={comment.id} 
            comment={comment} 
            buttons={[...(
                isOwner(user, comment) ? 
                [
                    <CommentDeleteButton id={comment.id} key={"0"}/>
                ] 
                : []
            )]}
            />
        ))}
      </div>
    </>
  );
}

export {Comments}
