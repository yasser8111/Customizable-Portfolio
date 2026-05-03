import React from "react";

// Simple utility to merge class names
export const cn = (...classes) => classes.filter(Boolean).join(" ");

// Helper function to create URL-friendly slugs
export const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
};

// Helper function to render text with **bold** markers
export const renderFormattedText = (text) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-extrabold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};
