import type { ReactNode } from "react";

import { truncateHex, type Hex } from "@a2zb/lib";

import { cn } from "@/lib/utils/cn.js";

import { Copyable } from "../Copyable.js";
import { DetailFields, type DetailField } from "./DetailFields.js";

// --- copyable field ---

export const HexDetailField = (value: Hex, className?: string) => (
  <Copyable className={className} value={value}>
    {truncateHex(value)}
  </Copyable>
);

// --- details ---

export type DetailsProps<T> = {
  item: T;
  title?: ReactNode;
  detailsFields: DetailField<T>[];
  bottomFields?: DetailField<T>[]; // are set at bottom of list separated
  className?: string;
};

export function Details<T>({
  item,
  title,
  detailsFields,
  bottomFields,
  className,
}: DetailsProps<T>) {
  return (
    <div
      className={cn("flex flex-col text-sm justify-between", className)}
      tabIndex={-1}
    >
      {title}

      {/* details */}
      <div className="flex flex-col gap-4">
        <DetailFields data={item} fields={detailsFields} />
      </div>

      {/* timing */}
      {bottomFields && (
        <div className="pt-2 border-t border-white/5 flex flex-col gap-2">
          <DetailFields data={item} fields={bottomFields} />
        </div>
      )}
    </div>
  );
}
