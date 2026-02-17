// Utility function to merge class names
// Handles conditional classes and removes duplicates

export function cn(...classes) {
  return classes.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
}
