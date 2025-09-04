import { clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge"
import { Facebook, Instagram, Twitter, Linkedin, LinkIcon } from "lucide-react";
import { createElement } from 'react';

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

// Get Skills Name
export const getSkillsName = (skillsId, skills) => {
  if (!skillsId || !Array.isArray(skills)) return [];
  return skillsId.map((skillId) => skills.find((skill) => skill._id === skillId)?.name);
};

// Format Date
export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Get social Icon
export const getSocialIcon = (url) => {
  if (!url || typeof url !== 'string') return null;
  let hostname = "";
  try {
    const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
    hostname = parsed.hostname.replace(/^www\./, '').toLowerCase();
  } catch {
    // Fallback: naive domain extraction
    hostname = url.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0].toLowerCase();
  }

  if (hostname.includes('facebook.com')) return createElement(Facebook, { className: 'h-5 w-5' })
  if (hostname.includes('instagram.com')) return createElement(Instagram, { className: 'h-5 w-5' })
  if (hostname.includes('x.com') || hostname.includes('twitter.com')) return createElement(Twitter, { className: 'h-5 w-5' })
  if (hostname.includes('linkedin.com')) return createElement(Linkedin, { className: 'h-5 w-5' })
  // Fallback icon
  return createElement(LinkIcon, { className: 'h-5 w-5 text-muted-foreground' })
}