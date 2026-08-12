import { Collection, Filter, Document as MongoDoc, WithId } from "mongodb";

import { PageQuery, ByKey, Countable, Pageable } from "../types.js";

import { findPageGeneric } from "../pagination/find-page-generic.js";
import { mapToRepoQuery } from "../pagination/to-repo-query.js";
import { FieldConfig } from "../filters/field-config.js";

export const makeReadRepo = <TDoc extends MongoDoc, TKey, TOut extends object>(
  getCol: () => Collection<TDoc>,
  keyToFilter: (k: TKey) => Filter<TDoc>,
  map: (doc: WithId<TDoc>) => TOut,
  fieldConfig?: FieldConfig,
) => {
  return {
    async findByKey(key: TKey) {
      const doc = await getCol().findOne(keyToFilter(key));
      return doc ? map(doc) : null;
    },

    async findByKeys(keys: TKey[]) {
      if (!keys.length) return [];

      const docs = await getCol()
        .find({ $or: keys.map(keyToFilter) } as Filter<TDoc>)
        .toArray();

      return docs.map(map);
    },

    async findPage(pageQuery: PageQuery) {
      const repoQuery = mapToRepoQuery<TDoc>(pageQuery, getCol(), fieldConfig);

      const page = await findPageGeneric<TDoc>({
        ...repoQuery,
      });

      return {
        ...page,
        items: page.items.map(map),
      };
    },

    count(args: Pick<PageQuery, "filters"> = {}) {
      const { baseQuery } = mapToRepoQuery<TDoc>(
        { filters: args.filters, sortField: "", sortDir: "desc", limit: 0 },
        getCol(),
        fieldConfig,
      );
      return getCol().countDocuments(baseQuery);
    },
  } satisfies ByKey<TOut, TKey> & Pageable<TOut> & Countable;
};
