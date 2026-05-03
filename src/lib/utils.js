
// Simple utility to merge class names
export const cn = (...classes) => classes.filter(Boolean).join(" ");

// Helper function to create URL-friendly slugs
export const createSlug = (title) => {
  if (!title) return "";
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
};
