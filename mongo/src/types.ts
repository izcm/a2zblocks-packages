import type { SortDir, Page } from "@a2zb/types";

export type { SortDir, Page, ByKey } from "@a2zb/types";

// kept local to mongo (old shape, with range fields) instead of the
// generic @a2zb/types PageQuery
export type PageQuery = {
  limit: number;
  cursor?: string;
  from?: number;
  to?: number;
  rangeField?: string;
  sortField: string;
  sortDir: SortDir;
  filters?: {
    [key: string]: unknown;
    or?: Record<string, unknown>[];
  };
};

// kept local to mongo so they use mongo's own PageQuery, not @a2zb/types'
export interface Pageable<TEntity extends object> {
  findPage(args: PageQuery): Promise<Page<TEntity>>;
}

export interface Countable {
  count(args?: Pick<PageQuery, "filters">): Promise<number>;
}

export type WithTimestamps = {
  createdAt: number;
  updatedAt: number;
};
