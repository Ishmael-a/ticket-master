'use client'

import { SearchInput } from '@/components/search-input'
import { useQueryState } from "nuqs";
import { searchParser } from "@/features/tickets/search-input";
import React from 'react'

interface TicketSearchInputProps{
    placeholder: string
}

const TicketSearchInput = ({ placeholder }: TicketSearchInputProps) => {
    const [search, setSearch] = useQueryState("search", searchParser);

  return (
    <SearchInput placeholder={placeholder} defaultValue={search} onChange={setSearch}/>
  )
}

export default TicketSearchInput
