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
    // const searchParams = useSearchParams();
    // const pathname = usePathname();
    // const { replace } = useRouter()

    const handleChange = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        onChange(value)
        // const params = new URLSearchParams(searchParams)

        // if(value){
        //     params.set('search', value)
        // }else{
        //     params.delete('search')
        // }

        // replace(`${pathname}?${params.toString()}`,{
        //     scroll: false,
        // })

    }, 250)

  return (
    <Input defaultValue={defaultValue} placeholder={placeholder} onChange={handleChange} />
  )
}

export {SearchInput}
