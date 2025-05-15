export type PaginatedResponse<T> = {
  list: T[];
  metadata: {
    count: number;
    hasNextPage: boolean;
    cursor?: string;
  };
};

export function emptyPaginatedResponse<T>(): PaginatedResponse<T> {
  return {
    list: [],
    metadata: {
      count: 0,
      hasNextPage: false,
    },
  };
}
