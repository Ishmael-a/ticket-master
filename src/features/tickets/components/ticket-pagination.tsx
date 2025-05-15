"use client";

import { Pagination } from "@/components/pagination";
import { useQueryState, useQueryStates } from "nuqs";
import { paginationParser, paginationOptions, searchParser } from "@/features/tickets/search-input";
import React, { useEffect, useRef } from "react";
import { PaginatedResponse } from "@/types/pagination";
import { TicketWithMetadata } from "../types";

interface TicketPaginationProps {
    paginatedTicketMetadata: PaginatedResponse<TicketWithMetadata>['metadata']
}

const TicketPagination = ({ paginatedTicketMetadata }: TicketPaginationProps) => {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions
  );
  
    const [ search ] = useQueryState("search", searchParser);
    const prevSearch = useRef(search);

    useEffect(() => {
        if(prevSearch.current === search) return;
        prevSearch.current = search;

        setPagination({
            ...pagination,
            page: 0
        })

    }, [pagination, search, setPagination])
    
  return (
    <Pagination
      pagination={pagination}
      onPagination={setPagination}
      paginatedMetadata={paginatedTicketMetadata}
    />
  );
};

export default TicketPagination;
