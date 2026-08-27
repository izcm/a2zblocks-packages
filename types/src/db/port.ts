import type { Page, HttpPageQuery } from "./page.js";

export interface ByKey<TEntity, TKey> {
  findByKey(key: TKey): Promise<TEntity | null>;
  findByKeys(keys: TKey[]): Promise<TEntity[]>;
}

export interface Pageable<TEntity extends object> {
  findPage(args: HttpPageQuery): Promise<Page<TEntity>>;
}

export interface Countable {
  count(args?: Pick<HttpPageQuery, "filters">): Promise<number>;
}

export type Extensible<TEntity> = TEntity & Record<string, unknown>;
