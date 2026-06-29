import { lazy, ComponentType } from "react";

/**
 * Lazy-load a component with one automatic retry + hard reload on chunk failure.
 * Fixes "Page Not Found" / blank screens after a fresh deploy when the browser
 * still references old chunk hashes that no longer exist on the server.
 */
export function lazyWithRetry<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) {
  return lazy(async () => {
    const STORAGE_KEY = "lovable:chunk-reload";
    try {
      return await factory();
    } catch (err) {
      const hasReloaded = sessionStorage.getItem(STORAGE_KEY) === "1";
      if (!hasReloaded) {
        sessionStorage.setItem(STORAGE_KEY, "1");
        window.location.reload();
        // Return a never-resolving promise so React stays in Suspense until reload
        return new Promise(() => {}) as Promise<{ default: T }>;
      }
      sessionStorage.removeItem(STORAGE_KEY);
      throw err;
    } finally {
      // Clear flag on successful load
      if (sessionStorage.getItem(STORAGE_KEY) === "1") {
        setTimeout(() => sessionStorage.removeItem(STORAGE_KEY), 2000);
      }
    }
  });
}
