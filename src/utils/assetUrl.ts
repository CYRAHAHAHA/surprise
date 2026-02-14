/**
 * Prepend the Vite base path to a public-folder asset URL.
 * Locally BASE_URL is "/", on GitHub Pages it's "/surprise/".
 */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL; // e.g. "/" or "/surprise/"
  const clean = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${clean}`;
}

/**
 * Preload an image and resolve when it's cached (or on error, so we never block forever).
 * Timeout ensures we don't wait more than `ms` milliseconds.
 */
export function preloadImage(src: string, ms = 3000): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    const timer = setTimeout(resolve, ms);
    img.onload = () => {
      clearTimeout(timer);
      resolve();
    };
    img.onerror = () => {
      clearTimeout(timer);
      resolve();
    };
    img.src = src;
  });
}

/**
 * Preload multiple images in parallel. Resolves when all are cached (or timed out).
 */
export function preloadImages(srcs: string[], ms = 3000): Promise<void> {
  return Promise.all(srcs.map((s) => preloadImage(s, ms))).then(() => {});
}
