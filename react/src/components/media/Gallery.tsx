import { ReactNode, RefObject, useEffect } from "react";

import { ArrowRow, defaultArrowClasses } from "../data-display/index.js";
import { ArrowList } from "../navigation/index.js";
import { cn } from "@/lib/utils/cn.js";

export type GalleryProps<T> = {
  // items and selection
  items: T[];
  getId: (item: T) => string;
  selected?: T;
  onSelect?: (item: T) => void;
  onEnter?: (item: T) => void;

  // render
  galleryItem: (item: T) => ReactNode;
  isFresh?: (item: T) => boolean;
  galleryView?: "list" | "card";
  itemClassName?: (isSelected: boolean) => string;

  // ref + pagination
  ref?: RefObject<HTMLUListElement | null>;
  onLoadMore?: () => void;
  isLoading?: boolean;
  hasMore?: boolean;
};

export function Gallery<T>({
  items,
  getId,
  galleryItem,
  selected,
  onSelect,
  onEnter,
  isFresh,
  galleryView = "list",
  itemClassName,
  ref,
  onLoadMore,
  isLoading,
  hasMore,
}: GalleryProps<T>) {
  // load more on 'regular' scroll
  useEffect(() => {
    const el = ref?.current;
    if (!el || !onLoadMore) return;

    const handleScroll = () => {
      const distance = el.scrollHeight - (el.scrollTop + el.clientHeight);

      if (distance < 100 && !isLoading && hasMore) {
        onLoadMore();
      }
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [ref, onLoadMore, isLoading, hasMore]);

  // load more for keyboard
  useEffect(() => {
    if (!selected || !onLoadMore || isLoading || !hasMore) return;

    const index = items.findIndex((i) => getId(i) === getId(selected));
    if (index === -1) return;

    if (items.length - index < 5) {
      onLoadMore();
    }
  }, [selected, getId, items.length, hasMore, isLoading, items, onLoadMore]);

  useEffect(() => {
    if (!selected || !ref?.current) return;

    const el = ref.current.querySelector(
      `[data-id="${getId(selected)}"]`,
    ) as HTMLElement | null;

    if (!el) return;

    el.scrollIntoView({
      block: "center",
      inline: "center",
      behavior: "smooth",
    });

    el.scrollTop -= 40;
  }, [selected, ref]);

  const galleryClasses =
    galleryView === "list"
      ? {
          arrowList: "flex flex-col gap-4",
        }
      : {
          arrowList:
            "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg-rounded",
          arrowRow:
            "outline-none focus-visible:ring-0.5 focus-visible:ring-accent rounded-lg block",
        };

  return (
    <div className="flex h-full min-h-0 gap-4">
      {/* LEFT COLUMN */}
      <div className="flex min-h-0 flex-1 flex-col gap-4">
        <ArrowList
          ref={ref}
          items={items}
          getId={getId}
          selectedId={selected ? getId(selected) : undefined}
          onSelect={(c) => onSelect?.(c)}
          className={`${galleryClasses.arrowList} min-h-0 flex-1 rounded-lg p-1`}
        >
          {({ item, isSelected, onSelect }) => (
            <ArrowRow
              key={getId(item)}
              isSelected={isSelected}
              onSelect={onSelect}
              onEnter={onEnter ? () => onEnter(item) : undefined}
              dataId={getId(item)}
              className={cn(
                defaultArrowClasses.base,

                // default
                !isSelected && !isFresh?.(item) && defaultArrowClasses.hover,

                // fresh
                isFresh?.(item) && "fresh",

                // selected
                isSelected && defaultArrowClasses.selected,

                itemClassName?.(isSelected),
              )}
              bare // strip default classes
            >
              {galleryItem(item)}
            </ArrowRow>
          )}
        </ArrowList>
      </div>
    </div>
  );
}
