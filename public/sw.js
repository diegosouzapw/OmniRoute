const CACHE_NAME = "omniroute-pwa-v2";
const APP_SHELL = [
  "/",
  "/offline",
  "/manifest.webmanifest",
  "/icon-512.png",
  "/apple-touch-icon.png",
];
const EXCLUDED_PATH_PREFIXES = ["/api/", "/a2a", "/dashboard/endpoint"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);
  const isSameOrigin = requestUrl.origin === self.location.origin;
  const isExcludedPath = EXCLUDED_PATH_PREFIXES.some((prefix) =>
    requestUrl.pathname.startsWith(prefix)
  );
  const isNextAsset = requestUrl.pathname.startsWith("/_next/");
  const destination = event.request.destination;
  const isStaticAsset = ["style", "script", "image", "font"].includes(destination);
  const isNavigateRequest = event.request.mode === "navigate";

  // Never cache API/dashboard traffic with potentially auth-sensitive content.
  if (!isSameOrigin || isExcludedPath) {
    return;
  }

  event.respondWith(
    (async () => {
      if (isNavigateRequest) {
        try {
          return await fetch(event.request);
        } catch {
          return (await caches.match("/offline")) || Response.error();
        }
      }

      if (!isStaticAsset) {
        return fetch(event.request);
      }

      if (isNextAsset) {
        try {
          const networkResponse = await fetch(event.request);
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            void caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return networkResponse;
        } catch {
          return (await caches.match(event.request)) || Response.error();
        }
      }

      const cachedResponse = await caches.match(event.request);
      if (cachedResponse) {
        return cachedResponse;
      }

      const networkResponse = await fetch(event.request);
      if (networkResponse && networkResponse.status === 200) {
        const responseClone = networkResponse.clone();
        void caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
      }
      return networkResponse;
    })()
  );
});
