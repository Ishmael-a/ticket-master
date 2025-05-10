"use client";

import { SortSelect, SortSelectOption } from "@/components/sort-select";
import { useQueryStates } from "nuqs";
import { sortOptions, sortParser } from "@/features/tickets/search-input";
import React from "react";

interface TicketSortSelectProps {
  options: SortSelectOption[];
}

const TicketSortSelect = ({ options }: TicketSortSelectProps) => {
  const [sort, setSort] = useQueryStates(sortParser, sortOptions);

  return <SortSelect value={sort} onChange={setSort} options={options} />;
};

export default TicketSortSelect;
