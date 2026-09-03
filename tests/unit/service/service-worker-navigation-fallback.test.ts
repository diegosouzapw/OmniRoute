import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

type FetchEvent = {
  request: RequestLike;
  respondWith: (response: Promise<Response>) => void;
};

type ServiceWorkerEvent = FetchEvent | Record<string, unknown>;

type RequestLike = {
  url: string;
  method: string;
  mode: string;
  destination: string;
};

function createServiceWorkerHarness() {
  const cacheEntries = new Map<string, Response>();
  const listeners = new Map<string, (event: ServiceWorkerEvent) => void>();
  let fetchImpl: (request: RequestLike) => Promise<Response> = async () => {
    throw new Error("network unavailable");
  };

  const cache = {
    addAll: async (urls: string[]) => {
      for (const url of urls) {
        cacheEntries.set(url, new Response(`cached ${url}`, { status: 200 }));
      }
    },
    delete: async (request: Request) => cacheEntries.delete(request.url),
    keys: async () => [...cacheEntries.keys()].map((url) => new Request(url)),
    put: async (request: Request, response: Response) => {
      cacheEntries.set(request.url, response);
    },
  };

  const caches = {
    delete: async () => true,
    keys: async () => ["omniroute-pwa-v3"],
    match: async (request: Request | string) =>
      cacheEntries.get(typeof request === "string" ? request : request.url),
    open: async () => cache,
  };

  const context = vm.createContext({
    URL,
    Request,
    Response,
    caches,
    fetch: (request: RequestLike) => fetchImpl(request),
    self: {
      clients: { claim: async () => undefined },
      location: { href: "https://app.example/sw.js", origin: "https://app.example" },
      registration: { showNotification: async () => undefined },
      skipWaiting: async () => undefined,
      addEventListener: (type: string, listener: (event: ServiceWorkerEvent) => void) => {
        listeners.set(type, listener);
      },
    },
  });

  vm.runInContext(readFileSync("public/sw.js", "utf8"), context);

  return {
    cacheEntries,
    dispatchFetch: async (request: RequestLike) => {
      const listener = listeners.get("fetch");
      assert.ok(listener, "fetch listener must be registered");
      let responsePromise: Promise<Response> | undefined;
      const event: FetchEvent = {
        request,
        respondWith: (response) => {
          responsePromise = response;
        },
      };
      listener(event);
      return { intercepted: responsePromise !== undefined, response: responsePromise };
    },
    setFetch: (nextFetch: (request: Request) => Promise<Response>) => {
      fetchImpl = nextFetch;
    },
  };
}

test("#11779: dashboard navigations are not intercepted so the browser can retry HTTP/2", async () => {
  const harness = createServiceWorkerHarness();
  const request = {
    url: "https://app.example/dashboard/quota",
    method: "GET",
    mode: "navigate",
    destination: "document",
  };

  // A cached navigation response from a PREVIOUS deploy exists. The worker
  // must not intercept at all — Chrome then owns HTTP/3→HTTP/2 fallback
  // after a stale Alt-Svc advertisement. Intercepting and returning
  // Response.error() is what made F5 hang until a new tab opened.
  harness.cacheEntries.set(request.url, new Response("cached dashboard", { status: 200 }));

  const result = await harness.dispatchFetch(request);
  assert.equal(result.intercepted, false, "dashboard navigation must fall through to the browser");
});

test("#11779: API and Next assets still go through the worker", async () => {
  const harness = createServiceWorkerHarness();
  harness.setFetch(async () => new Response("ok", { status: 200 }));

  const api = await harness.dispatchFetch({
    url: "https://app.example/api/health/ping",
    method: "GET",
    mode: "cors",
    destination: "",
  });
  assert.equal(api.intercepted, false, "/api/ is already excluded");

  const asset = await harness.dispatchFetch({
    url: "https://app.example/_next/static/chunk.js",
    method: "GET",
    mode: "cors",
    destination: "script",
  });
  assert.equal(asset.intercepted, true);
  assert.equal(await (await asset.response!).text(), "ok");
});

test("#11779: /dashboardfoo is not treated as a dashboard path", async () => {
  const harness = createServiceWorkerHarness();
  harness.setFetch(async () => new Response("ok", { status: 200 }));
  const result = await harness.dispatchFetch({
    url: "https://app.example/dashboardfoo",
    method: "GET",
    mode: "cors",
    destination: "script",
  });
  assert.equal(result.intercepted, true, "prefix match must not swallow /dashboardfoo");

  const dash = await harness.dispatchFetch({
    url: "https://app.example/dashboard",
    method: "GET",
    mode: "cors",
    destination: "script",
  });
  assert.equal(dash.intercepted, false, "/dashboard exact must stay excluded");

  const nested = await harness.dispatchFetch({
    url: "https://app.example/dashboard/quota",
    method: "GET",
    mode: "cors",
    destination: "script",
  });
  assert.equal(nested.intercepted, false, "/dashboard/quota must stay excluded");
});

test("#5165: static assets stay cache-first; navigations do not", async () => {
  const harness = createServiceWorkerHarness();
  const icon = {
    url: "https://app.example/icon-512.png",
    method: "GET",
    mode: "cors",
    destination: "image",
  };

  harness.setFetch(async () => new Response("fresh icon", { status: 200 }));
  const first = await harness.dispatchFetch(icon);
  assert.equal(first.intercepted, true);
  assert.equal(await (await first.response!).text(), "fresh icon");

  harness.setFetch(async () => {
    throw new Error("transient network failure");
  });
  const second = await harness.dispatchFetch(icon);
  assert.equal(second.intercepted, true);
  assert.equal(await (await second.response!).text(), "fresh icon");
});
