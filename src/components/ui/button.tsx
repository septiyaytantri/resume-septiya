import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline";
};

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition",
        variant === "primary"
          ? "bg-red-900 text-white hover:bg-red-800"
          : "border border-red-900 text-red-900 hover:bg-red-50",
        className,
      )}
      {...props}
    />
  );
}
