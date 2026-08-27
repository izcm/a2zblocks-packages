export type SortDir = "asc" | "desc";

export type Page<T> = {
  items: T[];
  nextCursor: string | null;
};

type QueryOptions = {
  limit?: number;
  sortField?: string;
  sortDir?: SortDir;
  filters?: {
    [key: string]: unknown;
    or?: Record<string, unknown>[];
  };
};

export type HttpPageQuery = QueryOptions & {
  cursor?: string;
};

type IncludeQuery = QueryOptions & {
  include?: RawIncludes;
};

export type RawIncludes = Record<string, true | IncludeQuery>;

export type FindPageQuery = {
  sortField: string;
  sortDir: SortDir;
  limit: number;
  cursor?: string;
  filters?: Record<string, unknown>;
};

export {};
// canary-1787623763
