import type { AnchorHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils/cn.js";

const DefaultExternalLinkIcon = (
  <svg
    className="nav-item-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
  </svg>
);

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Trailing icon, e.g. an icon from your icon library of choice. Defaults to a built-in external-link glyph. */
  icon?: ReactNode;
};

export function IconLink({ children, className, icon = DefaultExternalLinkIcon, ...props }: Props) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      {...props}
      className={cn("nav-item", className)}
    >
      <span className="nav-item-label">{children}</span>
      {icon}
    </a>
  );
}
