import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-md border border-zinc-200 px-3 text-sm outline-none ring-red-900/20 placeholder:text-zinc-400 focus:ring-2",
        className,
      )}
      {...props}
    />
  );
}
