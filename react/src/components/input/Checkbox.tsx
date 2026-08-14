import { cn } from "@/lib/utils/cn.js";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function Checkbox({ label, className, ...props }: CheckboxProps) {
  return (
    <label className="group flex items-center gap-3 cursor-pointer">
      <input
        {...props}
        type="checkbox"
        className={cn(
          "size-4 cursor-pointer rounded border-line accent-accent",
          "transition-all duration-150",
          "group-hover:border-accent group-hover:ring-2 group-hover:ring-accent/15",
          className,
        )}
      />

      {label && (
        <span className="text-sm text-subtle transition-colors group-hover:text-fg">
          {label}
        </span>
      )}
    </label>
  );
}
