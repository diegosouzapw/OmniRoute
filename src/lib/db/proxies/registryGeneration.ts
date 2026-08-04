// Shared registry-generation counter for the proxy registry. Split out so both
// `proxies.ts` and `proxySubscriptions.ts` can bump/read it without a cyclic
// import between the two sibling modules.
let proxyRegistryGeneration = 0;

export function bumpProxyRegistryGeneration() {
  proxyRegistryGeneration++;
}

export function getProxyRegistryGeneration() {
  return proxyRegistryGeneration;
}
