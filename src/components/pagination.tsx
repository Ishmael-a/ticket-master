import React from 'react'
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaginatedResponse } from '@/types/pagination';


type PageAndSize = {
    page: number;
    size: number;
}

interface PaginationProps {
  pagination: PageAndSize;
  onPagination: (pagination: PageAndSize) => void;
  paginatedMetadata: PaginatedResponse<unknown>['metadata'];
}

const Pagination = ({ pagination, onPagination, paginatedMetadata: { count, hasNextPage } }: PaginationProps) => {
    const startOffset = pagination.page * pagination.size + 1;
    const endOffset = startOffset - 1 + pagination.size;
    const actualEndOffset = Math.min(endOffset, count);

    const label = `${startOffset}  -  ${actualEndOffset}  of  ${count}`;

    const handlePrevious = () => {
        onPagination({
            ...pagination,
            page: pagination.page - 1
        })
    }
    const handleNext = () => {
        onPagination({
            ...pagination,
            page: pagination.page + 1
        })
    }
    const handleChangeSize = (size: string) => {
      onPagination({
        size: parseInt(size),
        page: 0,
      });
    };

    const previousButton = (
        <Button variant={"outline"} size={"sm"} disabled={pagination.page < 1} onClick={handlePrevious}>
            Previous
        </Button>
    )

    const nextButton = (
        <Button variant={"outline"} size={"sm"} disabled={!hasNextPage} onClick={handleNext}>
            Next
        </Button>
    )

    const sizeButton = (
      <Select
        defaultValue={pagination.size.toString()}
        onValueChange={handleChangeSize}
      >
        <SelectTrigger className=" max-h-[32px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2">2</SelectItem>
          <SelectItem value="5">5</SelectItem>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="25">25</SelectItem>
          <SelectItem value="50">50</SelectItem>
          <SelectItem value="100">100</SelectItem>
        </SelectContent>
      </Select>
    );

  return (
    <div className='flex justify-between items-center'>
        <p className={'text-sm text-muted-foreground'}>{label}</p>
        <div className='flex gap-x-2'>
            {sizeButton}
            {previousButton}
            {nextButton}
        </div>
    </div>
  )
}

export {Pagination}
