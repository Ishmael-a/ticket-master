
import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


export type SortSelectOption = {
    label: string;
    sortValue: string;
    sortKey: string
}

type SortObject = { 
  sortValue: string; 
  sortKey: string 
};

interface SearchInputProps {
  options: SortSelectOption[];
  onChange: (value: SortObject) => void;
  value: SortObject
}

const SortSelect = ({ options, onChange, value }: SearchInputProps) => {
  
    const handleSort = (compositeKey: string) => {

        const [sortKey, sortValue] = compositeKey.split('_');
        
        onChange({
          sortKey: sortKey,
          sortValue: sortValue
        });

    }
                
    return (
      <Select onValueChange={handleSort} defaultValue={value.sortKey + "_" + value.sortValue}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.sortKey + option.sortValue} value={option.sortKey + "_" + option.sortValue}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
}

export {SortSelect}
