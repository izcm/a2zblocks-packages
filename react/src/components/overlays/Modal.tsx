import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { FocusTrap } from "focus-trap-react";
import { cn } from "@/lib/utils/cn.js";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  escTxt?: string;
  showCancelBtn?: boolean;
  selfManagesFocus?: boolean;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  className?: string;
  children: ReactNode;
};

export function Modal({
  isOpen,
  onClose,
  children,
  escTxt = "Close",
  showCancelBtn = true,
  selfManagesFocus,
  ariaLabel,
  ariaLabelledBy,
  className,
}: ModalProps) {
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  // close on Escape
  const handler = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  // Close on ESC key
  useEffect(() => {
    if (!isOpen) return;

    lastFocusedRef.current = document.activeElement as HTMLElement | null;

    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
      lastFocusedRef.current?.focus();
    };
  }, [onClose, isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-[999] flex items-center justify-center
        bg-black/50 backdrop-blur-sm animate-fadeIn
      "
      onClick={onClose}
    >
      <FocusTrap
        focusTrapOptions={{
          initialFocus:
            selfManagesFocus || !showCancelBtn ? false : "#modal-close-btn",
        }}
      >
        <div
          className={cn(
            "flex flex-col gap-2",
            "bg-card",
            "border border-default",
            "rounded-lg",
            "shadow-lg p-2",
            className,
          )}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
        >
          {children}

          {showCancelBtn && (
            <button
              id="modal-close-btn"
              className="btn btn-secondary outline-none"
              onClick={onClose}
            >
              {escTxt}
            </button>
          )}
        </div>
      </FocusTrap>
    </div>
  );
}
