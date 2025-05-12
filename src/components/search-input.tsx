'use client'

import React from 'react'
import { Input } from './ui/input';
import { useDebouncedCallback } from 'use-debounce'


interface SearchInputProps {
  placeholder: string;
  defaultValue: string;
  onChange: (value: string) => void;
}

const SearchInput = ({ placeholder, defaultValue, onChange }: SearchInputProps) => {

    const handleChange = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        onChange(value)

    }, 250)

  return (
    <Input defaultValue={defaultValue} placeholder={placeholder} onChange={handleChange} />
  )
}

export {SearchInput}
