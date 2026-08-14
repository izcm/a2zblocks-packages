import { ComponentType, SVGProps } from "react";

import { cn } from "@/lib/utils/cn.js";

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export function IconBtn({
  children,
  icon: Icon,
  className,
  ...props
}: IconButtonProps) {
  return (
    <button type="button" {...props} className={cn("nav-item", className)}>
      <span className="nav-item-label">{children}</span>
      <Icon className="nav-item-icon" />
    </button>
  );
}
