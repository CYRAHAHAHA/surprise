/**
 * Prepend the Vite base path to a public-folder asset URL.
 * Locally BASE_URL is "/", on GitHub Pages it's "/surprise/".
 */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL; // e.g. "/" or "/surprise/"
  const clean = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${clean}`;
}
