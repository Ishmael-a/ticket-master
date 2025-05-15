import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const CommentsSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <Skeleton className="h-[250px] w-full" />
      <Skeleton className="h-[80px] ml-8" />
      <Skeleton className="h-[80px] ml-8" />
    </div>
  )
}

export {CommentsSkeleton}
