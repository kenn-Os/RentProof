import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, iconOnly = false, size = "md" }: LogoProps) {
  const sizes = {
    sm: { container: "h-7 w-7", icon: "h-4 w-4", text: "text-[10px]" },
    md: { container: "h-9 w-9", icon: "h-5 w-5", text: "text-xs" },
    lg: { container: "h-12 w-12", icon: "h-7 w-7", text: "text-sm" },
  };

  const currentSize = sizes[size];

  return (
    <div className={cn("flex items-center gap-3 select-none", className)}>
      {/* The Monogram Mark */}
      <div className={cn(
        "flex shrink-0 items-center justify-center bg-ink-900 transition-transform hover:scale-105 active:scale-95",
        currentSize.container
      )}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn("text-paper-50 fill-current", currentSize.icon)}
        >
          {/* 
            Modernist RP Monogram 
            A single-weight geometric construction 
          */}
          <path d="M20 15V85H32V55H50C69.33 55 85 39.33 85 20C85 17.24 82.76 15 80 15H20ZM32 27H73C73 39.7 62.7 50 50 50H32V27Z" />
          <path d="M45 45V95H57V75H75C83.28 75 90 68.28 90 60C90 51.72 83.28 45 75 45H45ZM57 55H75C77.76 55 80 57.24 80 60C80 62.76 77.76 65 75 65H57V55Z" />
        </svg>
      </div>

      {!iconOnly && (
        <div className="flex flex-col leading-none">
          <span className={cn(
            "font-display font-bold uppercase tracking-[0.25em] text-ink-900",
            currentSize.text
          )}>
            RentProof
          </span>
          <span className="mt-1 text-[8px] font-bold uppercase tracking-[0.3em] text-ink-400">
            Documentation Protocol
          </span>
        </div>
      )}
    </div>
  );
}
