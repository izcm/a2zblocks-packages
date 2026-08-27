import type { Range } from "@a2zb/types";

export function isRange(value: unknown): value is Range {
  // check if its an object
  return (
    typeof value === "object" &&
    value !== null &&
    ("gte" in value || "lte" in value)
  );
}
