import { clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Success Toast
export const SuccessToast = (msg) => {
  toast.success(msg)
}

// Error Toast 
export const ErrorToast = (msg) => {
  toast.error(msg)
}

// Get Initials
export const getInitials = (name) => {
  if (!name) return "ER";
  const parts = String(name).trim().split(/\s+/);
  const first = parts[0]?.[0] || "E";
  const second = parts[1]?.[0] || parts[0]?.[1] || "R";
  return (first + second).toUpperCase();
};
