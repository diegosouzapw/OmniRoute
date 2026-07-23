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
    keys: async () => ["omniroute-pwa-v2"],
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
      assert.ok(responsePromise, "navigate request must call respondWith");
      return responsePromise;
    },
    setFetch: (nextFetch: (request: Request) => Promise<Response>) => {
      fetchImpl = nextFetch;
    },
  };
}

test("#5165: service worker returns cached navigation before offline page", async () => {
  const harness = createServiceWorkerHarness();
  const request = {
    url: "https://app.example/dashboard",
    method: "GET",
    mode: "navigate",
    destination: "document",
  };

  harness.cacheEntries.set(request.url, new Response("cached dashboard", { status: 200 }));
  harness.cacheEntries.set("/offline", new Response("offline page", { status: 200 }));

  const response = await harness.dispatchFetch(request);

  assert.equal(await response.text(), "cached dashboard");
});

test("#5165: successful navigations are cached for later transient failures", async () => {
  const harness = createServiceWorkerHarness();
  const request = {
    url: "https://app.example/dashboard",
    method: "GET",
    mode: "navigate",
    destination: "document",
  };

  harness.setFetch(async () => new Response("fresh dashboard", { status: 200 }));
  assert.equal(await (await harness.dispatchFetch(request)).text(), "fresh dashboard");

  harness.setFetch(async () => {
    throw new Error("transient network failure");
  });

  assert.equal(await (await harness.dispatchFetch(request)).text(), "fresh dashboard");
});
