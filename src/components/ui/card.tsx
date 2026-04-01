import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={cn("rounded-xl border border-zinc-200 bg-white p-5 shadow-sm", className)} {...props}>
      {children}
    </div>
  );
}
