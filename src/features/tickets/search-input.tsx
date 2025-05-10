import { createSearchParamsCache, parseAsString } from 'nuqs/server'

export const searchParser = parseAsString.withDefault('').withOptions({
    shallow: false,
    clearOnDefault: true
})
// export const sortParser = parseAsString.withDefault('newest').withOptions({
//     shallow: false,
//     clearOnDefault: true
// })
export const sortParser = {
  sortKey: parseAsString.withDefault("createdAt"),
  sortValue: parseAsString.withDefault("desc"),
};

export const sortOptions = {
  shallow: false,
  clearOnDefault: true,
};

export const searchParamsCache = createSearchParamsCache({
  search: searchParser,
  ...sortParser
})

export type ParsedSearchParams = Awaited<ReturnType<typeof searchParamsCache.parse>>;

// export interface SearchParams{
//   search: string | string[] | undefined;
//   sort: string | string[] | undefined;
// }

//code for when i was manually setting and updating the url params without using nuqs

    // const searchParams = useSearchParams();
    // const pathname = usePathname();
    // const { replace } = useRouter()
    // const handleSort = (value: string) => {

        // const params = new URLSearchParams(searchParams)
        
        // if(value === defaultValue){
        //     params.delete('sort')
        // }else if(value){
            //     params.set('sort', value)
            // }else{
            //     params.delete('sort')
            // }
            
            // replace(`${pathname}?${params.toString()}`,{
                //     scroll: false,
                // })
        // } 

// export type SearchParams = Record<string, string | string[] | undefined>

// import { SearchParams } from 'nuqs/server'

