// formatDate.ts
export function formatDate(d?: string) {
  if (!d) return "";
  try {
    return new Date(d).toLocaleDateString();
  } catch {
    return d;
  }
}
