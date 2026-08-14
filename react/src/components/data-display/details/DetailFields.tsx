import { ReactNode } from "react";

import { cn } from "@/lib/utils/cn.js";

export type DetailField<T> = {
  label: string;
  getValue: (item: T) => ReactNode;
  className?: string;
};

function DetailRow({
  label,
  value,
  className,
}: {
  label: string;
  value: ReactNode;
  className?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className={cn("text-sm font-medium text-fg", className)}>{value}</dd>
    </div>
  );
}

export function DetailFields<T>({
  data,
  fields,
}: {
  data: T;
  fields: DetailField<T>[];
}) {
  return (
    <>
      {fields.map((field) => (
        <DetailRow
          key={field.label}
          label={field.label}
          value={field.getValue(data)}
          className={field.className}
        />
      ))}
    </>
  );
}
