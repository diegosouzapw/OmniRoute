import {
  firecrawlMap,
  type FirecrawlMapCredentials,
  type FirecrawlMapInput,
} from "../executors/firecrawl-map.ts";

export function handleFirecrawlMap(input: FirecrawlMapInput, credentials: FirecrawlMapCredentials) {
  return firecrawlMap(input, credentials);
}
