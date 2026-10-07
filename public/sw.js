const CACHE_NAME = "omniroute-pwa-v3";
const APP_SHELL = [
  "/",
  "/manifest.webmanifest",
  "/icon-512.png",
  "/apple-touch-icon.png",
];
const EXCLUDED_PATH_PREFIXES = ["/api/", "/a2a", "/dashboard"];

function pathIsExcluded(pathname) {
  return EXCLUDED_PATH_PREFIXES.some((prefix) => {
    const base = prefix.endsWith("/") ? prefix.slice(0, -1) : prefix;
    return pathname === base || pathname.startsWith(`${base}/`);
  });
}

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
      // Build identity lives in CACHE_NAME itself (stamped at build time),
      // so deleting every other cache name above already drops all stale
      // generations. No per-entry build-id comparison is needed.
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);
  const isSameOrigin = requestUrl.origin === self.location.origin;
  const excluded = pathIsExcluded(requestUrl.pathname);
  const isNextAsset = requestUrl.pathname.startsWith("/_next/");
  const destination = event.request.destination;
  const isStaticAsset = ["style", "script", "image", "font"].includes(destination);
  const isNavigateRequest = event.request.mode === "navigate";

  // Never intercept navigations. Chrome owns HTTP/3→HTTP/2 fallback after a
  // stale Alt-Svc advertisement; respondWith(Response.error()) on a dead QUIC
  // socket made F5 hang until a new tab opened a fresh connection.
  // Never cache API/dashboard traffic with potentially auth-sensitive content.
  if (!isSameOrigin || excluded || isNavigateRequest) {
    return;
  }

  event.respondWith(
    (async () => {
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

// ── Push Notifications ───────────────────────────────────────────────────────

self.addEventListener("push", (event) => {
  let data;
  try {
    data = event.data ? event.data.json() : {};
  } catch {
    data = { title: "OmniRoute", body: event.data?.text() || "New notification" };
  }

  const title = data.title || "OmniRoute";
  const options = {
    body: data.body || "",
    icon: data.icon || "/icon-512.png",
    badge: data.badge || "/icon-192.png",
    tag: data.tag || "omniroute-default",
    data: {
      url: data.url || "/dashboard",
      timestamp: Date.now(),
    },
    vibrate: [200, 100, 200],
    requireInteraction: true,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// ── Notification Click ───────────────────────────────────────────────────────

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const urlToOpen = event.notification.data?.url || "/dashboard";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientsList) => {
      for (const client of clientsList) {
        if (client.url.includes(self.location.origin) && "focus" in client) {
          client.focus();
          if ("navigate" in client) {
            client.navigate(urlToOpen);
          }
          return;
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
