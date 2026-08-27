import { ReactNode } from "react";

import { truncateHex, type Hex } from "@a2zb/lib";

import { Copyable } from "../Copyable.js";

export type DetailField<T> = {
  label: string;
  getValue: (item: T) => ReactNode;
};

export function DetailFields<T>({
  data,
  fields,
}: {
  data: T;
  fields: DetailField<T>[];
}) {
  return (
    <>
      {fields.map((f) => (
        <div key={f.label} className="flex items-center justify-between">
          <dt className="text-sm text-muted">{f.label}</dt>
          <dd className="text-sm font-medium text-fg">{f.getValue(data)}</dd>
        </div>
      ))}
    </>
  );
}

/** Ready-made getValue for hex values: truncated + click-to-copy. */
export const HexDetailField = (value: Hex, className?: string) => (
  <Copyable className={className} value={value}>
    {truncateHex(value)}
  </Copyable>
);
