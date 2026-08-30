import { cn } from "@/lib/utils/cn.js";

export const Spinner = ({
  size = 16,
  ...props
}: { size?: number } & React.ComponentProps<"div">) => (
  <div
    {...props}
    style={{ width: size, height: size, ...props.style }}
    className={cn(
      "animate-spin rounded-full border-2 border-accent/80 border-t-transparent",
      props.className,
    )}
  />
);
