'use client'

import React, { useEffect } from 'react'
import { CommentItem } from './comment-item';
import { CommentCreateForm } from './comment-create-form';
import { CardCompact } from '@/components/card-compact';
import CommentDeleteButton from './comment-delete-button';
import { CommentWithMetadata } from '../types';
import { PaginatedResponse, emptyPaginatedResponse } from "@/types/pagination";
import { getComments } from '../queries/get-comments';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useInView } from "react-intersection-observer"


interface CommentProps{
    ticketId: string;
    paginatedComments?: PaginatedResponse<CommentWithMetadata>,
}

const Comments = ({
  ticketId,
  paginatedComments = emptyPaginatedResponse<CommentWithMetadata>(),
}: CommentProps) => {
  const queryClient = useQueryClient();
  const queryKey = ["comments", ticketId];
  const { ref, inView } = useInView()
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => getComments(ticketId, pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.metadata.hasNextPage ? lastPage.metadata.cursor : undefined,
    initialData: {
      pages: [
        {
          list: paginatedComments.list,
          metadata: paginatedComments.metadata,
        }
      ],
      pageParams: [undefined]
    }
  })

  const comments = data.pages.map((page) => page.list).flat();
  // const [comments, setComments] = useState(paginatedComments.list);
  // const [metadata, setMetadata] = useState(paginatedComments.metadata);

  // const handleMore = () => fetchNextPage()
    // const morePaginatedComments = await getComments(ticketId, metadata.cursor);
    // const moreComments = morePaginatedComments.list;

    // setComments([...comments, ...moreComments])
    // setMetadata(morePaginatedComments.metadata)

    const handleDeleteComment = () => queryClient.invalidateQueries({queryKey});

  // const handleDeleteComment = (id: string) => {
    // setComments((prevComments) => prevComments.filter((comment) => comment.id !== id));
  // }

    const handleCreateComment = () => queryClient.invalidateQueries({queryKey});
    
  // const handleCreateComment = (comment: CommentWithMetadata| undefined) => {
    // if(!comment) return;

    // setComments([ comment, ...comments]);
  // }

  useEffect(() => {
    if(inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
  },[inView, hasNextPage, fetchNextPage, isFetchingNextPage])

  return (
    <>
      <CardCompact
        title="Create Comment"
        description="A new comment will be created"
        className="w-full  flex-1"
        content={
          <CommentCreateForm
            ticketId={ticketId}
            onCreateComment={handleCreateComment}
          />
        }
      />

      <div className="flex flex-col gap-y-2">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            buttons={[
              ...(comment.isOwner
                ? [
                    <CommentDeleteButton
                      id={comment.id}
                      key={"0"}
                      onDeleteComment={handleDeleteComment}
                    />,
                  ]
                : []),
            ]}
          />
        ))}
      </div>

      <div ref={ref}>
         { !hasNextPage && <p className='text-right text-xs italic'>No more comments</p> }
      </div>

      {/* <div className="flex flex-col justify-center ml-8">
        {hasNextPage && (
          <Button variant={"ghost"} onClick={handleMore} disabled={isFetchingNextPage}>
            More
          </Button>
        )}
      </div> */}
    </>
  );
};

export {Comments}
